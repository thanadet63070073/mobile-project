import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons} from '@expo/vector-icons';
import HeaderBar from "../component/HeaderBar";
import { useSelector } from "react-redux";



const HomeScreen = ({navigation}) => {
  const storeData = useSelector((state) => state.reducer.account);
  const [accountData, setData] = useState("");
  
  useEffect(() => {
    setData(storeData[0]);
  }, []);

  const StudentId = () =>{
    if(accountData.student_id != null){
      return <Text style={styles.text}>Student ID : {accountData.student_id}</Text>;
    }
  }
  
  const YearComponent = () =>{
    if(accountData.year != null){
      return <Text style={styles.text}>Year: {accountData.year}</Text>;
    }
  }
 
  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation}/>
      <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
        <StatusBar style="auto" />
        <View style={styles.textView}>
          <MaterialCommunityIcons style={styles.Icon} name="account-circle-outline" />
            <StudentId/>
            <Text style={styles.text}>{accountData.fname} {accountData.lname}</Text>
            <YearComponent/>
            <Text style={styles.text}>Faculity : {accountData.faculty}</Text>
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
