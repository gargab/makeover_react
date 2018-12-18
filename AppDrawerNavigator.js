import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import {SafeAreaView, ScrollView, Dimensions, Image, StyleSheet} from 'react-native';
import React, {Component} from 'react';

import Splash from './Splash';
import Login from './src/components/Login/Login';
import NewOrder from './src/components/NewOrder/NewOrder';
import DrawerScreen from './src/components/Drawer/DrawerScreen';



const AppDrawerNavigator = createDrawerNavigator({
  splash: Splash,
  newOrder: NewOrder
},
{
  contentComponent: DrawerScreen,
  initialRouteName: 'splash',
  drawerWidth: 300
});


const styles=StyleSheet.create({

  profile:{
    width:120,
    height:120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AppDrawerNavigator;
