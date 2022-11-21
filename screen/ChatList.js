import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { useSelector } from "react-redux";

import axios from 'axios';
import {ip} from '../Ip'
import HeaderBar from "../component/HeaderBar";

let keep = [];
const ChatList = ({navigation}) => {
  const storeData = useSelector((state) => state.reducer.account);
  const [accountData, setData] = useState("");
  const [listData, setListData] = useState([]);
  
  useEffect(() => {
    setData(storeData[0]);
  }, []);

  useEffect(() => {
    if(accountData){
      axios.post('http://'+ip+':3000/chatList', {account_id: accountData.account_id})
      .then((response) => {
        if(response.data.status == 'complete'){
          setListData(response.data.listData);
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
  
  const UnreadComponent = (props) => {
    if(props.unread != 0){
      return(
        <View style={styles.unreadView}>
          <View style={styles.unreadNum}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>{props.unread}</Text>
          </View>
        </View>
      );
    }
  }

  function goChatScreen(anotherId, anotherName){
    // set unread to 0
    axios.post('http://'+ip+':3000/readChat', {account_id: accountData.account_id, receiver_id: anotherId})
    .then(function (response){
      console.log(response.data);
      if(response.data.status == 'complete'){
        console.log("complete");
        axios.post('http://'+ip+':3000/chatList', {account_id: accountData.account_id})
        .then((response) => {
          if(response.data.status == 'complete'){
            setListData(response.data.listData);
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
        console.log("error");
      }
    })
    .catch((err) => {
      console.log(err);
    });

    navigation.navigate("Chat Screen", {receiver_id: anotherId, title: anotherName})
  }

  const renderItem = ({ item }) => {
    let anotherId = "";
    let anotherName = "";
    if(accountData.account_id == item.sender_id){
      anotherId = item.receiver_id;
      anotherName = item.user2;
    }
    else{
      anotherId = item.sender_id;
      anotherName = item.user1;
    }
    return(
      <TouchableOpacity style={styles.boxView} onPress={() => goChatScreen(anotherId, anotherName, item)}>
        <View style={styles.box}>
          <View style={styles.iconView}>
            <MaterialCommunityIcons style={styles.icon} name="account-circle-outline" />
          </View>
          <View style={styles.textView}>
            <Text style={styles.chatDetail}>{anotherName}</Text>
          </View>
          <UnreadComponent unread={item.unread}/>
        </View>
      </TouchableOpacity>
    );
  };
 
  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation}/>
      <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
        <StatusBar style="auto" />
        <FlatList style={{paddingBottom:20}} data={listData} renderItem={renderItem}/>
      </ImageBackground>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  iconView: {
    flex: 1,
    justifyContent: 'center'
  },
  icon: {
    fontSize: 50,
    color: 'black',
  },
  backgroundimage: {
    flex: 1,
  },
  text:{
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize:20,
  },
  boxView: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  box: {
    backgroundColor: '#F7D0D5',
    width: '100%',
    height: 80,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },
  textView:{
    flex: 5,
    justifyContent: 'center'
  },
  chatDetail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  unreadView:{
    justifyContent:"center",
  },
  unreadNum:{
    backgroundColor: 'red',
    borderRadius: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
  }
  
});

export default ChatList;

