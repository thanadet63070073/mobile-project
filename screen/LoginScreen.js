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
import { useDispatch } from 'react-redux';
import { accountLogin } from "../store/action/loginAction";
import {ip} from '../Ip'

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function confirmLogin(){
    if(username == ""){
      alert("Please insert username");
    }
    else if(password == ""){
      alert("Please insert password");
    }
    else{
      axios.post('http://'+ip+':3000/login', {username: username, password: password})
      .then(function (response){
        console.log(response.data);
        if(response.data.status == 'complete'){
          const accountData = response.data.accountData;
          setUsername("");
          setPassword("");
          dispatch(accountLogin(accountData));
          
          navigation.navigate("Home Screen");
        }
        else if(response.data.status == "not found"){
          alert("username or password is incorrect");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
 
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
      <Image style={styles.logoImage} source={require("../assets/images/kmitl-text.png")} />
        
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
            value={username}
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
            value={password}
            />
        </View>
    
        {/* <TouchableOpacity onPress={() => {navigation.navigate("Register Screen")}}>
            <Text style={styles.register_button}>Register</Text>
        </TouchableOpacity> */}
    
        <TouchableOpacity style={styles.loginBtn} onPress={confirmLogin}>
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

