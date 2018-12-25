  import React, { Component } from 'react';
  import { FlatList, AppRegistry, ScrollView, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
  import { TextField } from 'react-native-material-textfield';
  import { Dropdown } from 'react-native-material-dropdown';
  import { List } from "react-native-elements";
  import NumericInput from 'react-native-numeric-input'

  class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    render(){
      return (
        <View style={{
          flex: 1,
          flexDirection:'column',
          height: 40
        }}>
          <View style={{
                      flex: 1,
                      flexDirection:'row',
                      justifyContent:'space-between'
          }}>
            <Text style={styles.flatListItem}>{this.props.item.name}</Text>
            <NumericInput value={this.props.item.qty} onChange={value => {this.props.parentFlatList.updateQuantity(this.props.item.name,value)}} minValue = {0} totalWidth={80}
              totalHeight={40}/>
          </View>
        </View>
      )
    }
  }

  export default Item;

  const styles = StyleSheet.create({
      flatListItem: {
          color: 'black',
          padding: 5,
          fontSize: 16,
      }
  });
