import React from 'react';
import  {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class SettingsScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            email : '',
            firstName : '',
            lastName : '',
            contactNo : '',
            userAddress : '',
            docId : ''
        }
    }

    getUserDetails = () => {
        var email = firebase.auth().currentUser.email
        db.collection('users').where('userEmail', '==', email).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                var details = doc.data()
                this.setState({
                    firstName : details.firstName,
                    lastName : details.lastName,
                    userAddress : details.address,
                    contactNo : details.phoneNo,
                    docId : doc.id
                })
            })
        })
    }

    componentDidMount(){
        this.getUserDetails()
    }

    updateDetails = () => {
        db.collection('users').doc(this.state.docId).update({
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            phoneNo : this.state.contactNo,
            address : this.state.userAddress
        })

        return Alert.alert("User details successfully updated")
    }

    render(){
        return(
            <View style = {{
                backgroundColor : 'yellow'
            }}>
                <View>
                    <MyHeader
                    title = "Settings"
                    navigation = {this.props.navigation}
                    />
                </View>
                <View>
                    <TextInput
                    style = {{
                        width : 250,
                        height : 50,
                        borderWidth : 2,
                        alignSelf : 'center',
                        marginTop : 50
                    }}
                    placeholder = 'First Name'
                    maxLength = {8}
                    onChangeText = {(text) => {
                        this.setState({
                            firstName : text
                        })
                    }}
                    value = {this.state.firstName}
                    />
                    <TextInput
                     style = {{
                        width : 250,
                        height : 50,
                        borderWidth : 2,
                        alignSelf : 'center',
                        marginTop : 50
                    }}
                    placeholder = 'Last Name'
                    maxLength = {8}
                    onChangeText = {(text) => {
                        this.setState({
                            lastName : text
                        })
                    }}
                    value = {this.state.lastName}
                    />
                    <TextInput
                     style = {{
                        width : 250,
                        height : 50,
                        borderWidth : 2,
                        alignSelf : 'center',
                        marginTop : 50
                    }}
                    placeholder = 'Contact No'
                    maxLength = {10}
                    keyboardType = 'numeric'
                    onChangeText = {(text) => {
                        this.setState({
                            contactNo : text
                        })
                    }}
                    value = {this.state.contactNo}
                    />
                    <TextInput
                     style = {{
                        width : 250,
                        height : 50,
                        borderWidth : 2,
                        alignSelf : 'center',
                        marginTop : 50
                    }}
                    placeholder = 'Address'
                    multiline = {true}
                    onChangeText = {(text) => {
                        this.setState({
                            userAddress : text
                        })
                    }}
                    value = {this.state.userAddress}
                    />
                </View>
                <View>
                    <TouchableOpacity
                    style = {{
                    width : 200,
                    height : 30,
                    backgroundColor : 'cyan',
                    borderWidth : 2,
                    alignSelf : 'center',
                    borderRadius : 15,
                    marginTop : 30,
                    marginRight : 10,
                    marginBottom : 200
                    }}
                    onPress = {()=> {
                        this.updateDetails()
                    }}
                    >
                        <Text style = {{
                            fontSize : 20,
                            textAlign : 'center',
                            
                        }}> Save </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}