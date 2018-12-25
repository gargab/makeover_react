import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout';

//import flatListData from '../../Data/dummyData'

class OrderItem extends Component {
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
                {
                    onPress: (abc) => {
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
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        };
        return (
            <Swipeout {...swipeSettings}>
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
        fontSize: 16,
    }
});

export default OrderItem;
