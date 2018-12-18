import React, {Component} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text, StatusBar} from 'react-native'

export default class LoginForm extends Component{


  handleLogin = () => {
    //console.log(this.props)
    this.props.navigation.navigate('splash')
  }
  render(){
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Phone No."
          placeholderTextColor='rgba(255,255,255,0.7)'
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}/>
        <TextInput
        placeholder="Password"
        placeholderTextColor='rgba(255,255,255,0.7)'
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="go"
        ref={(input) => this.passwordInput = input}
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
