import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {Card,Icon,Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class RecieverDetailsScreen extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            email : firebase.auth().currentUser.email,
            userName : '',
            recieverId : this.props.navigation.getParam('details')['userEmail'],
            exchangeId : this.props.navigation.getParam('details')['exchangeId'],
            itemName : this.props.navigation.getParam('details')['itemName'],
            description : this.props.navigation.getParam('details')['description'],
            recieverName : '',
            recieverContact : '',
            recieverAddress : '',
            recieverRequestDocId : ''
        }
    }

    getRecieverDetails()  {
        db.collection('users').where('userEmail','==', this.state.email).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.setState({
                    recieverName : doc.data().firstName,
                    recieverContact : doc.data().phoneNo,
                    recieverAddress : doc.data().address
                })
            })
        })

        db.collection('exchangeRequests').where('exchangeId' , '==' , this.state.exchangeId).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.setState({
                    recieverRequestDocId : doc.id
                })
            })
        })
    }

    getUserDetails=(userEmail)=>{
        db.collection("users").where('userEmail','==', userEmail).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            this.setState({
              userName  :doc.data().first_name + " " + doc.data().last_name
            })
          })
        })
      }

    updateBarterStatus = () => {
        db.collection('allBarters').add({
            itemName : this.state.itemName,
            exchangeId : this.state.exchangeId,
            requestedBy : this.state.recieverName,
            donorId : this.state.email,
            requestStatus : "Donor Interested" 
        })
    }

    componentDidMount(){
        this.getRecieverDetails()
        this.getUserDetails(this.state.email)
    }

    addNotification=()=>{
        var message = this.state.recieverName + " has shown interest in exchanging the item"
        db.collection("allNotifications").add({
          targetedUserId    : this.state.receiverId,
          donorId           : this.state.userName,
          exchangeId          : this.state.exchangeId,
          itemName           : this.state.itemName,
          date                : firebase.firestore.FieldValue.serverTimestamp(),
          notificationStatus : "unread",
          message             : message
        })
      }
      
    render(){
        return(
            <View>
                <View style = {{flex : 0.1}}>
                    <Header
                        leftComponent = {
                            <Icon
                                name = 'arrow-left'
                                type = 'feather'
                                onPress = {()=>{
                                    this.props.navigation.goBack()
                                }} 
                            />
                        }

                        centerComponent = {{text: 'Exchange Items', style : {color : 'red',fontSize : 20}}}
                        backgroundColor = 'cyan'
                   
                   />
                </View>
                <View style = {{flex : 0.3}}>
                    <Card
                        title={"Item Information"}
                        titleStyle= {{fontSize : 20}}
                    >
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Name : {this.state.itemName}</Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Reason : {this.state.description}</Text>
                        </Card>
                </Card>
                </View>
                <View style={{flex:0.3}}>
                    <Card
                        title={"Reciever Information"}
                        titleStyle= {{fontSize : 20}}
                        >
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
                        </Card>
                    </Card>
        </View>
        <View>
            {this.state.recieverId !== this.state.email
            ? (
                <TouchableOpacity
                  style = {{
                    width : 100,
                    height : 30,
                    backgroundColor : 'cyan',
                    borderWidth : 2,
                    alignSelf : 'center',
                    borderRadius : 15,
                    marginTop : 20,
                }}
                  onPress={()=>{
                    this.updateBarterStatus()
                    this.props.navigation.navigate('MyBarters')
                    this.addNotification()
                  }}>
                      <Text style = {{textAlign : 'center', fontSize : 20}}> Exchange </Text>
                  </TouchableOpacity>
            )
            : null
            }
        </View>
            </View>
        )
    }

}