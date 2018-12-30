import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Card } from 'react-native-material-cards'

//import flatListData from '../../Data/dummyData'

class ViewOrderDetailItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null
        };
    }


    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }
            },
            onOpen: (secId, rowId, direction) => {

                var deletedKey = this.props.item.brand + '_' + this.props.item.category + '_' + this.props.item.shade;

                this.setState({ activeRowKey: deletedKey });
            },
            right: [
              {  component: (
                      <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            height :"100%"
                          }}
                      >
                        <Image source={require('../../images/edit.png')} style={styles.menu}/>
                      </View>
                    ),
                    backgroundColor: "#000000",

                    onPress: () => {
                      this.props.parentFlatList.showEditModal(this.state.activeRowKey);
                      }
                  },
            {  component: (
                    <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          height :"100%"
                        }}
                    >
                      <Image source={require('../../images/trash_white.png')} style={styles.menu}/>
                    </View>
                  ),
                  backgroundColor: "#000000",

                  onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [
                              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              {text: 'Yes', onPress: () => {

                                this.props.parentFlatList.refreshFlatList(deletingRow);
                              }},
                            ],
                            { cancelable: true }
                          );
                    },
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        };
        return (
            <Swipeout {...swipeSettings} style = {Platform.OS === 'ios' ? styles.containerStyle : styles.row}>

              <View style={{
                flex: 1,
                flexDirection:'column',
              }}>
                <View style={{
                            flex: 1,
                            flexDirection:'row',
                            justifyContent:'space-between'
                }}>
                  <Text style={styles.flatListItem}>{this.props.item.brand}</Text>
                  <Text style={styles.flatListItem}>{this.props.item.category}</Text>
                  <Text style={styles.flatListItem}>{this.props.item.shade}</Text>
                  <Text style={styles.flatListItem}>{this.props.item.qty}</Text>
                </View>
              </View>
            </Swipeout>

        );
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'black',
        padding: 5,
        fontSize: 15,
        marginTop : 10,
        height:40,
        justifyContent : "center"
    },
  containerStyle: {
       borderRadius: 2,
       borderColor: '#ddd',
       borderBottomWidth: 2,
       marginLeft: 5,
       marginRight: 5,
       marginTop: 10,
       marginBottom : 1,
       backgroundColor : '#ffffff'
 },
 row: {
      elevation: 1,
      borderRadius: 2,
      backgroundColor: "#FFFFFF",
      paddingLeft: 18,
      paddingRight: 16,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 0,
      flex:1,
      marginBottom: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 7,
      zIndex:999
    },
    menu:{
         height:30 ,
         width:30
     }


});

export default ViewOrderDetailItem;
