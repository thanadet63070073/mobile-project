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
// import { LogBox } from "react-native";


import axios from 'axios';
import {ip} from '../Ip'

let currentDay = "";


// LogBox.ignoreLogs([
//   'Non-serializable values were found in the navigation state',
// ]);

const ChatScreen = ({navigation, route}) => {
  const [chatData, setChatData] = useState([]);
  const storeData = useSelector((state) => state.reducer.account);
  const [accountData, setData] = useState("");
  const [roomId, setRoomId] = useState("");
  const receiver_id = route.params.receiver_id;
  const [currentDate, setCurrentDate] = useState();
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var day = days[new Date().getDay()];
    setRoomId(route.params.roomId)
    if (hours < 10) {
       hours = '0' + hours;
     } 
    if (min < 10) {
        min = '0' + min;
    }
    setCurrentDate(
      day + " " + date + "-" + month + "-" + year
    );
    setCurrentTime(
      hours + ":" + min
    )
    route.params.socket.on("receive_message", (data) => {
        setChatData((list) => [...list, data]);
        console.log(data);
    })
  }, [route.params.socket]);


  useEffect(() => {
    setData(storeData[0]);
    if(accountData){
        axios.post('http://'+ip+':3000/readChat', {account_id: accountData.account_id, receiver_id: receiver_id})
        .then(function (response){
          // console.log(response.data);
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

  const sendMessage = async () =>{
    if(currentMessage !== "" && roomId !== "" && accountData !== "" && receiver_id !== ""){
        const messageData = {
            room: roomId,
            sender_id: accountData.account_id,
            receiver_id: receiver_id,
            message: currentMessage,
            Time: currentTime,
            dateTime: currentDate,
        }
        setChatData((list) => [...list, messageData]);
        console.log(route.params.roomId)
        axios.post('http://'+ip+':3000/chat', {account_id: accountData.account_id, receiver_id: receiver_id, message:currentMessage, room_id: roomId})
        .then((response) => {
            if(response.data.status == "complete"){
                console.log("Message Saved")
            }
            else{
                alert("Message Unsaved");
            }
        })
        .catch((err) =>{
            alert("err: " + err);
        });
        await route.params.socket.emit("send_message", messageData);
        setCurrentMessage("");
    };
  }


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

  return (
    
      <View style={{flex: 1, justifyContent: "center"}}>
          <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
          <StatusBar style="auto" />
          <FlatList inverted data={[...chatData].reverse()} renderItem={renderMessage}/>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={50}>
            <View style={styles.inputcontainer}>
                <View style={styles.maincontainer}>
                    <FontAwesome name="smile-o" size={25} color="grey" />
                    <TextInput placeholder="Type a Message" multiline style={styles.textinput} onChangeText={setCurrentMessage}></TextInput>
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