import React from 'react';
import { Text, View, TouchableOpacity, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements'
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class HomeScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            allRequests : []
        }

        this.requestRef = null
    }

    getAllRequests = () => {
        this.requestRef = db.collection('exchangeRequests')
        .onSnapshot((snapshot) => {
            var allRequests = []
            snapshot.forEach(doc => {
                allRequests.push(doc.data())
            })

            this.setState({
                allRequests : allRequests
            })
        })
    }

    

    keyExtracter = (item,index) => index.toString()

    renderItem = ({item , I}) => {
        return(
            <ListItem
                key = {I}
                title = {item.itemName}
                subtitle = {item.description}
                rightElement = {
                    <TouchableOpacity 
                    style = {{
                        width : 100,
                        height : 30,
                        backgroundColor : 'cyan',
                        borderWidth : 2,
                        alignSelf : 'center',
                        borderRadius : 15,
                    }}
                    onPress = {()=> {
                    this.props.navigation.navigate('RecieverDetails',{'details': item})}}>
                        
                        <Text style = {{fontSize : 20,textAlign : 'center'}}>Exchange</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }

    componentDidMount(){
        this.getAllRequests()
    }

    componentWillUnmount(){
        this.requestRef()
    }

    render(){
        return(
            <View style = {{backgroundColor : 'yellow'}}>
            <View>
                <MyHeader
                title = "Home"
                navigation = {this.props.navigation}
                />
            </View>
                    {this.state.allRequests.length === 0
                    ? (
                        <View style = {{
                            flex:1,
                            fontSize: 20,
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                          <Text> List of all exchange requests </Text>  
                        </View>
                    )
                    : (
                        <FlatList
                            keyExtractor = {this.keyExtracter}
                            data = {this.state.allRequests}
                            renderItem = {this.renderItem}
                        />
                    )
                    }
            </View>
        )
    }
}