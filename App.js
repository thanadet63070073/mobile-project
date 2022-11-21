import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import loginReducer from './store/reducers/loginReducer';

//import screen
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import HomeScreen from "./screen/HomeScreen";
import TimetableScreen from './screen/TimetableScreen';
import ChatList from './screen/ChatList';
import ChatScreen from './screen/ChatScreen';
import ProfileScreen from './screen/ProfileScree';
import NotificationScreen from './screen/NotificationScreen';
import ClassInfoScreen from './screen/ClassInfoScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const rootReducer = combineReducers({
  reducer: loginReducer,
});
const store = createStore(rootReducer)

function MenuTab() {
  return (
    <Provider store={store}>
      <Tab.Navigator screenOptions={{headerShown: false, 
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF9900",
        tabBarInactiveTintColor: 'white',
        tabBarStyle: { backgroundColor: "#FF9900" },}}>
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarActiveBackgroundColor: "white",
          tabBarIcon: ({ color, size }) => { 
            return <FontAwesome name="home" size={size} color={color} />;
          },
        }}/>
        <Tab.Screen name="Timetable" component={TimetableScreen} options={{tabBarActiveBackgroundColor: "white",
          tabBarIcon: ({ color, size }) => { 
            return <MaterialCommunityIcons name="timetable" size={size} color={color} />;
          },
        }}/>
        <Tab.Screen name="ChatList" component={ChatList} options={{unmountOnBlur: true, tabBarActiveBackgroundColor: "white",
          tabBarIcon: ({ color, size }) => { 
            return <Entypo name="chat" size={size} color={color} />;
          },
        }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarActiveBackgroundColor: "white",
          tabBarIcon: ({ color, size }) => { 
            return <MaterialCommunityIcons name="account-cog" size={size} color={color} />;
          },
        }}/>
      </Tab.Navigator>
    </Provider>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitleStyle:{color: 'white'}, headerStyle: {backgroundColor: '#FF9900'}, headerTintColor:'white'}}>
          <Stack.Screen name="Login Screen" component={LoginScreen}/>
          <Stack.Screen name="Register Screen" component={RegisterScreen}/>
          <Stack.Screen name="Home Screen" component={MenuTab} options={{headerShown: false}}/>
          <Stack.Screen name="Notification Screen" component={NotificationScreen} options={{headerShown: false}}/>
          <Stack.Screen name="ClassInfo Screen" component={ClassInfoScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Chat Screen" component={ChatScreen} options={({route}) => ({title:route.params.title})} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
