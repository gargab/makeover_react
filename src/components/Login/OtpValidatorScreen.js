import React, {Component} from 'react';
import {View, Keyboard, Text, StyleSheet, Image, KeyboardAvoidingView, StatusBar, Platform,TextInput,TouchableOpacity} from 'react-native'

import { getData } from '../../services/GetData';
import { retrieveData } from '../../services/GetLocal';
import { storeData } from '../../services/StoreLocal';
import Toast from 'react-native-simple-toast';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
const behaviourstr = Platform.OS === 'ios' ? 'padding' : ''

export default class OtpValidator extends Component{

  constructor(props) {
    super(props);
    this.state = {token: '',
  };
  }

  handleOtp = async () => {
    Keyboard.dismiss();
    var resultMap = await retrieveData(['phone_number']);


    var requestData = {}
    requestData['token'] = this.state.token;
    requestData['phone_number'] =  resultMap['phone_number'];
    getData('login',requestData).then((res)=>{
      if(res[0] == 200){
        storeData(res[1]).then(() =>
        {
          console.log(retrieveData(['phone_number','token']));
          this.props.navigation.navigate('splash');
        });
      }
      else{
        Toast.show('Invalid Otp', Toast.LONG);
      }
    });


  }

render(){
  return (
    <KeyboardAvoidingView behavior={behaviourstr} keyboardVerticalOffset={keyboardVerticalOffset} style={styles.container}>
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
        onChangeText={(text) => this.setState({token : text})}
        style={styles.input}/>
        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={this.handleOtp}
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
