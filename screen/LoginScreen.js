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
import {TextInput} from 'react-native-paper'
import axios from 'axios';
import {ip} from '../Ip'

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios
        .get('http://'+ip+':3000/menu')
        .then(function (response) {
          // handle success
          setData(response.data);
          console.log("aaa: " + response.data[0].menu_name);
        })
        .catch(function (error) {
          // handle error
          console.log(error.message);
        })
        .finally(function () {
          // always executed
          setLoading(false);
          console.log('Finally called');
      });
  }, []);
  
 
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
      <Image style={styles.logoImage} source={require("../assets/images/kmitl-text.png")} />
        {/* <Image style={styles.logoImage} source={{uri:"https://www.kmids.ac.th/wp-content/uploads/2021/04/Sub-Logo-KMITL_KMITL-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%AD%E0%B8%A1%E0%B9%80%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%B2%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B1%E0%B8%87.png"}} /> */}
        
        <StatusBar style="auto" />
        <View style={styles.inputView}>
            <Text style={styles.inputDescription}>Username</Text>
            <TextInput
            style={styles.TextInput}
            placeholder="Username"
            mode="outlined"
            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
            left={<TextInput.Icon style={{marginTop: 15}} name="account" />}
            placeholderTextColor="#003f5c"
            onChangeText={(username) => setUsername(username)}
            />
        </View>
    
        <View style={styles.inputView}>
            <Text style={styles.inputDescription}>Password</Text>
            <TextInput
            style={styles.TextInput}
            placeholder="Password"
            mode="outlined"
            placeholderTextColor="#003f5c"
            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
            left={<TextInput.Icon style={{marginTop: 15}} name="lock" />}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            />
        </View>
    
        <TouchableOpacity onPress={() => {navigation.navigate("Register Screen")}}>
            <Text style={styles.register_button}>Register</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Home Screen")}>
            <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: "center",
  },
  logoImage: {
    marginBottom: 40,
    width: 250,
    height: 100
  },
  inputView: {
    width: "100%",
    height: 80,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  TextInput: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    alignSelf:'center',
    backgroundColor: 'white',
    fontSize:14
  },
  inputDescription:{
    color:'#FF9900',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize:16,
  },
  register_button: {
    height: 30,
  },
  loginBtn: {
    width: "40%",
    borderRadius: 8,
    height: '7%',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "orange",
  },
  loginText: {
    color:'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  
});

export default LoginScreen;

