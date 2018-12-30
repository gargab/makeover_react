import React, { Component } from 'react';
import { Modal, AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { List } from "react-native-elements";
import Toast from 'react-native-simple-toast';
import { FloatingAction } from 'react-native-floating-action';

import { postData } from '../../services/PostData';
import ViewOrderDetailItem from './ViewOrderDetailItem'
import EditOrderModal from './EditOrderModal'
import { getData } from '../../services/GetData';
import { retrieveData } from '../../services/GetLocal';



class ViewOrderDetails extends Component {
  constructor(props) {
      super(props);
      this.state = {
          value: null,
          orderMap : {},
          orderList : [],
          modalVisible: false,
          phone_number : '',
          path :'',
          token : '',
          isNavigation : true,
          currentScreenName : 'viewOrderDetails',
          qty : 0,
          KeyCombinationArray : [],
          editedKey : ''

      };
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

  submit = async () => {
    var queryData = {
      'orderMap' : this.state.orderMap,
      'token' : this.state.token
    }

    postData(this.state.path,queryData).then((res)=>{
      if(res[0] == 200){
        Toast.show(res[1].data, Toast.LONG);
        this.props.navigation.navigate('viewOrders');
      }
      else{
        Toast.show(res[1].data, Toast.LONG);
        this.props.navigation.navigate('viewOrders');
      }

    });
  }


  onPressAdd = () => {
      this.state.isNavigation = true;
      this.props.navigation.navigate('addItems',{
        "reference" : this});
  };


  makeRemoteRequest = async()=>{
    this.props.navigation.state.params.isNavigation = false;
    retrieveData(['phone_number','token']).then((resultMap)=>{
      var path = resultMap['phone_number'] + '/' + 'order' + '/' + this.props.navigation.getParam('id',null);
      this.setState({
        phone_number : resultMap['phone_number'],
        path : path,
        token : resultMap['token']
      })
      var queryData = {'token' : resultMap['token'] };

      getData(path,queryData).then((res)=>{
        if(res[0] == 200){
        this.populateOrders(res[1].orderMap);
        }
      else{
        Toast.show(res[1].data, Toast.LONG);
      }
      });

    });
  }

  componentDidMount = ()=>{
    this.makeRemoteRequest();
  }

  componentDidUpdate = async() =>{
    if(this.props.navigation.getParam('isNavigation',false)){
      this.props.navigation.state.params.isNavigation = false;
      this.makeRemoteRequest();
  }
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

  editOrder = (qty,deletedKey) => {
    var orderMap = this.state.orderMap;
    if(qty == 0){
      delete orderMap[deletedKey];
    }
    else{
      orderMap[deletedKey] = qty;
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

  showEditModal = (editedKey) => {
  //  this.refs.editOrderModal.refs.myModal.refs.abc.value = 60;

    var qty =  this.state.orderMap[editedKey];
    var KeyCombinationArray = editedKey.split("_");
    this.setState({
      qty : qty,
      KeyCombinationArray : KeyCombinationArray,
      editedKey : editedKey,
      modalVisible : true
    });

    this.render();
    this.refs.editOrderModal.refs.myModal.open();
  }

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


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <SafeAreaView style={this.state.modalVisible ? {backgroundColor: '#FFFFFF50'} : ''}>
      <View >
          <FlatList
          style={{height: '100%' }}
            data={this.state.orderList}
            renderItem={({ item, index}) => (
              <ViewOrderDetailItem item={item} index={index} parentFlatList={this}>

              </ViewOrderDetailItem>
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
        <EditOrderModal ref={'editOrderModal'} parentFlatList={this}/>
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


export default ViewOrderDetails;
