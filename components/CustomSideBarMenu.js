import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style = {{flex :1}}>
                <View style = {{flex : 0.8}}>
                    <DrawerItems
                        {...this.props}
                    />
                </View>
                <View style = {{flex : 0.1, justifyContent:'flex-end',paddingBottom : 10}}>
                    <TouchableOpacity
                    style = {{
                        width : 100,
                        height : 30,
                        backgroundColor : 'cyan',
                        borderWidth : 2,
                        alignSelf : 'center',
                        borderRadius : 15,
                      }}
                    onPress = {() => {
                        this.props.navigation.navigate('LoginScreen')
                        firebase.auth().signOut()
                    }}
                    >
                        <Text style = {{
                            textAlign : 'center',
                            fontSize : 20
                        }}> Logout </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}