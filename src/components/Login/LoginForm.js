import React, {Component} from 'react';
import {View, Keyboard, TextInput, StyleSheet, TouchableOpacity, Text, StatusBar} from 'react-native'

import { postData } from '../../services/PostData';
import { storeData } from '../../services/StoreLocal';
import Toast from 'react-native-simple-toast';
import { AsyncStorage } from "react-native"

export default class LoginForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      phone_number : ''
    };
  }

  handleLogin = async () => {
    Keyboard.dismiss();
    postData('login',this.state).then((res) => {

      if(res[0] == 200){
        storeData(this.state).then(() =>
        {
          this.props.navigation.navigate('otp');
        });

      }
      else{
        Toast.show('Number Not Registered', Toast.LONG);
      }

    });
  }
  render(){
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Phone No."
          placeholderTextColor='rgba(255,255,255,0.7)'
          returnKeyType="next"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => this.setState({phone_number : text})}
          style={styles.input}/>

        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={this.handleLogin}
        >
          <Text style={styles.buttonText}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles=StyleSheet.create({

  container:{
    padding: 20
  },
  input:{
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: "#FFF",
    paddingHorizontal: 10
  },
  buttonContainer:{
    backgroundColor:'#2980b9',
    paddingVertical: 15
  },
  buttonText:{
    textAlign: 'center',
    color:'#FFFFFF',
    fontWeight: "700"
  }
});
