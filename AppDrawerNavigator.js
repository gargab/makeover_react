import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import {SafeAreaView, ScrollView, Dimensions, Image, StyleSheet} from 'react-native';
import React, {Component} from 'react';

import Splash from './Splash';
import Login from './src/components/Login/Login';
import NewOrder from './src/components/NewOrder/NewOrder';
import DrawerScreen from './src/components/Drawer/DrawerScreen';
import NewCustomer from './src/components/NewOrder/NewCustomer';
import ListOrder from './src/components/NewOrder/ListOrder';
import AddItems from './src/components/NewOrder/AddItems';
import ViewOrders from './src/components/ViewOrders/ViewOrders';
import NewUser from './src/components/NewUser/NewUser';
import statScreen from './src/components/Stats/statScreen';
import ViewOrderDetails from './src/components/ViewOrders/ViewOrderDetails';


const AppDrawerNavigator = createDrawerNavigator({
  splash: Splash,
  newOrder: NewOrder,
  newCustomer: NewCustomer,
  listOrder: ListOrder,
  addItems:AddItems,
  viewOrders: ViewOrders,
  newUser: NewUser,
  stat: statScreen,
  viewOrderDetails : ViewOrderDetails
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
