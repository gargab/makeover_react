import React, { Component } from 'react';
import { AppRegistry, Keyboard,ScrollView, View, StyleSheet, TouchableOpacity, Text, Switch} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import { Card } from "react-native-elements";

import Toast from 'react-native-simple-toast';
import { retrieveData } from '../../services/GetLocal';
import { postData } from '../../services/PostData';



class NewUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
  };
  }


  render () {

    return(
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='handled'
        >
          <Card>
            <View style={styles.row}>
                <View style={{flex:1, marginRight:'2%'}}>
                  <TextField
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    onChangeText={(text) => this.setState({first_name : text})}
                    returnKeyType='next'
                    label='First Name'
                    selectionColor='#000000'
                  />
                </View>
                <View style={{flex:1, marginLeft:'2%'}}>
                  <TextField
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    onChangeText={(text) => this.setState({last_name : text})}
                    returnKeyType='next'
                    label='Last Name'
                    selectionColor='#000000'
                  />
              </View>
              </View>

              <TextField
                autoCorrect={false}
                returnKeyType='next'
                onChangeText={(text) => this.setState({phone_number : text})}
                label='Phone No.'
                characterRestriction={12}
                selectionColor='#000000'
                textContentType='telephoneNumber'
              />

              <View style={styles.adminrow}>
                <Text style={{fontSize: 16, fontWeight: '200'}}> Admin </Text>
                <Switch onValueChange = {(val) => val ? this.setState({admin: 1}) : this.setState({admin: 0})}/>
              </View>

              <TextField
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onChangeText={(text) => this.setState({address :  text})}
                returnKeyType='next'
                label='Email'
                selectionColor='#000000'
                textContentType='emailAddress'
              />

              <View style={styles.row}>
              <View style={{flex:3}}>
                  <Dropdown
                    label='Group'
                    ref='GroupDropdown'
                    data={this.state.Category}
                  />
                </View>

                <View style={{flex:1, margin: '5%', justifyContent: 'center'}}>

                  <TouchableOpacity
                  style={styles.plusContainer}>
                    <Text style={styles.plusText}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>

              <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.createCustomer}
              >
                <Text style={styles.buttonText}>
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </Card>
        </ScrollView>
    );
  }

}

export default NewUser;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFFFFF',
    marginTop: 21
  },
 row: {
   flexDirection:'row',
   justifyContent: 'space-between',
   flex:1
 },
  adminrow: {
    flexDirection:'row',
    justifyContent: 'space-between',
    flex:1,
    paddingTop: '5%'
  },
  buttonContainer:{
    backgroundColor:'#000000',
    paddingVertical: 15,
    marginTop: '5%'
  },
  buttonText:{
    textAlign: 'center',
    color:'#FFFFFF',
    fontWeight: "700"
  },
  plusContainer:{
    backgroundColor:'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plusText:{
    textAlign: 'center',
    color:'#3498db',
    fontSize: 40,
    fontWeight: '500'
  }
});
