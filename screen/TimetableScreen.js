import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from "react-redux";

// import Component
import HeaderBar from "../component/HeaderBar";

import axios from 'axios';
import {ip} from '../Ip'

let currentDay = "";
let examDate = "";
let examDay = "";
let bgColorArr = ['#FFEEEA', '#E9EAF4', '#EAF9FF', '#eaffea', '#fdeaff'];
let circleColorArr = ['#FFCABD', '#BABDDB', '#B7CBFF', '#bdffbf', '#f5bdff']
let txtColorArr = ['#FD6540', '#636BAE', '#2864FF', '#40a33c', '#da40fd'];
let randomNumber = 0;
let semesterArr = [];

const TimetableScreen = ({navigation}) => {
  const [showData, setShowData] = useState([]);
  //get account data from store
  const storeData = useSelector((state) => state.reducer.account);
  const [accountData, setData] = useState("");
  
  //drop down
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('class');
  const [items, setItems] = useState([
    {label:'Class Time Table', value: 'class'},
    {label:'Exam Time Table', value: 'exam'}
  ])

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState('midterm');
  const [items2, setItems2] = useState([
    {label:'Midterm', value: 'midterm'},
    {label:'Final', value: 'final'},
  ])
  const [dropdownDisplay, setDropdownDisplay] = useState("none");

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState('');
  const [items3, setItems3] = useState([]);

  //Function
  function changeDropdown(){
    console.log(value +" "+ value2+" "+value3);
    if(value == "class"){
      setDropdownDisplay("none");
      axios.post('http://'+ip+':3000/classTable', {account_id: accountData.account_id, semester: value3, role: accountData.role})
      .then(function (response){
        if(response.data.status == 'complete'){
          setShowData(response.data.classData);
        }
        else{
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else if(value == "exam"){
      setDropdownDisplay("flex");
      axios.post('http://'+ip+':3000/examTable', {account_id: accountData.account_id, type: value2, semester: value3, role: accountData.role})
      .then(function (response){
        if(response.data.status == 'complete'){
          setShowData(response.data.examData);
        }
        else{
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  //Component
  function DayComponent(props){
    if(currentDay != props.day){
      currentDay = props.day;
      return <Text style={styles.dayText}>{currentDay}</Text>
    }
  }

  function ExamDateComponent(props){
    if(examDate != props.date){
      examDate = props.date;
      switch (props.day){
        case 0: examDay = "Monday" 
        break;
        case 1: examDay = "Tuesday"
        break;
        case 2: examDay = "Wednesday"
        break;
        case 3: examDay = "Thursday"
        break;
        case 4: examDay = "Friday"
        break;
        case 5: examDay = "Saturday"
        break
        case 6: examDay = "Sunday"
        break;
        default: examDay = ""
      }
      return <Text style={styles.dateText}>{examDate}, {examDay}</Text>
    }
  }

  useEffect(() => {
    setData(storeData[0]);
  }, []);

  useEffect(() => {
    if(accountData){
      axios.post('http://'+ip+':3000/semester', {account_id: accountData.account_id, role: accountData.role})
      .then(function (response){
        if(response.data.status == 'complete'){
          semesterArr = response.data.semester;
          for(let i in response.data.semester){
            items3.push(response.data.semester[i]);
          }
          setValue3(semesterArr[0].value);
        }
        else{
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [accountData])
  
  useEffect(() => {
    if(accountData && semesterArr.length > 0){
      axios.post('http://'+ip+':3000/classTable', {account_id: accountData.account_id, semester: value3, role: accountData.role})
      .then(function (response){
        if(response.data.status == 'complete'){
          setShowData(response.data.classData);
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

  const renderItem = ({ item }) => {
    randomNumber = item.id%bgColorArr.length
    if(value == "class"){
      return(
        <View>
          <DayComponent day={item.day} />
          <TouchableOpacity style={styles.boxView} onPress={() => navigation.navigate("ClassInfo Screen", {classData: item})}>
            <View style={[styles.box, {backgroundColor: bgColorArr[randomNumber]}]}> 
              <View style={styles.circleView}>
                <View style={[styles.circle, {backgroundColor: circleColorArr[randomNumber]}]}><Text style={styles.circleText}>{item.classType}</Text></View>
              </View>
              <View style={styles.textView}>
                <View style={styles.subNameView}>
                  <Text numberOfLines={2} style={[styles.subName, {color: txtColorArr[randomNumber]}]}>{item.subjectname}</Text>
                  <Text style={[styles.building, {color: txtColorArr[randomNumber]}]}>{item.building}</Text>
                </View>
                <View style={styles.classroomView}>
                  <Text style={[styles.time, {color: txtColorArr[randomNumber]}]}>{item.startTime} - {item.endTime}</Text>
                  <Text style={[styles.classroom, {color: txtColorArr[randomNumber]}]}>{item.room}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    if(value == "exam"){
      return (
        <View>
          <ExamDateComponent date={item.formatDate} day={item.day}/>
          <View style={styles.boxView}>
            <View style={[styles.box, {backgroundColor: bgColorArr[randomNumber]}]}> 
              <View style={styles.circleView}>
                <View style={[styles.circle, {backgroundColor: circleColorArr[randomNumber]}]}></View>
              </View>
              <View style={styles.textView}>
                <View style={styles.examNameView}>
                  <Text numberOfLines={2} style={[styles.subName, {color: txtColorArr[randomNumber]}]}>{item.subjectname}</Text>
                  <Text style={[styles.time, {color: txtColorArr[randomNumber]}]}>{item.startTime} - {item.endTime}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HeaderBar navigation={navigation}/>
      <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
        <View style={styles.dropDownView}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={changeDropdown}
            containerStyle={{width: 200}}
            style={{borderWidth: 0, backgroundColor: 'transparent', width: 200, zIndex: 2000}}
            labelStyle={{
              fontSize: 18,
              textDecorationLine: 'underline',
              textDecorationThickness: 3,
              color: '#FF9900',
              fontWeight: 'bold',
            }}
            dropDownContainerStyle={{width: 200, zIndex: 2000}}
          />
          
          <DropDownPicker
            open={open3}
            value={value3}
            items={items3}
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setItems3}
            onChangeValue={changeDropdown}
            containerStyle={{width: 120}}
            style={{borderWidth: 0, backgroundColor: 'transparent', width: 120, }}
            labelStyle={{
              fontSize: 18,
              textDecorationLine: 'underline',
              textDecorationThickness: 3,
              color: '#FF9900',
              fontWeight: 'bold',
            }}
            dropDownContainerStyle={{width: 120}}
          />
        </View>
        <View style={{zIndex:5}}>
          <DropDownPicker
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            onChangeValue={changeDropdown}
            containerStyle={{width: 200}}
            style={{borderWidth: 0, backgroundColor: 'transparent', width: 150, display: dropdownDisplay, }}
            labelStyle={{
              fontSize: 18,
              textDecorationLine: 'underline',
              textDecorationThickness: 3,
              color: '#FF9900',
              fontWeight: 'bold',
            }}
            dropDownContainerStyle={{width: 150}}
          />
        </View>
        
        <FlatList style={{paddingBottom:20}} data={showData} renderItem={renderItem}/>
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
  dropDownView:{
    flexDirection: 'row',
    zIndex: 10,
    justifyContent: 'space-between'
  },
  boxView: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  box: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  circleView:{
    flex: 1,
    justifyContent: 'center'
  },
  circle:{
    backgroundColor: '#FFCABD',
    width: 40,
    height: 40,
    borderRadius: '100%',
    justifyContent: 'center'
  },
  circleText:{
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  textView:{
    flex: 5,
    justifyContent: 'space-around'
  },
  dayText:{
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 10,
    color: 'grey',
    marginTop: 20,
    textTransform: 'capitalize',
  },
  dateText:{
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 10,
    color: 'grey',
    marginTop: 20,
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
    color: '#FD6540',
    fontSize: 16,
    fontWeight: 'bold'
  },
  time:{
    color: '#FD6540',
    fontSize: 14,
    fontWeight: 'bold',
  },
  classroomView: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  building:{
    color: '#FD6540',
    fontSize: 16,
    fontWeight: 'bold'
  },
  classroom: {
    color: '#FD6540',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default TimetableScreen;

