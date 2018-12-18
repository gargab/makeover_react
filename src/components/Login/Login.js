import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, KeyboardAvoidingView, StatusBar, Platform} from 'react-native'

import LoginForm from './LoginForm'


const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0

export default class Login extends Component{

  render(){
    return (
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset} style={styles.container}>
        <View style={styles.container}>
          <StatusBar
            barStyle='light-content'
            backgroundColor="#4f6d7a"
            />
          <View style={styles.logoContainer}>
          <Image
          style={styles.logo}
          source={require('../../images/github-logo.png')}/>
          <Text style = {styles.title}> Makeover </Text>
          </View>
          <View style={styles.formContainer}>
            <LoginForm navigation={this.props.navigation}/>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles=StyleSheet.create({

  container:{
    backgroundColor: '#3498db',
    flex:1
  },
  logoContainer:{
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo:{
    width:100,
    height:100
  },
  title:{
    color:"#FFF",
    marginTop: 10,
    width:160,
    textAlign: 'center',
    opacity: 0.9
  },
  formContainer:{
    flex: 1
  }
});
