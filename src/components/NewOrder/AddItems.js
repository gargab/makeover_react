import React, { Component } from 'react';
import { FlatList, AppRegistry, ScrollView, View, StyleSheet, TouchableOpacity, Text, Button} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import { List, Card } from "react-native-elements";
import { getData } from '../../services/GetData';
import { retrieveData } from '../../services/GetLocal';
import Toast from 'react-native-simple-toast';

import Item from './Item.js'

class AddItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData : '',
      brand : [],
      Category : [{value : ''}],
      shade : [],
      item : [],
      currentbrand : '',
      currentCategory : '',
      orderMap:{}
    };
  }


  makeRemoteRequest = async ()=>{
    var resultMap = await retrieveData(['phone_number','token']);
    var phone_number = resultMap['phone_number'];
    var queryData = {token : resultMap['token'] };
    var path = phone_number + '/' + 'product';

    getData(path,queryData).then((res)=>{
      if(res[0] == 200){
        var bran = [];
        for(key in res[1]){
          bran.push({"value" : key});
        }
        this.setState({
          rawData: res[1],
          brand:bran
        });
      }
      else{
        Toast.show(res[1].data, Toast.LONG);
      }
    });


  };

  async componentDidMount() {
    this.makeRemoteRequest();
  };



  goToList = () => {
    this.addOrder();
    var navigation  = this.props.navigation;
    var referenceObj = navigation.getParam('reference', null);
    referenceObj.aggregateOrders(this.state.orderMap);
    if(referenceObj.state.currentScreenName == 'viewOrderDetails'){
      this.props.navigation.navigate('viewOrderDetails');
    }
    else{
      this.props.navigation.navigate('listOrder');
    }

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



brandChanged = (value,index,data)=>{

var Categories = [];

let Category = this.state.rawData[value];

for(key in Category){
  Categories.push({"value" : key});
}

this.refs.CategoryDropdown.value = Categories[0].value;

this.setState({
  Category : Categories,
  currentbrand : value
});

this.CategoryChanged(this.state.Category[0].value,0,'');
};

updateQuantity = (name,value) =>{

var item = this.state.item;

for(key in item){
  if(item[key].name == name){
    item[key].qty = value;
    break;
  }
}

this.setState({
  item : item
});
}

addOrder = ()=>{

  var orderMap = this.state.orderMap;

  var partialKey = this.state.currentbrand + '_' + this.state.currentCategory;
  var item = this.state.item;
  for(key in item){
    var fullKey = partialKey + '_' + item[key].name;
    if(item[key].qty>0){
    if(fullKey in orderMap){
      orderMap[fullKey] = orderMap[fullKey] + item[key].qty;
    }
    else{
      orderMap[fullKey] = item[key].qty;
    }

  }
  }

  this.setState({
    orderMap : orderMap
  })

  this.CategoryChanged(this.state.Category[0].value,0,'');
  Toast.show('Order Added to List', Toast.LONG);
}


CategoryChanged = (value,index,data)=>{

  var items = [];

  let item = this.state.rawData[this.state.currentbrand][value];

  for(key in item){
    items.push({"name" : item[key],
    "qty" : 0
  });
  }

  this.setState({
    item : items,
    currentCategory : value
  });


};


componentDidUpdate(prevProps){

  var navigation  = this.props.navigation;
  var referenceObj = navigation.getParam('reference', null);
  if(referenceObj.state.isNavigation == true){
    this.state.orderMap = {};
    referenceObj.state.isNavigation = false;
  }

}


  render () {

    return(
      <View>
        <ScrollView
          style={styles.scroll}
          keyboardShouldPersistTaps='always'
          contentContainer={styles.contentContainer}
        >

          <View style={{padding:'5%'}}>

            <Dropdown
              label='Brand'
              data={this.state.brand}
              onChangeText={this.brandChanged}
            />

            <Dropdown
              label='Category'
              ref='CategoryDropdown'
              data={this.state.Category}
              onChangeText={this.CategoryChanged}
              value = {this.state.Category[0].value}
            />
            </View>

            <Card>
              <FlatList
                data={this.state.item}
                renderItem={({ item, index}) => (
                  <Item item={item} index={index} parentFlatList={this}>

                  </Item>
                )}
                ItemSeparatorComponent={this.renderSeparator}
              />
              </Card>
            </ScrollView>
            <View style={{
                        flex: 1,
                        flexDirection:'row',
                        justifyContent:'center',
                        marginTop: '10%'
                      }}>
              <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.addOrder}
              >
                <Text style={styles.buttonText}>
                  ADD ORDER
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.goToList}
              >
                <Text style={styles.buttonText}>
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>

        </View>


    );
  }

}

export default AddItems;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFFFFF',
    height: '87%'
  },
  contentContainer:{
    padding: 8
  },
  container: {
    margin: 8,
    marginTop: 24,
  },
  buttonContainer:{
    backgroundColor:'#000000',
    paddingLeft: "5%",
    paddingRight: "5%",
    justifyContent: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    height: 40,
    width: 155

  },
  buttonText:{
    textAlign: 'center',
    color:'#FFFFFF',
    fontWeight: "700"
  },
  buttonContainerCompl:{
    backgroundColor:'#FFFFFF',
    paddingLeft: "5%",
    paddingRight: "5%",
    justifyContent: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    height: 40,
    width: 155,
    borderWidth: 2

  },
  buttonTextCompl:{
    textAlign: 'center',
    color:'#000000',
    fontWeight: "700"
  }
});
