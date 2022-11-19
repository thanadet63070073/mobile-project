import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { useSelector } from "react-redux";

import axios from 'axios';
import {ip} from '../Ip'
import HeaderBar from "../component/HeaderBar";

const ChatList = ({navigation}) => {
  const storeData = useSelector((state) => state.reducer.account);
  const [accountData, setData] = useState("");
  const [listData, setListData] = useState([]);

  useEffect(() => {

  }, []);
  
  useEffect(() => {
    setData(storeData[0]);
  }, [accountData]);

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
      <TouchableOpacity style={styles.boxView} onPress={() => navigation.navigate("Chat Screen", {receiver_id: anotherId})}>
        <View style={styles.box}>
          <View style={styles.iconView}>
            <MaterialCommunityIcons style={styles.icon} name="account-circle-outline" />
          </View>
          <View style={styles.textView}>
            <Text style={styles.chatDetail}>{anotherName}</Text>
          </View>
          <View style={styles.unreadView}>
            <View style={styles.unreadNum}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>{item.unread}</Text>
            </View>
          </View>
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

