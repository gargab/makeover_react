import { createStackNavigator, DrawerActions } from 'react-navigation';
import React, {Component} from 'react';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';
import OtpValidator from './src/components/Login/OtpValidatorScreen';
import Login from './src/components/Login/Login'

// login stack
const LoginNavigator = createStackNavigator({
  login: { screen: Login },
  otp: OtpValidator
}, {
  initialRouteName: 'login',
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: '#3498db'},
  }
})


export default LoginNavigator;
