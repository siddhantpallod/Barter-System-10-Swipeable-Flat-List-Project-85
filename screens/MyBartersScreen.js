import React from 'react';
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class MyBartersScreen extends React.Component{
    
    constructor(){
        super();
        this.state = {
            email : firebase.auth().currentUser.email,
            allBarters : []
        }
        this.requestRef = null
    }

    sendNotification = (itemDetails,requestStatus) => {
        var requestId = itemDetails.requestId
        var donorId = itemDetails.donorId
        db.collection('allNotifications').where('requestId', '==', requestId)
        .where('donorId', '==',donorId).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                var message = ''
                if(requestStatus === 'Book Sent'){
                    message = this.state.donorName + ' ' + "sent you the book"
                }
                else{
                    message = this.state.donorName + ' ' + "has shown interest in donating the book"
                }
                db.collection('allNotifications').doc(doc.id).update({
                    'message' : message,
                    'status' : 'unread',
                    'date' : firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
    }

    sendItem = (itemDetails)=>{
        if(itemDetails.requestStatus==="bookSent"){
          var requestStatus="Donor Interested"
          db.collection("all_donations").doc(bookDetails.doc_id).update({
            request_status:"Donor Interested"
          })
        }
        else{
          var requestStatus="bookSent"
          db.collection("all_donations").doc(itemDetails.docId).update({
            requestStatus:"bookSent"
          })
        }
        this.sendNotification(itemDetails,requestStatus)
    }


    getAllBarters = () => {
        this.requestRef = db.collection('allBarters').where('donorId' , '==' , this.state.email)
        .onSnapshot((snapshot) => {
            var allBarters = snapshot.docs.map(document => document.data())
            this.setState({
                allBarters : allBarters
            })
        })
    }

    keyExtracter = (item,index) => index.toString()

    renderItem = ({item,I}) => (
        <ListItem
            key = {I}
            title = {item.itemName}
            subtitle = {"Requested By: " + item.requestedBy + "\n Status: " + item.requestStatus}
            leftElement = {
                <Icon
                    name = 'book'
                    type = 'font-awesome'
                />}
            rightElement = {
                <TouchableOpacity onPress = {() => {
                    this.sendItem(item)
                }}>
                    <Text> Exchange </Text>
                </TouchableOpacity>
            }
            bottomDivider
                />
    )

    componentDidMount(){
        this.getAllBarters()
    }

    componentWillUnmount(){
        this.requestRef()
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View>
                    <MyHeader
                    title = "My Barters"
                    navigation = {this.props.navigation}
                    />
                </View>
         <View style={{flex:1}}>
           {
             this.state.allBarters.length === 0
             ?(
               <View>
                 <Text style={{ fontSize: 20,textAlign : 'center',alignSelf : 'center'}}>
                    List of all Barters</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtracter}
                 data={this.state.allBarters}
                 renderItem={this.renderItem}
               />
             )
           }
         </View>
       </View>
        )
    }

}
