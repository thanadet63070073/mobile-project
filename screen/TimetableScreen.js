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
import DropDownPicker from 'react-native-dropdown-picker';

// import Component
import HeaderBar from "../component/HeaderBar";

import axios from 'axios';
import {ip} from '../Ip'


const TimetableScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');
  const [items, setItems] = useState([
    {label:'Class Time Table', value: '1'},
    {label:'Exam Time Table', value: '2'}
  ])

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} />
      <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
        {/* <Image style={styles.logoImage} source={{uri:"https://www.kmids.ac.th/wp-content/uploads/2021/04/Sub-Logo-KMITL_KMITL-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%AD%E0%B8%A1%E0%B9%80%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%B2%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B1%E0%B8%87.png"}} /> */}
        
        <StatusBar style="auto" />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          // onSelectItem={}
          style={styles.dropdown}
          labelStyle={{
            fontSize: 18,
            textDecorationLine: 'underline',
            textDecorationThickness: 3,
            color: '#FF9900',
            fontWeight: 'bold'
          }}
        />

        <View style={styles.boxView}>
            <View style={styles.box}> 
              <View style={styles.circleView}>
                <View style={styles.circle}></View>
              </View>
              <View style={styles.textView}>
                <View style={styles.subNameView}>
                  <Text numberOfLines={2} style={styles.subName}>HUMAN INTERFACE DESIGN</Text>
                  <Text style={styles.building}>IT</Text>
                </View>
                <View style={styles.classroomView}>
                  <Text style={styles.time}>09.00 - 16.00</Text>
                  <Text style={styles.classroom}>Project Base 2</Text>
                </View>
              </View>
            </View>
        </View>

        <View style={styles.boxView}>
            <View style={styles.box}> 
              <View style={styles.circleView}>
                <View style={styles.circle}></View>
              </View>
              <View style={styles.textView}>
                <View style={styles.examNameView}>
                  <Text numberOfLines={2} style={styles.subName}>HUMAN INTERFACE DESIGN</Text>
                  <Text style={styles.time}>09.00 - 16.00</Text>
                </View>
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
    backgroundColor: '#F7D0D5',
    width: '100%',
    height: 80,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dropdown: {
    backgroundColor: 'transparent',
    width: 200,
    border: 0,
  },
  circleView:{
    flex: 1,
    justifyContent: 'center'
  },
  circle:{
    backgroundColor: '#faa0ac',
    width: 40,
    height: 40,
    borderRadius: '100%',
  },
  textView:{
    flex: 5,
    justifyContent: 'space-around'
  },
  subNameView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  examNameView: {
    flex: 5,
    justifyContent: 'space-around',
  },
  subName: {
    color: '#fa6b7e',
    fontSize: 16,
    fontWeight: 'bold'
  },
  time:{
    color: '#fa6b7e',
    fontSize: 14,
    fontWeight: 'bold',
  },
  classroomView: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  building:{
    color: '#fa6b7e',
    fontSize: 16,
    fontWeight: 'bold'
  },
  classroom: {
    color: '#fa6b7e',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default TimetableScreen;

