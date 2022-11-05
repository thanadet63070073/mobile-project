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


const HomeScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
 
  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} />
      <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
      
        {/* <Image style={styles.logoImage} source={{uri:"https://www.kmids.ac.th/wp-content/uploads/2021/04/Sub-Logo-KMITL_KMITL-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%AD%E0%B8%A1%E0%B9%80%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%B2%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B1%E0%B8%87.png"}} /> */}
        
        <StatusBar style="auto" />
        <View style={styles.textView}>
          <MaterialCommunityIcons style={styles.Icon} name="account-circle-outline" />
            <Text style={styles.text}>Student ID : 63xxxxxx</Text>
            <Text style={styles.text}>FirstName LastName</Text>
            <Text style={styles.text}>Faculity : Information Technology</Text>
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
  Icon: {
    fontSize: 150,
    color: 'black',
    marginBottom: 30,
  },
  backgroundimage: {
    flex: 1,
    justifyContent: 'center',
  },
  textView: {
    alignItems: "center",
  },
  text:{
    fontWeight: 'bold',
    marginBottom: 30,
    fontSize:20,
  },
  
});

export default HomeScreen;

