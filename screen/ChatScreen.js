import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  FlatList,
  KeyboardAvoidingView
} from "react-native";
import { FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import { useSelector } from "react-redux";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import axios from 'axios';
import {ip} from '../Ip'

let currentDay = "";
const ChatScreen = ({navigation, route}) => {
  const [chatData, setChatData] = useState([]);
  const storeData = useSelector((state) => state.reducer.account);
  const [accountData, setData] = useState("");
  const [chatText, setChatText] = useState("");
  const [roomId, setRoomId] = useState("");
  const receiver_id = route.params.receiver_id;

  useEffect(() => {
    setData(storeData[0]);
    if(accountData){
        axios.post('http://'+ip+':3000/chatroom', {account_id: accountData.account_id, receiver_id: receiver_id})
        .then(function (response){
          console.log(response.data);
          if(response.data.status == 'complete'){
            console.log(response.data);
            setRoomId(response.data.room_id);
          }
          else{
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });

        axios.post('http://'+ip+':3000/readChat', {account_id: accountData.account_id, receiver_id: receiver_id})
        .then(function (response){
          console.log(response.data);
          if(response.data.status == 'complete'){
            console.log("complete");
          }
          else{
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
        
        axios.post('http://'+ip+':3000/chatData', {account_id: accountData.account_id, receiver_id: receiver_id})
        .then(function (response){
          if(response.data.status == 'complete'){
            setChatData(response.data.chatData);
          }
          else{
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
  }, [accountData]);

  useEffect(() => {
    if(accountData){
      const interval = setInterval(() => {
        axios.post('http://'+ip+':3000/chatData', {account_id: accountData.account_id, receiver_id: receiver_id})
        .then(function (response){
          if(response.data.status == 'complete'){
            setChatData(response.data.chatData);
            console.log('This will run every second!');
          }
          else{
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
        axios.post('http://'+ip+':3000/readChat', {account_id: accountData.account_id, receiver_id: receiver_id})
        .then(function (response){
          console.log(response.data);
          if(response.data.status == 'complete'){
            console.log("complete");
          }
          else{
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [accountData]);

  function DayComponent(props){
    if(currentDay != props.day){
      currentDay = props.day;
      return <Text style={styles.dayText}>{currentDay}</Text>
    }
  }

  const renderMessage = ({item}) =>{
    return (
        <View style={[styles.container,]}>
          <DayComponent day={item.dateTime} />
          <View style={[styles.messageBox,
          {backgroundColor: item.sender_id == accountData.account_id ? "#FF9900" : "#747474",
          marginLeft: item.sender_id == accountData.account_id  ? 50 : 0,
          marginRight: item.sender_id == accountData.account_id  ? 0 : 50,
          }]}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.date}>{item.Time}</Text>
          </View>
        </View>
    )
  }
  const sendMessage = () =>{
    if(chatText != ""){
        console.log(chatText)
        console.log(accountData.account_id)
        axios.post('http://'+ip+':3000/chat', {account_id: accountData.account_id, receiver_id: receiver_id, message:chatText, room_id: roomId})
        .then((response) => {
            setChatText("");
            if(response.data.status == "complete"){
                axios.post('http://'+ip+':3000/chatData', {account_id: accountData.account_id, receiver_id: receiver_id})
                .then(function (response){
                    if(response.data.status == 'complete'){
                    setChatData(response.data.chatData);
                }
          else{
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
            }
            else{
                alert("Message Unsended");
            }
            setChatText("");
        })
        .catch((err) =>{
            alert("err: " + err);
        });
    }
    
  }

  return (
    
      <View style={{flex: 1, justifyContent: "center"}}>
          <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
          <StatusBar style="auto" />
            <FlatList data={chatData} renderItem={renderMessage}/>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={80}>
              <View style={styles.inputcontainer}>
                  <View style={styles.maincontainer}>
                      <FontAwesome name="smile-o" size={25} color="grey" />
                      <TextInput placeholder="Type a Message" multiline style={styles.textinput} value={chatText} onChangeText={setChatText}></TextInput>
                  </View>
                  <View style={styles.buttoncontainer}>
                      <FontAwesome name="paper-plane" size={25} color="white"  onPress={sendMessage}/>
                  </View>
              </View>
            </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    
  );
};
 
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    borderRadius: 10,
    padding: 10,
    justifyContent: "center"
  },
  message:{
    color: "white",
  },
  date:{
    color: "white",
    fontSize: 10,
    alignSelf: "flex-end"
  },
  backgroundimage: {
    flex: 1,
  },
  inputcontainer: {
    flexDirection: 'row',
    margin: 10,
  },
  maincontainer:{
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textinput:{
    flex: 1,
    marginHorizontal: 10,
  },
  buttoncontainer:{
    backgroundColor: "#FF9900",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  dayText:{
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    margin: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 'bold',
    
  }
  
});

export default ChatScreen;