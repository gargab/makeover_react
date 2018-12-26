import React, { Component } from 'react';
import { FlatList, AppRegistry, ScrollView, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import { List, Card } from "react-native-elements";
import NumericInput from 'react-native-numeric-input'

class ViewOrderItem extends Component {

  constructor(props) {
      super(props);
      this.state = {
          value: null
      };
  }

  render(){
    return (
      <TouchableOpacity>
        <Card containerStyle={styles.outerContainer} flexDirection='row'>

            <View style={styles.dataContainer}>
              <Text style={styles.heading}> {this.props.item.customer_name} </Text>
              <Text style={styles.subheading}> {this.props.item.address} </Text>
              <Text style={styles.dateStyle}> {this.props.item.timestamp} </Text>
              <View style={styles.statusContainer}>
                <Text style={styles.statusStyle}> {this.props.item.status} </Text>
                <Text style={styles.agentStyle}> {this.props.item.agent_name} </Text>
              </View>
            </View>
            <View style={styles.piecesContainer}>
              <View style={styles.circle}>
                <Text style={styles.piecesStyle}> {this.props.item.total}</Text>
              </View>
              <Text style={styles.idStyle}> {this.props.item.id}</Text>
            </View>

        </Card>
      </TouchableOpacity>
    )};
}

export default ViewOrderItem;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection:'row',
    borderLeftWidth: 3,
    borderLeftColor: '#f39c12',
    paddingRight: '2%',
    alignItems: 'flex-start'
  },
  piecesContainer: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center'
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60/2,
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    justifyContent: 'center'
  },
  dataContainer: {
    flex: 4,
    flexDirection:'column'
  },
  statusContainer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    paddingTop: '1%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(52, 52, 52, 0.2)'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: '1%'
  },
  subheading: {
    fontSize: 10
  },
  dateStyle: {
    fontSize: 14
  },
  statusStyle:{
    fontSize: 18,
    color: '#f39c12'
  },
  agentStyle:{
    fontSize: 10,
    color: '#f39c12'
  },
  piecesStyle:{
    fontSize: 18,
    margin: '15%'
  },
  idStyle:{
    fontSize: 10,
    margin: '5%'
  }
});
