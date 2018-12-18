/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import {createAppContainer} from 'react-navigation';

import Splash from './Splash'
import AppNavigator from './AppNavigator'
import Login from './src/components/Login/Login'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0

type Props = {};

// export default class App extends Component<Props> {
//   render() {
//     return (
//       <AppNavigator />
//       // <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset} style={styles.container}>
//       //   <Login />
//       // </KeyboardAvoidingView>
//
//     );
//    }
//  }

const App = createAppContainer(AppNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
