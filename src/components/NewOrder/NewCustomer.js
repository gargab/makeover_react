import React, { Component } from 'react';
import { AppRegistry, Keyboard,ScrollView, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';

import Toast from 'react-native-simple-toast';
import { retrieveData } from '../../services/GetLocal';
import { postData } from '../../services/PostData';



class NewCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      phone_number: '',
      name: '',
      address: '',
      token: ''
  };
  }


  createCustomer = async () => {
    Keyboard.dismiss();
    var resultMap = await retrieveData(['phone_number','token']);

    var phone_number = resultMap['phone_number'];
    this.setState({token : resultMap['token'] });
    var path = phone_number + '/' + 'customer';
    postData(path,this.state).then((res)=>{
      if(res[0] == 200){
      this.props.navigation.navigate('newOrder');
      }
      else{
        Toast.show(res[1].data, Toast.LONG);
      }
    });

  }

  render () {

    return(
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.container}>
            <TextField
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={(text) => this.setState({name : text})}
              returnKeyType='next'
              label='Name'
            />

            <TextField
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={(text) => this.setState({address :  text})}
              returnKeyType='next'
              label='Address'
            />

            <TextField
              autoCorrect={false}
              returnKeyType='next'
              onChangeText={(text) => this.setState({phone_number : text})}
              label='Phone No.'
              characterRestriction={15}
            />

          </View>


          <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.createCustomer}
          >
            <Text style={styles.buttonText}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </ScrollView>
    );
  }

}

export default NewCustomer;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#E8EAF6',
  },

  container: {
    margin: 8,
    marginTop: 24,
  },

  contentContainer: {
    padding: 8,
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
