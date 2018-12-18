import React, {Component} from 'react';
import {NavigationActions, DrawerActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View, StyleSheet, Image, SafeAreaView} from 'react-native';

class DrawerScreen extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  render () {
    return (
      <SafeAreaView style = {{flex:1}}>
        <ScrollView>
          <View>
            <View style={styles.menuItem}>
              <Text onPress={this.navigateToScreen('login')}>
                Login
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Text onPress={this.navigateToScreen('splash')}>
               Splash
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

export default DrawerScreen;

const styles=StyleSheet.create({

  menuItem:{
       padding: 10,
       borderWidth: 0.5,
       borderColor: '#d6d7da'
   }
});
