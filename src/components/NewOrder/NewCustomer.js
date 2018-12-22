import React, { Component } from 'react';
import { AppRegistry, ScrollView, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';


class NewCustomer extends Component {

  createCustomer = () => {
    //console.log(this.props)
    this.props.navigation.navigate('newOrder')
  }

  render () {

    let data = [{
      value: 'Ludhiana',
    }, {
      value: 'Punjab',
    }, {
      value: 'India',
    }];

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
              returnKeyType='next'
              label='Name'
            />

            <TextField
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              returnKeyType='next'
              label='Address'
            />

            <TextField
              autoCorrect={false}
              returnKeyType='next'
              label='Phone No.'
              characterRestriction={15}
            />

            <Dropdown
              label='Favorite Fruit'
              data={data}
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
