import React, { Component } from 'react';
import { FlatList, AppRegistry, ScrollView, View, StyleSheet, TouchableOpacity, Text, Button} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import { List, Card } from "react-native-elements";
import { getData } from '../../services/GetData';
import { retrieveData } from '../../services/GetLocal';
import Toast from 'react-native-simple-toast';

import ViewOrderItem from './ViewOrderItem.js'

class ViewOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders:[]
    };
  }


  componentDidMount = async() =>{
    retrieveData(['phone_number','token']).then((resultMap)=>{
      var path = resultMap['phone_number'] + '/' + 'orders';

      var queryData = {'token' : resultMap['token'] };
      getData(path,queryData).then((res)=>{
        this.setState({
          orders : res[1]
        })
      });
  });
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

    return(
        <View
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
        >
              <FlatList
                data={this.state.orders}
                renderItem={({ item, index}) => (
                  <ViewOrderItem item={item} index={index} navigation={this.props.navigation} parentFlatList={this}>

                  </ViewOrderItem>
                )}
                ItemSeparatorComponent={this.renderSeparator}
              />
        </View>
    );
  }

}

export default ViewOrders;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFFFFF',
  },

  container: {
    margin: 8,
    marginTop: 24,
  },

  contentContainer: {
    padding: 8
  },
  buttonContainer:{
    backgroundColor:'#000000',
    paddingVertical: 15,
    paddingLeft: "5%",
    paddingRight: "5%",
    justifyContent: 'center',
    marginLeft: '5%',
    marginRight: '5%',

  },
  buttonText:{
    textAlign: 'center',
    color:'#FFFFFF',
    fontWeight: "700"
  }
});
