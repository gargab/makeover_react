import React, {Component} from 'react';
import {View, Keyboard, TextInput, StyleSheet, TouchableOpacity, Text, StatusBar} from 'react-native'

import { postData } from '../../services/PostData';
import { storeData } from '../../services/StoreLocal';
import { getData } from '../../services/GetData';
import { retrieveData } from '../../services/GetLocal';
import Toast from 'react-native-simple-toast';
import { AsyncStorage } from "react-native"

export default class InitialScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      flag : 'nothing'
    };
  }

  checkStatus = () => {

      retrieveData(['phone_number','token']).then((resultMap)=>{
        var phoneNumber = resultMap['phone_number'];
        var token = resultMap['token'];
        if(phoneNumber!=null && token!=null){
          var requestData = {}
          requestData['token'] = token;
          requestData['phone_number'] =  phoneNumber;
          getData('login',requestData).then((res)=>{
            if(res[0] == 200){
            this.setState({flag : 'LoggedIn'});
            return true;
            }
          else{
              this.setState({flag : 'NotLoggedIn'});
            return false;
          }});
        }
        else{
          this.setState({flag : 'NotLoggedIn'});
        return false;
        }
      });
  }

componentDidMount(){

  var val = this.checkStatus();




}


render(){

  if(this.state.flag == 'LoggedIn'){
      this.props.navigation.navigate('splash');
      return null;
  }
  else if(this.state.flag == 'NotLoggedIn'){
    this.props.navigation.navigate('loginnavigator');
    return null;
  }
  else{
    return null;
  }


  }
}
