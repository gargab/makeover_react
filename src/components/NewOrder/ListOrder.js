import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { List } from "react-native-elements";

import OrderItem from './OrderItem'
//import flatListData from '../../Data/dummyData'

export default class ListOrder extends Component {


  flatListData = [
      {
          "key": "598a678278fee204ee51cd2c",
          "name": "Cream Tea",
          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Cornish_cream_tea_2.jpg",
          "foodDescription": "This is a cup of cream tea"
      },
      {
          "key": "598a684f78fee204ee51cd2f",
          "name": "Fresh mushroom",
          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Lactarius_indigo_48568.jpg",
          "foodDescription": "Fresh mushroom with vegetables. This is a long line, this is a long line, this is a long line,this is a long line,this is a long line"
      },
      {
          "key": "598a687678fee204ee51cd30",
          "name": "Japanese Oyster",
          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Oysters_served_on_ice%2C_with_lemon_and_parsley.jpg",
          "foodDescription": "Oysters with ice rock"
      }];

    constructor(props) {
        super(props);
        this.state = ({
            deletedRowKey: null,
            data:[]
        });
    }
    refreshFlatList = (deletedKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: deletedKey
            };
        });
    }
    onPressAdd = () => {
        this.props.navigation.navigate('addItems');
    }

    renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "86%",
            backgroundColor: "#CED0CE",
            marginLeft: "14%"
          }}
        />
      );
    };

    render() {
      return (
        <SafeAreaView>
        <View >
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, height: "100%" }}>
            <FlatList
              data={this.flatListData}
              renderItem={({ item, index}) => (
                <OrderItem item={item} index={index} parentFlatList={this}>

                </OrderItem>
              )}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </List>
          <TouchableOpacity onPress={this.onPressAdd} style={styles.fab}>
            <Text style={styles.fabIcon}>+</Text>
          </TouchableOpacity>
          </View >
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
  fab: {
      position: 'absolute',
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      right: 20,
      bottom: 20,
      backgroundColor: '#03A9F4',
      borderRadius: 30,
      elevation: 8,
      justifyContent: 'center',
      alignItems: 'center'
      },
      fabIcon: {
        fontSize: 30,
        color: 'white'
      }
});
