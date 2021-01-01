import React from 'react';
import { StyleSheet, Text, View,TextInput, Alert, TouchableOpacity,Modal,ScrollView,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {Header} from 'react-native-elements';

export default class LoginScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            email : '',
            password : '',
            firstName : '',
            lastName : '',
            phoneNo : '',
            address : '',
            confirmPassword : '',
            isModalVisible : false
        }
    }

    userLogin = (email,password) => {
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(() => {
            this.props.navigation.navigate('Home')
            return Alert.alert("Successfull Login")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })   
    }

    userSignUp = (email,password,confirmPassword) => {
        if(password !== confirmPassword){
            return Alert.alert("Passwors don't match")
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(email,password).then(()=> {
            
            db.collection('users').add({
                phoneNo : this.state.phoneNo,
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                address : this.state.address,
                userEmail : this.state.email
            })
            
            return Alert.alert("User Added Successfully")
        })

        .catch((error)=> {
            var errorMessage = error.message
            return Alert.alert(errorMessage)
        })
       
    }
    }
    showModal = () => {
        return(
            <Modal
            animationType = 'slide'
            transparent = {true}
            visible = {this.state.isModalVisible}
            >
            
            <View style = {styles.modalContainer}>
                <ScrollView>
                    <KeyboardAvoidingView>
                        <Text style = {{
                            fontSize : 20,
                            textAlign : 'center',
                        }}> Registration </Text>
                        <TextInput
                        style = {styles.inputBox1}
                        placeholder = "First Name"
                        maxLength = {8}
                        onChangeText = {(text)=> {
                            this.setState({
                                firstName : text
                            })
                        }}
                        />
                        <TextInput
                        style = {styles.inputBox1}
                        placeholder = "Last Name"
                        maxLength = {8}
                        onChangeText = {(text)=> {
                            this.setState({
                                lastName : text
                            })
                        }}
                        />
                        <TextInput
                        style = {styles.inputBox1}
                        placeholder = "Contact Number"
                        maxLength = {10}
                        keyboardType = {"numeric"}
                        onChangeText = {(text)=> {
                            this.setState({
                                phoneNo : text
                            })
                        }}
                        />
                        <TextInput
                        style = {styles.inputBox1}
                        placeholder = "Address"
                        multiline = {true}
                        onChangeText = {(text)=> {
                            this.setState({
                                address : text
                            })
                        }}
                        />
                        <TextInput
                        style = {styles.inputBox1}
                        placeholder = "Email"
                        keyboardType = 'email-address'
                        onChangeText = {(text)=> {
                            this.setState({
                               email : text
                            })
                        }}
                        />
                        <TextInput
                        style = {styles.inputBox1}
                        secureTextEntry = {true}
                        placeholder = "Password"
                        onChangeText = {(text)=> {
                            this.setState({
                               password : text
                            })
                        }}
                        />
                        <TextInput
                        style = {styles.inputBox1}
                        secureTextEntry = {true}
                        placeholder = "Confirm Password"
                        onChangeText = {(text)=> {
                            this.setState({
                               confirmPassword : text
                            })
                        }}
                        />
                        <TouchableOpacity 
                        style = {{
                            backgroundColor : 'red',
                            width : 200,
                            height : 30,
                            justifyContent : 'center',
                            marginTop : 20
                        }}
                        onPress = {() => {
                            this.userSignUp(this.state.email,this.state.password,this.state.confirmPassword)}
                        }
                            >
                            <Text style = {{color : 'white', fontSize : 15,textAlign : 'center'}}> Register </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style = {{
                            backgroundColor : 'red',
                            width : 200,
                            height : 30,
                            justifyContent : 'center',
                            marginTop : 20
                        }} 
                         onPress = {()=> {
                             this.setState({
                                 isModalVisible : false
                             })
                         }}
                         >
                            <Text style = {{color : 'white', fontSize : 15,textAlign : 'center'}}> Cancel </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>

            </Modal>
        )
    }

    render(){
        return(
            <View style = {styles.container}>
              <ScrollView>
                <View style = {{backgroundColor : 'cyan'}}>
                    <Text style = {styles.title}> Barter System </Text>
                </View>
                {this.showModal()}
                

                <TextInput
                style = {styles.inputBox}
                placeholder = "Email"
                keyboardType = 'email-address'
                onChangeText = {(text)=> {
                    this.setState({
                        email : text
                    })
                }}
                />

                <TextInput
                style = {styles.inputBox} 
                secureTextEntry = {true}
                placeholder = "Password"
                onChangeText = {(text)=> {
                    this.setState({
                        password : text
                    })
                }}
                />

                <TouchableOpacity style = {styles.button} 
                onPress = {()=> {
                    this.userLogin(this.state.email,this.state.password)
                }}
                >
                    <Text style = {styles.buttonText}> Login </Text>
                </TouchableOpacity>
                <View>
                <TouchableOpacity style = {styles.button1}
                onPress = {()=> this.setState({isModalVisible : true})}>

                    <Text style = {styles.buttonText}> Sign Up </Text>
                </TouchableOpacity>

                </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox : {
        width : 200,
        height : 50,
        alignSelf : 'center',
        borderWidth : 2,
        marginTop : 30,
        justifyContent : 'center'
    },
    buttonText : {
        textAlign : 'center',
        fontSize : 20
    },
    title : {
        color : 'red',
        fontSize : 30,
        textAlign : 'center',
        marginTop : 40
    },
    container: {
        //flex : 1,
        //justifyContent : 'center',
        //alignItems : 'center',
        backgroundColor : 'yellow'
      },
      inputBox1 : {
        width : 250,
        height : 50,
        borderWidth : 2,
        alignSelf : 'center',
        marginTop : 30
    },
      modalContainer : {
          justifyContent : 'center',
          alignItems : 'center',
          alignSelf : 'center',
          backgroundColor : 'cyan',
          marginLeft : 50,
          marginTop : 100,
          marginRight : 50,
          marginBottom : 70,
          width : 300,
          height : 400
      },
      title : {
        color : 'red',
        fontSize : 30,
        textAlign : 'center',
        marginTop : 10,
    },
    inputBox : {
        width : 200,
        height : 50,
        alignSelf : 'center',
        borderWidth : 2,
        marginTop : 30,
        justifyContent : 'center'
    },
    button : {
        width : 200,
        height : 30,
        backgroundColor : 'cyan',
        borderWidth : 2,
        alignSelf : 'center',
        borderRadius : 15,
        marginTop : 30,
        marginRight : 10
           
    },
    button1 : {
        width : 200,
        height : 30,
        backgroundColor : 'cyan',
        borderWidth : 2,
        alignSelf : 'center',
        borderRadius : 15,
        marginRight : 10,
        marginBottom : 255,
        marginTop : 20
    },
})