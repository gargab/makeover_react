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
                this.setState({ activeRowKey: this.props.item.key });
            },
            right: [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [
                              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              {text: 'Yes', onPress: () => {

                                this.props.parentFlatList.flatListData.splice(this.props.index, 1);
                                //Refresh FlatList !
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
                            flexDirection:'row'
                }}>
                  <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                  <Text style={styles.flatListItem}>{this.props.item.foodDescription}</Text>
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
