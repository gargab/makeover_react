import React, { Component } from 'react';
import { FlatList, AppRegistry, ScrollView, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import { List } from "react-native-elements";

import Item from './Item.js'

class AddItems extends Component {

  flatListData = [
    {
        "key": "598a678278fee204ee51cd2c",
        "name": "Cream Tea",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Cornish_cream_tea_2.jpg",
        "foodDescription": "This is a cup of cream tea",
        "value":0
    },
    {
        "key": "598a684f78fee204ee51cd2f",
        "name": "Fresh mushroom",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Lactarius_indigo_48568.jpg",
        "foodDescription": "Fresh mushroom with vegetables. This is a long line, this is a long line, this is a long line,this is a long line,this is a long line",
        "value":0
    }
  ]
  goToList = () => {
    //console.log(this.props)
    this.props.navigation.navigate('listOrder')
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 8,
          width: "86%",
          marginLeft: "14%"
        }}
      />
    );
  };


  render () {

    let Category = [{
      value: 'Nail Polish',
    }, {
      value: 'Lipstick',
    }, {
      value: 'Eye Liner',
    }];

    let Brand = [{
      value: 'Tiens',
    }, {
      value: 'Daily',
    }, {
      value: 'Exclusive',
    }];

    return(
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.container}>

            <Dropdown
              label='Category'
              data={Category}
            />

            <Dropdown
              label='Brand'
              data={Brand}
            />

            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, height: "100%" }}>
              <FlatList
                data={this.flatListData}
                renderItem={({ item, index}) => (
                  <Item item={item} index={index} parentFlatList={this}>

                  </Item>
                )}
                ItemSeparatorComponent={this.renderSeparator}
              />
            </List>
          </View>


          <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.goToList}
          >
            <Text style={styles.buttonText}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </ScrollView>
    );
  }

}

export default AddItems;

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
