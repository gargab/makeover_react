import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, KeyboardAvoidingView, StatusBar, Platform,TextInput,TouchableOpacity} from 'react-native'


const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0

export default class OtpValidator extends Component{

  constructor(props) {
    super(props);
    this.state = {otp: '',bb:'ffff'};
  }

  handleLogin = () => {

    let s = this.state;
    console.log(s.otp);
    this.props.navigation.navigate('splash');
  }

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
        <TextInput
        placeholder="otp"
        placeholderTextColor='rgba(255,255,255,0.7)'
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="go"
        onChangeText={(text) => this.setState({otp : text})}
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
      </View>
    </KeyboardAvoidingView>
  );
}

}


const styles=StyleSheet.create({

  container:{
    padding: 20,
    backgroundColor: '#3498db',
    flex:1
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
