import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native'

export default class Splash extends Component{
  render() {
    return (
      <View style ={styles.wrapper}>
      <StatusBar
        barStyle='light-content'
        backgroundColor="#4f6d7a"
        />
        <View style={styles.titleWrapper}>
          <Text style = {styles.title}> Hello </Text>
        </View>
        <View>
          <Text style={styles.subtitle}> subtitle </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
            backgroundColor: '#27ae60',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          },
  title:{
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
      },
  subtitle:{
        color: 'white',
        fontWeight: '200',
        paddingBottom: 20
      },
  titleWrapper:{
    justifyContent: 'center',
    flex:1
  }
});
