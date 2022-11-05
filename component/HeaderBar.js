import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Appbar } from 'react-native-paper';

const HeaderBar = (props) => {
    return (
      <Appbar.Header style={styles.bar}>
        <Image style={styles.HeaderImage} source={require('../assets/images/kmitl-text-white.png')}/>
        <Appbar.Content />
        <Appbar.Action color='white' icon="bell" onPress={() => props.navigation.navigate("Login Screen")}/>
      </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    bar: {
      backgroundColor: '#FF9900',
      height: 80,
    },
    HeaderImage: {
      width: 120,
      height: 60,
      resizeMode: 'stretch',
      marginLeft: 10
    }
});

export default HeaderBar;