import { createStackNavigator, DrawerActions } from 'react-navigation';
import React, {Component} from 'react';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';

import Splash from './Splash'
import Login from './src/components/Login/Login'
import AppDrawerNavigator from './AppDrawerNavigator'


const MenuImage = ({navigation}) => {
    if(!navigation.state.isDrawerOpen){
        return <Image source={require('./src/images/menu-button.png')}
                      style={styles.menu}/>
    }else{
        return <Image source={require('./src/images/menu-button.png')}/>
    }
}


const AppNavigator = createStackNavigator({
  AppDrawerNavigator:{
       screen: AppDrawerNavigator
   },
  login:{
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      headerLeft:
      <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
          <MenuImage style="styles.bar" navigation={navigation}/>
      </TouchableOpacity>,
      headerStyle: {
          backgroundColor: '#333',
      },
      headerTintColor: '#fff'
    })
  },
  splash:{
    screen: Splash,
    navigationOptions: () => ({
      headerTitle: 'Splash',
      headerStyle: {
      backgroundColor: "#a13547",
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    },
    headerTintColor: "#cccccc"
      }),
  },
},
{
    initialRouteName: 'AppDrawerNavigator',
}
);




export default AppNavigator;

const styles=StyleSheet.create({

  menu:{
       height:10,
       width:10
   }
});
