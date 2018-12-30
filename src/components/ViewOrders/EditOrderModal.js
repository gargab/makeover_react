import React, { Component } from 'react';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import Spinner from 'react-native-number-spinner';
import {
     FlatList, StyleSheet, Text, View, Image,
    Platform,  Dimensions,TextInput
} from 'react-native';

var screen = Dimensions.get('window');

export default class EditOrderModal extends Component {

  constructor(props) {
      super(props);
      this.state = {
          KeyCombinationArray: [],
          qty : 9,
          editedKey : ''
      };
  }

  showEditModal = (editedKey) =>{
    var qty =  this.props.parentFlatList.state.orderMap[editedKey];
    var KeyCombinationArray = editedKey.split("_");
    this.setState({
      qty : qty,
      KeyCombinationArray : KeyCombinationArray,
      editedKey : editedKey
    });

    this.props.parentFlatList.setState({
      modalVisible : true
    })
    this.refs.myModal.open();
  }

  myFormat = (gg) =>{
    console.log(gg);
  };

  render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                  justifyContent: 'center',
                  borderRadius: Platform.OS === 'ios' ? 30 : 0,
                  shadowRadius: 10,
                  width: screen.width - 80,
                  height: 280,
                  padding : 5

                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert("Modal closed");
                }}
            >
                <View style={{
                  flex: 1,
                  flexDirection:'column',
                  height: 40

                }}>
                  <View style={styles.textDesign}>
                    <Text style={styles.flatListItem}>Brand</Text>
                    <Text style={styles.flatListItem}>{this.props.parentFlatList.state.KeyCombinationArray[0]}</Text>
                  </View>
                  <View style={styles.textDesign}>
                    <Text style={styles.flatListItem}>Category</Text>
                    <Text style={styles.flatListItem}>{this.props.parentFlatList.state.KeyCombinationArray[1]}</Text>
                  </View>
                  <View style={styles.textDesign}>
                    <Text style={styles.flatListItem}>Shade</Text>
                    <Text style={styles.flatListItem}>{this.props.parentFlatList.state.KeyCombinationArray[2]}</Text>
                  </View>
                  <View style={styles.textDesign}>
                    <Text style={styles.flatListItem}>Quantity</Text>
                    <TextInput
                    style={styles.textInput}
                    keyboardType = 'numeric'
                    onChangeText = {(text)=> this.onChanged(text)}
                    value = {this.state.myNumber}
                    />
                  </View>
                </View>
                <Button
                    style={{ fontSize: 18, color: 'white' }}
                    containerStyle={{
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        marginTop : 4,
                        height: 40,
                        backgroundColor: 'black'
                    }}
                    onPress={() => {
                        this.props.parentFlatList.editOrder(this.props.parentFlatList.state.qty,this.props.parentFlatList.state.editedKey);
                        this.refs.myModal.close();
                    }}>
                    Save
                </Button>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'black',
        padding: 5,
        fontSize: 16
    },
    textDesign:{
      flex: 1,
      flexDirection:'row',
      justifyContent:'space-between',
      borderBottomWidth :1,
      borderBottomColor : '#D8D8D8',
      alignItems : 'center'
    },
    textInput :{
      backgroundColor : '#D8D8D8'
    }
});
