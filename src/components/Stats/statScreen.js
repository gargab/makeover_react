import React, { Component } from 'react';
import { AppRegistry, Keyboard,ScrollView, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import { Card } from "react-native-elements";
import PieChartWithLabel from './PieChartWithLabel';
import AxesGraph from './AxesGraph';


class statScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
  };
  }

  render () {

    return(
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='handled'
        >
        <Card containerStyle={styles.container}>
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center', padding: '3%'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}> Orders - Weekly </Text>
          </View>

          <View style={{flexDirection: 'row', flex: 3, justifyContent: 'space-between'}}>
            <View style={{flex:2}}>
              <PieChartWithLabel/>
            </View>
              <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                  <View style={styles.circle} />
                  <View style={{flex:3}}><Text> Pending </Text></View>
                </View>
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                  <View style={styles.circle} />
                  <View style={{flex:3}}><Text> Cancelled </Text></View>
                </View>
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                  <View style={styles.circle} />
                  <View style={{flex:3}}><Text> On Hold </Text></View>
                </View>
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                  <View style={styles.circle} />
                  <View style={{flex:3}}><Text> Received </Text></View>
                </View>
              </View>
            </View>
        </Card>

        <Card containerStyle={styles.container}>
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center', padding: '3%'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}> Orders - Daily </Text>
          </View>

          <View style={{flexDirection: 'row', flex: 3, justifyContent: 'space-between'}}>
            <View style={{flex:2}}>
              <PieChartWithLabel/>
            </View>
              <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                  <View style={styles.circle} />
                  <View style={{flex:3}}><Text> Pending </Text></View>
                </View>
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                  <View style={styles.circle} />
                  <View style={{flex:3}}><Text> Cancelled </Text></View>
                </View>
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                  <View style={styles.circle} />
                  <View style={{flex:3}}><Text> On Hold </Text></View>
                </View>
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                  <View style={styles.circle} />
                  <View style={{flex:3}}><Text> Received </Text></View>
                </View>
              </View>
            </View>
        </Card>

        <Card containerStyle={styles.container}>

          <View style={{flex:1, justifyContent: 'center', alignItems: 'center', padding: '3%'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}> Orders - Daily </Text>
          </View>

          <View style={{flex: 3}}>
            <AxesGraph/>
          </View>
        </Card>


        </ScrollView>
    );
  }

}

export default statScreen;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFFFFF',
  },

  container: {

    flex: 1,
    flexDirection:'column',
    padding: '1%'
  },

  contentContainer: {
    padding: 8,
  },
  buttonContainer:{
    backgroundColor:'#000000',
    paddingVertical: 15
  },
  buttonText:{
    textAlign: 'center',
    color:'#FFFFFF',
    fontWeight: "700"
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10/2,
    backgroundColor: 'red',
    flex:1
}
});
