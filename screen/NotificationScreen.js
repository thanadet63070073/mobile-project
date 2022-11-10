import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons} from '@expo/vector-icons';
import HeaderBar from "../component/HeaderBar";

import axios from 'axios';
import {ip} from '../Ip'


const NotificationScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
 
  return (
    <View style={styles.container} aaa={true}>
      <HeaderBar navigation={navigation} aaa={true}/>
      <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
        <StatusBar style="auto" />
        <View style={styles.boxView}>
          <View style={styles.box}>
            <View style={styles.textView}>
              <Text style={styles.nameText}>Name</Text>
              <Text style={styles.notificationText}>Sent Message</Text>
              <Text style={styles.timeText}>15:00</Text>
            </View>
          </View>
        </View>
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
  }
  
});

export default NotificationScreen;

