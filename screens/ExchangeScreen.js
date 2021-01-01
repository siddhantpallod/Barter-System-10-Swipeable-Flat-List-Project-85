import React from 'react';
import {View,Text,TextInput,TouchableOpacity,Alert,ImageBackground} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class ExchangeScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            email : firebase.auth().currentUser.email,
            itemName : '',
            description : ''
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }

    addItem = (itemName,description) => {
        var email = this.state.email
        var exchangeId = this.createUniqueId()
        db.collection('exchangeRequests').add({
            "email" : email,
            "itemName" : itemName,
            "description" : description,
            "exchangeId" : exchangeId
        })
        this.setState({
            itemName : '',
            description : ''
        })

        return Alert.alert(
            'Item ready to exchange',
            '',
            [
                {text: 'OK', onPress: ()=> {
                    this.props.navigation.navigate('Home')
                }}
            ]
        );
    }

    render(){
        return(
            <View>
                <View>
                  <MyHeader
                  title = "Exchange"
                  navigation = {this.props.navigation}
                  />  
                </View>
                <ImageBackground source = {require('../assets/gradient.jpeg')} style = {{width : '100%', alignSelf : 'center',height : '100%'}}>

                <View>
                    <TextInput
                    style = {{
                        borderWidth : 3,
                        alignSelf : 'center',
                        width : 300,
                        height : 30,
                        marginTop : 50,
                        fontSize : 17
                    }}
                    placeholder = 'Item Name'
                    placeholderTextColor = 'orange'
                    onChangeText = {(text)=>{
                        this.setState({
                            itemName : text
                        })
                    }}
                    />

                    <TextInput
                    style = {{
                        borderWidth : 3,
                        alignSelf : 'center',
                        width : 300,
                        height : 100,
                        marginTop : 30,
                        fontSize : 17
                    }}
                    placeholder = 'Description'
                    placeholderTextColor = 'orange'
                    multiline = {true}
                    onChangeText = {(text)=> {
                        this.setState({
                            description : text
                        })
                    }}
                    />  
                </View>
                <View>
                    <TouchableOpacity 
                    style = {{
                        alignSelf : 'center',
                        marginBottom : 500,
                        backgroundColor : 'cyan',
                        alignSelf : 'center',
                        borderWidth : 3,
                        marginTop : 30,
                        borderRadius : 15
                    }}
                    onPress = {()=> {
                        this.addItem(this.state.itemName,this.state.description)
                    }}
                    >
                        <Text style = {{
                            fontSize : 20,
                            textAlign :'center'
                        }}> Add Item </Text>
                    </TouchableOpacity>
                </View>
                </ImageBackground>
            </View>
        )
    }
}