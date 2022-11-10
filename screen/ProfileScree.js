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
import { MaterialCommunityIcons} from '@expo/vector-icons';
import HeaderBar from "../component/HeaderBar";

import axios from 'axios';
import {ip} from '../Ip'
import { TextInput } from "react-native-paper";


const ProfileScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
 
  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} />
      <ScrollView>
        <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
      
        <StatusBar style="auto" />

        <View style={styles.sectionView}>
          <Text style={styles.sectionName}>Change personal information</Text>
          <View style={styles.formView}>
            <View style={styles.inputView}>
              <Text style={styles.inputDescription}>First name</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="First name"
                mode="outlined"
                theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
                placeholderTextColor="#003f5c"
                onChangeText={(username) => setUsername(username)}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputDescription}>Last name</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="Last name"
                mode="outlined"
                placeholderTextColor="#003f5c"
                theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputDescription}>Student ID</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="Student ID"
                mode="outlined"
                placeholderTextColor="#003f5c"
                theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.changeBtn} onPress={() => navigation.navigate("Home Screen")}>
            <Text style={styles.changeText}>Change personal information</Text>
          </TouchableOpacity>
        </View>


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
                placeholderTextColor="#003f5c"
                onChangeText={(username) => setUsername(username)}
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
                onChangeText={(password) => setPassword(password)}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.changeBtn} onPress={() => navigation.navigate("Home Screen")}>
            <Text style={styles.changeText}>Change password</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate("Login Screen")}>
          <Text style={styles.changeText}>Logout</Text>
        </TouchableOpacity>
        
      </ImageBackground>
      </ScrollView>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundimage: {
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

