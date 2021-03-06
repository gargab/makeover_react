import React, { Component } from "react";
import {
View,
Text,
FlatList,
ActivityIndicator,
SafeAreaView,
KeyboardAvoidingView,
Platform,
StyleSheet,
TouchableOpacity
} from "react-native";
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import { contains } from "./SearchList";
import _ from "lodash";
import { getData } from '../../services/GetData';
import { retrieveData } from '../../services/GetLocal';



const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 0
const behaviourstr = Platform.OS === 'ios' ? 'padding' : ''
class NewOrder extends Component {
constructor(props) {
  super(props);

  this.state = {
    loading: false,
    data: [],
    error: null,
    query: "",
    fullData: []
  };
}

async componentDidMount() {
  this.makeRemoteRequest();
}

newCustomer = () => {
    this.props.navigation.navigate('newCustomer')
  }

  listOrder = (id) => {
      this.props.navigation.navigate('listOrder',{
        "id" : id,
        "reference" : this
      })
    }

makeRemoteRequest = async () => {
  this.setState({ loading: true });
  var resultMap = await retrieveData(['phone_number','token']);
  var phone_number = resultMap['phone_number'];
  var queryData = {token : resultMap['token'] };
  var path = phone_number + '/' + 'customer';
  getData(path,queryData).then((res)=>{
    if(res[0] == 200){
      this.setState({
        loading: false,
        data: res[1],
        fullData: res[1]
      })

    }
    else{
      Toast.show(res[1].data, Toast.LONG);
    }
  });


};

handleSearch = (text) => {
  const formatQuery = text.toLowerCase();
  const data = _.filter(this.state.fullData, list => {
    return contains(list, formatQuery);
  });
  this.setState({query:formatQuery, data});
};

renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
      }}
    />
  );
};

renderHeader = () => {
  return <SearchBar placeholder="Search Name, Phone or Address ..." lightTheme inputStyle={{backgroundColor: '#FFFFFF'}} containerStyle={{backgroundColor: '#000000'}} round onChangeText={this.handleSearch} />;
};

renderFooter = () => {
  if (!this.state.loading) return null;

  return (
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );
};

render() {
  return (
    <SafeAreaView>
    <View >
          <FlatList
            data={this.state.data}
            style={{height:"100%"}}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={`${item.name}`}
                avatar=<Avatar
                rounded
                size="medium"
                title={item.name[0]}
                containerStyle={{backgroundColor: '#000000'}}
                />
                subtitle={item.phone_number}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={()=>{this.listOrder(item.id)}}
              />
            )}
            keyExtractor={item => item.phone_number}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
          />
        <TouchableOpacity onPress={this.newCustomer} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View >
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#000000',
    borderRadius: 30,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center'
    },
    fabIcon: {
      fontSize: 30,
      color: 'white'
    }
});

export default NewOrder;
