import React, {Component} from 'react';
import {NavigationActions, DrawerActions, StackActions} from 'react-navigation';
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

  logout = () => {
    // This will reset back to loginStack
   // https://github.com/react-community/react-navigation/issues/1127
   const actionToDispatch = StackActions.reset({
     index: 0,
     key: null,
     actions: [NavigationActions.navigate({ routeName: 'loginnavigator' })]
   })
   this.props.navigation.dispatch(actionToDispatch)
  }

  a = true;
  render () {
    return (
      <SafeAreaView style = {{flex:1}}>
        <ScrollView>
          <View>
            <View style={ this.a ? styles.menuItem:styles.menuItem}>
              <Text onPress={this.navigateToScreen('splash')}>
               Splash
              </Text>
            </View>

            <View style={ this.a ? styles.menuItem:styles.menuItemNoBorder}>
              <Text onPress={this.navigateToScreen('newOrder')}>
               New Order
              </Text>
            </View>

            <View style={styles.menuItem}>
              <Text onPress={this.navigateToScreen('viewOrders')}>
                View Orders
              </Text>
            </View>

            <View style={styles.menuItem}>
              <Text onPress={this.navigateToScreen('newUser')}>
                New User
              </Text>
            </View>

            <View style={styles.menuItem}>
              <Text onPress={this.navigateToScreen('stat')}>
                Stats
              </Text>
            </View>

            <View style={styles.menuItem}>
              <Text onPress={this.logout}>
                Logout
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
   },
   menuItemNoBorder:{
        height: 0,
        opacity:0
    }
});
