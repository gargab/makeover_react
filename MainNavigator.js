import { createStackNavigator, DrawerActions } from 'react-navigation';
import React, {Component} from 'react';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';

import AppNavigator from './AppNavigator';
import LoginNavigator from './LoginNavigator';
import InitialScreen from './src/components/Login/InitialScreen';
import ViewOrders from './src/components/ViewOrders/ViewOrders';


const MainNavigator = createStackNavigator({
  initialScreen: {screen: InitialScreen},
  loginnavigator: { screen: LoginNavigator },
  appnavigator: { screen: AppNavigator }
}, {
  headerMode: 'none',
  initialRouteName: 'initialScreen'
});


export default MainNavigator;
