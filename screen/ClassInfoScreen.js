import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";

import axios from 'axios';
import {ip} from '../Ip'
import HeaderBar from "../component/HeaderBar";


const ClassInfoScreen = ({ navigation, route }) => {
  let displayChat = 'none';
  const storeData = useSelector((state) => state.reducer.account);
  const [accountData, setData] = useState("");
  const classData = route.params.classData;
  const [oldNote, setoldNote] = useState("");
  const [note, setNote] = useState("");
  const [edit, setEdit] = useState(false);
  const [subjectData, setSubjectData] = useState([]);
  const refInput = useRef();

  useEffect(() => {
    setData(storeData[0]);
  }, []);

  useEffect(() => {
    if(classData.subject_id > 0){
      axios.post('http://'+ip+':3000/subjectData', {subject_id: classData.subject_id})
      .then(function (response){
        if(response.data.status == 'complete'){
          setSubjectData(response.data.result[0])
          setoldNote(subjectData.notification);
          setNote(oldNote);
        }
        else{
          console.log('error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [oldNote]);

  function addNote(){
    setEdit(true);
    refInput.current.focus();
  }

  function saveNote(){
    axios.post('http://'+ip+':3000/addNote', {subject_id: classData.subject_id, notification: note})
    .then(function (response){
      console.log(response.data);
      if(response.data.status == 'complete'){
        setoldNote(note);
        setEdit(false);
        console.log("complete");
      }
      else{
        console.log('error');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function cancelNote(){
    setNote(oldNote);
    setEdit(false);
  }

  const ButtonComponent = () => {
    if(accountData.role == "teacher"){
      if(edit){
        return(
          <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.btn, {marginRight: 10}]} onPress={saveNote}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={cancelNote}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )
      }
      else{
        return(
          <TouchableOpacity style={styles.btn} onPress={addNote}>
            <Text style={styles.btnText}>Add note</Text>
          </TouchableOpacity>
        )
      }
    }
  }
  const joinRoom = async () =>{
    axios.post('http://'+ip+':3000/chatroom', {account_id: accountData.account_id, receiver_id: subjectData.teacher_id})
        .then((response) => {
            if(response.data.status == "complete"){
                console.log(response.data.room_id)
                if(accountData.account_id !== "" && response.data.room_id !== ""){
                  route.params.socket.emit("join_room", response.data.room_id);
                  navigation.navigate("Chat Screen", {socket: route.params.socket, receiver_id: subjectData.teacher_id, roomId: response.data.room_id+''})
                }
            }
            else{
              console.log("error")
            }
        })
        .catch((err) =>{
            alert("err: " + err);
        });
  }
  const joinRoom2 = async () =>{
    axios.post('http://'+ip+':3000/chatroom', {account_id: accountData.account_id, receiver_id: subjectData.teacher_id2})
        .then((response) => {
            if(response.data.status == "complete"){
                console.log(response.data.room_id)
                if(accountData.account_id !== "" && response.data.room_id !== ""){
                  route.params.socket.emit("join_room", response.data.room_id);
                  navigation.navigate("Chat Screen", {socket: route.params.socket, receiver_id: subjectData.teacher_id2, roomId: response.data.room_id+''})
                }
            }
            else{
              console.log("error")
            }
        })
        .catch((err) =>{
            alert("err: " + err);
        });
  }
  
  

  const TeacherComponent = () => {
    if(accountData.role == "student"){
      displayChat = 'flex';
    }
    if(subjectData.teacher2 != null){
      return(
        <View style={{flexDirection:'row'}}>
          <Text style={styles.headtext}>Teacher: </Text>
          <View style={{flex:3}}>
            <View style={{flexDirection:'row'}}>
              <Text numberOfLines={2} style={styles.text}>{subjectData.teacher1}</Text>
              <TouchableOpacity style={[styles.btn2, {display: displayChat}]} onPress={() => {joinRoom()}}>
                <Text style={styles.btnText2}>Chat</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', marginTop:10}}>
              <Text numberOfLines={2} style={styles.text}>{subjectData.teacher2}</Text>
              <TouchableOpacity style={[styles.btn2, {display: displayChat}]} onPress={() => {joinRoom2()}}>
                <Text style={styles.btnText2}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    else{
      return(
        <View style={{flexDirection:'row'}}>
        <Text style={styles.headtext}>Teacher: </Text>
        <View style={{flex:3}}>
          <View style={{flexDirection:'row'}}>
            <Text numberOfLines={2} style={styles.text}>{subjectData.teacher1}</Text>
            <TouchableOpacity style={[styles.btn2, {display: displayChat}]} onPress={() => {joinRoom()}}>
              <Text style={styles.btnText2}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      );
    }
  }

  const ClassType = () => {
    if(classData.classType == "LEC"){
      return <Text style={styles.headtext}>Class Type: Lecture</Text>
    }
    else{
      return <Text style={styles.headtext}>Class Type: Lab</Text>
    }
  }

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} goBack={true}/>
      <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
        <StatusBar style="auto" />
        <View style={styles.contentView}>
          <View style={styles.containerText}>
            <Text numberOfLines={2} style={styles.headtext}>Class Name:</Text>
            <Text style={styles.text}>{classData.subjectname}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.headtext}>Time:</Text>
            <Text style={styles.text}>{classData.startTime} - {classData.endTime}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.headtext}>Room:</Text>
            <Text style={styles.text}>{classData.room}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.headtext}>Building:</Text>
            <Text style={styles.text}>{classData.building}</Text>
          </View>
          <ClassType/>
          <TeacherComponent/>
          <Text style={styles.headtext}>Teacher Note:</Text>
          <TextInput
            style={styles.TextInput}
            ref = {refInput}
            placeholder="Tacher Note"
            mode="outlined"
            placeholderTextColor="#003f5c"
            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
            onChangeText={(txt)=>setNote(txt)}
            value={note}
            multiline={true}
            maxLength={250}
            numberOfLines={4}
            editable={edit}/>
          <ButtonComponent/>
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
  iconView: {
    flex: 1,
    justifyContent: 'center'
  },
  icon: {
    fontSize: 50,
    color: 'black',
  },
  backgroundimage: {
    flex: 1,
    justifyContent: 'center'
  },
  contentView: {
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    height: '95%',
  },
  headtext: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF9900',
  },
  text:{
    fontSize: 15,
    flex: 1,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  TextInput: {
    width: '100%',
    borderRadius: 5,
    alignSelf:'center',
    backgroundColor: 'white',
    fontSize:16
  },
  btn: {
    borderRadius: 8,
    alignSelf:"center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "orange",
    padding: 10,
  },
  btnText: {
    color:'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  btn2: {
    alignSelf: 'center',
    borderRadius: 3,
    backgroundColor: "orange",
    padding: 5,
  },
  btnText2: {
    color:'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  btnContainer:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerText:{
    flexDirection: 'row'
  }
});

export default ClassInfoScreen;

