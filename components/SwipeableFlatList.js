import React from 'react';
import {Animated, Dimensions, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {ListedView, Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipeableFlatList extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            allNotifications : this.props.allNotifications
        }
    }

    updateMarkAsRead = (notification) => {
        db.collection('allNotifications').doc(notification.doc_id).update({
            'notificationsStatus' : "read"
        })
    }

    onSwipeValueChanged = swipeData => {
        var allNotifications = this.state.allNotifications
        const {key,value} = swipeData

        if(value < -Dimensions.get('window').width){
            const newData = [...allNotifications]
            const preIndex = allNotifications.findIndex(item => item.key === key)
            this.updateMarkAsRead(allNotifications[preIndex])
            newData.splice(preIndex, 1)
            this.setState({allNotifications : newData})
        }
    }

    renderItem = data => (
        <ListItem
          title={data.item.itemName}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          subtitle={data.item.message}
          bottomDivider
        />
    )

    renderHiddenItem = () => {
        <View>
            <View>
                <Text>  </Text>
            </View>
        </View>
    }

    render(){
        <View>
            <SwipeListView
                disableRightSwipe
                data = {this.state.allNotifications}
                renderItem = {this.renderItem}
                renderHiddenItem = {this.renderHiddenItem}
                rightOpenValue = {-Dimensions.get('window').width}
                previewRowKey = {'0'}
                previewOpenValue = {-40}
                previewOpenDelay = {3000}
                onSwipeValueChange = {this.onSwipeValueChanged}
            />
        </View>
    }
}
