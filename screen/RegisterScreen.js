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

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  function confirmRegister(){
    if(username == ""){
        alert('Please insert username');
    }
    else if(password == ""){
        alert("Please insert password");
    }
    else if(confirm == ""){
        alert("Please insert confirm password");
    }
    else if(password != confirm){
        alert('Password and confirm password does not match');
    }
    else{
        axios.post('http://'+ip+':3000/register', {username: username, password: password})
        .then((response) => {
            if(response.data.status == "complete"){
                alert("Register complete");
            }
            else{
                alert("Register Incomplete");
            }
            setUsername("");
            setPassword("");
            setConfirm("");
        })
        .catch((err) =>{
            alert("err: " + err);
        });
    }
  }
  
//   useEffect(() => {
//     axios
//         .get('http://'+ip+':3000/menu')
//         .then(function (response) {
//           // handle success
//           setData(response.data);
//           console.log("aaa: " + response.data[0].menu_name);
//         })
//         .catch(function (error) {
//           // handle error
//           console.log(error.message);
//         })
//         .finally(function () {
//           // always executed
//           setLoading(false);
//           console.log('Finally called');
//       });
//   }, []);
  
 
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

        <View style={styles.inputView}>
            <Text style={styles.inputDescription}>Confirm Password</Text>
            <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password"
            mode="outlined"
            placeholderTextColor="#003f5c"
            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
            left={<TextInput.Icon style={{marginTop: 15}} name="lock" />}
            secureTextEntry={true}
            onChangeText={(confirm) => setConfirm(confirm)}
            />
        </View>
    
        <TouchableOpacity style={styles.registerBtn} onPress={confirmRegister}>
            <Text style={styles.registerText}>Register</Text>
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
    color:'orange',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize:16,
  },
  registerBtn: {
    width: "40%",
    borderRadius: 8,
    height: '7%',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "orange",
  },
  registerText: {
    color:'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  
});

export default RegisterScreen;

