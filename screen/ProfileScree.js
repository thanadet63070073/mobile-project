import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import HeaderBar from "../component/HeaderBar";
import { useSelector } from "react-redux";

import axios from 'axios';
import {ip} from '../Ip'
import { TextInput } from "react-native-paper";


const ProfileScreen = ({navigation}) => {
  const storeData = useSelector((state) => state.reducer.account);
  const [accountData, setData] = useState("");

  useEffect(() => {
    setData(storeData[0]);
  }, []);

  const [newPassword, setNew] = useState("");
  const [confimrPassword, setConfirm] = useState("");

  function confirmChangePassword(){
    if(newPassword == ""){
      alert("Please insert new password field");
    }
    else if(confimrPassword == ""){
      alert("Please insert confirm password field");
    }
    else if(newPassword != confimrPassword){
      alert("Passwords do not match");
    }
    else{
      axios.post('http://'+ip+':3000/changePassword', {account_id: accountData.account_id ,password: newPassword})
      .then(function (response){
        console.log(response.data);
        if(response.data.status == 'complete'){
          alert("Change password complete");
          setNew("");
          setConfirm("");
        }
        else if(response.data.status == "same"){
          alert("New password can't be same as old password");
          setNew("");
          setConfirm("");
        }
        else if(response.data.status == "error"){
          alert("Error!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
 
  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} />
        <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
      
        <StatusBar style="auto" />
        <View style={styles.sectionView}>
          <Text style={styles.sectionName}>Change password</Text>
          <View style={styles.formView}>
            <View style={styles.inputView}>
              <Text style={styles.inputDescription}>New password</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="New password"
                mode="outlined"
                theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
                left={<TextInput.Icon style={{marginTop: 15}} name="lock" />}
                secureTextEntry={true}
                placeholderTextColor="#003f5c"
                onChangeText={(password) => setNew(password)}
                value={newPassword}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputDescription}>Cofirm new password</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="Confirm new password"
                mode="outlined"
                placeholderTextColor="#003f5c"
                theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
                left={<TextInput.Icon style={{marginTop: 15}} name="lock" />}
                secureTextEntry={true}
                onChangeText={(password) => setConfirm(password)}
                value={confimrPassword}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.changeBtn} onPress={confirmChangePassword}>
            <Text style={styles.changeText}>Change password</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate("Login Screen")}>
          <Text style={styles.changeText}>Logout</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionView: {
    marginTop: 20,
    width: '95%',
    backgroundColor: 'white',
    border: '1px solid black',
    padding: 10,
  },
  sectionName: {
    color: '#FF9900',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputView: {
    width: "100%",
    height: 80,
    marginBottom: 20,
    paddingHorizontal: 10,
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
    color:'gray',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize:16,
  },
  changeBtn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "orange",
    marginVertical: 10,
    alignSelf: 'center'
  },
  changeText: {
    color:'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  logoutBtn:{
    padding: 10,
    borderRadius: 8,
    backgroundColor: "orange",
    marginVertical: 20,
  }
});

export default ProfileScreen;

