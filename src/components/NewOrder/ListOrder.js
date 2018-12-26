import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { List } from "react-native-elements";
import Toast from 'react-native-simple-toast';
import { FloatingAction } from 'react-native-floating-action';

import { postData } from '../../services/PostData';
import { retrieveData } from '../../services/GetLocal';

import OrderItem from './OrderItem'
//import flatListData from '../../Data/dummyData'

export default class ListOrder extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            deletedRowKey: null,
            orderList : [],
            orderMap : {},
            isNavigation : true
        });
    }

  actions = [{
    text: 'New Item',
    icon: require('../../images/new_item_white.png'),
    name: 'bt_newItem',
    position: 1,
    color: '#000000'
  }, {
    text: 'Submit',
    icon: require('../../images/submit_white.png'),
    name: 'bt_submit',
    position: 2,
    color: '#000000'
  }];

    refreshFlatList = (deletedKey) => {
        var orderMap = this.state.orderMap;
        delete orderMap[deletedKey];
        this.populateOrders(orderMap);
    }

    submit = async () =>{
      var resultMap = await retrieveData(['phone_number','token']);
      var phone_number = resultMap['phone_number'];

      var path = phone_number + '/' + 'order';
      var id  = this.props.navigation.getParam('id', null);
      var queryData = {"token" : resultMap['token'],
      "customer_id" : id,
      "orderMap" : this.state.orderMap
     }
     postData(path,queryData).then((res)=>{
       if(res[0] == 200){
       Toast.show("Order Posted", Toast.LONG);
       this.populateOrders({});
       this.props.navigation.navigate('splash');
       }
       else{
         Toast.show(res[1].data, Toast.LONG);
       }
     });
    }

    onPressAdd = () => {
        this.setState({
          isNavigation : true
        });
        this.props.navigation.navigate('addItems',{
          "reference" : this});
    }

    populateOrders = (orderMap) => {

      var orderList = [];

      for(key in orderMap){

        var combinationArray = key.split("_");
        var obj = {
          "brand" : combinationArray[0],
          "category" : combinationArray[1],
          "shade" : combinationArray[2],
          "qty" : orderMap[key]
        }

        orderList.push(obj);

      }

      this.setState({
        orderList : orderList,
        orderMap : orderMap
      });

    }

    aggregateOrders = (retOrderMap) => {
      var orderMap = this.state.orderMap;

      for( key in retOrderMap){
        if(key in orderMap){
          orderMap[key] = orderMap[key] + retOrderMap[key];
        }
        else{
          orderMap[key] = retOrderMap[key];
        }

      }
      this.populateOrders(orderMap);

    }

    renderSeparator = () => {
      return (
        <View
          style={{
            backgroundColor: "#CED0CE"
          }}
        />
      );
    };

    renderHeader = () => {
      return (
        <View style={{borderBottomWidth: 1}}>
        <View style={{
          flex: 1,
          flexDirection:'column',
          height: 40,
          marginLeft:"5%",
          marginRight:"5%",
          marginTop:"5%"
        }}>
          <View style={{
                      flex: 1,
                      flexDirection:'row',
                      justifyContent:'space-between'

          }}>
            <Text style={styles.flatListItem}>Brand</Text>
            <Text style={styles.flatListItem}>Category</Text>
            <Text style={styles.flatListItem}>Shade</Text>
            <Text style={styles.flatListItem}>Qty</Text>
          </View>
        </View>
        </View>
      );
    };

    render() {
      return (
        <SafeAreaView>
        <View >
            <FlatList
            style={{height: '100%' }}
              data={this.state.orderList}
              renderItem={({ item, index}) => (
                <OrderItem item={item} index={index} parentFlatList={this}>

                </OrderItem>
              )}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
            />
          <FloatingAction
            style={styles.floatingButton}
            color='#000000'
            actions={this.actions}
            onPressItem={
              (name) => {
                if (name == 'bt_newItem'){
                  this.onPressAdd()
                }
                else{
                  this.submit()
                }
              }
            }
          />
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
      },
      buttonContainer:{
        backgroundColor:'#2980b9',
        paddingVertical: 15,
        marginTop: "5%",
        marginBottom: "5%"
      },
      floatingButton:{
        position: 'absolute',
        bottom:0,
        left:0
      }
});
