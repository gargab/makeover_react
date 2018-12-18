import { createStackNavigator, DrawerActions } from 'react-navigation';
import React, {Component} from 'react';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';

import AppNavigator from './AppNavigator';
import LoginNavigator from './LoginNavigator'


const MainNavigator = createStackNavigator({
  loginnavigator: { screen: LoginNavigator },
  appnavigator: { screen: AppNavigator }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'loginnavigator'
})

export default MainNavigator;
