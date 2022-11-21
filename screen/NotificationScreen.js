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
import HeaderBar from "../component/HeaderBar";
import { useSelector } from "react-redux";

import axios from 'axios';
import {ip} from '../Ip'


const NotificationScreen = ({navigation}) => {
  const storeData = useSelector((state) => state.reducer.account);
  const [accountData, setData] = useState("");
  const [notificationData, setNotificationData] = useState([]);
  
  useEffect(() => {
    setData(storeData[0]);
  }, []);

  useEffect(() => {
    if(accountData){
      axios.post('http://'+ip+':3000/notification', {account_id: accountData.account_id})
      .then((response) => {
        if(response.data.status == 'complete'){
          console.log(response.data)
          setNotificationData(response.data.notificationData);
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

  function deleteNotification(item){
    axios.post('http://'+ip+':3000/deleteNotification', {notification_id: item.notification_id})
    .then((response) => {
      if(response.data.status == 'complete'){
        axios.post('http://'+ip+':3000/notification', {account_id: accountData.account_id})
        .then((response) => {
          if(response.data.status == 'complete'){
            console.log(response.data)
            setNotificationData(response.data.notificationData);
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
  }

  const renderItem = ({ item }) => {
    return(
      <View style={styles.boxView}>
        <View style={styles.box}>
          <View style={styles.textView}>
            <View style={{flexDirection:"row", justifyContent: "space-between"}}>
              <Text style={styles.nameText}>{item.author_name}</Text>
              <TouchableOpacity onPress={() => deleteNotification(item)}>
                <MaterialCommunityIcons style={styles.Icon} name="close" />
              </TouchableOpacity>
            </View>
            <Text style={styles.notificationText}>{item.notification_name}</Text>
            <Text style={styles.timeText}>{item.date}, {item.time}</Text>
          </View>
        </View>
      </View>
    );
  };
 
  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} goBack={true}/>
      <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
        <StatusBar style="auto" />
        <FlatList style={{paddingBottom:20}} data={notificationData} renderItem={renderItem}/>
      </ImageBackground>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundimage: {
    flex: 1,
  },
  boxView: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  box: {
    backgroundColor: 'white',
    width: '100%',
    height: 100,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    border: '1px solid gray'
  },
  textView:{
    flex: 5,
    justifyContent: 'space-around'
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationText:{
    fontSize: 14
  },
  timeText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  Icon:{
    fontSize: 20,
  }
});

export default NotificationScreen;

