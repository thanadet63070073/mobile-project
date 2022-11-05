import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

//import screen
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import HomeScreen from "./screen/HomeScreen";
import TimetableScreen from './screen/TimetableScreen';
import ChatScreen from './screen/ChatScreen';
import ProfileScreen from './screen/ProfileScree';

const Tab = createBottomTabNavigator();

function MenuTab() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, 
      tabBarActiveTintColor: "#FF9900",
      tabBarInactiveTintColor: 'white',
      tabBarStyle: { backgroundColor: "#FF9900" },}}>
      {/* <Tab.Screen name="Home" component={HomeScreen} options={{tabBarActiveBackgroundColor: "white", tabBarLabel:"",
        tabBarIcon: ({ color, size }) => { 
          return <FontAwesome name="home" size={size} color={color} />;
        },
      }}/> */}
      {/* <Tab.Screen name="Timetable" component={TimetableScreen} options={{tabBarActiveBackgroundColor: "white", tabBarLabel:"",
        tabBarIcon: ({ color, size }) => { 
          return <MaterialCommunityIcons name="timetable" size={size} color={color} />;
        },
      }}/>
      <Tab.Screen name="Chat" component={ChatScreen} options={{tabBarActiveBackgroundColor: "white", tabBarLabel:"",
        tabBarIcon: ({ color, size }) => { 
          return <Entypo name="chat" size={size} color={color} />;
        },
      }}/> */}
      <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarActiveBackgroundColor: "white", tabBarLabel:"",
        tabBarIcon: ({ color, size }) => { 
          return <MaterialCommunityIcons name="account-cog" size={size} color={color} />;
        },
      }}/>
      {/* <Tab.Screen name="Register 2" component={RegisterScreen}/>
      <Tab.Screen name="Register 3" component={RegisterScreen}/> */}
    </Tab.Navigator>
  )
}

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login Screen" component={LoginScreen} options={{headerTitleStyle:{color: 'white'}, headerStyle: {backgroundColor: '#FF9900'}}}/>
        <Stack.Screen name="Register Screen" component={RegisterScreen} options={{headerTitleStyle:{color: 'white'}, headerStyle: {backgroundColor: '#FF9900'}}}/> */}
        <Stack.Screen options={{headerShown: false}} name="Home Screen" component={MenuTab}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});