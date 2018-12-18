import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { SearchList, contains } from "./SearchList";
import _ from "lodash";

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

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });

    SearchList()
      .then(List => {
        this.setState({
          loading: false,
          data: List,
          fullData: List
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
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
    return <SearchBar placeholder="Type Here..." lightTheme round onChangeText={this.handleSearch} />;
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
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={`${item.name.first} ${item.name.last}`}
                subtitle={item.email}
                avatar={{ uri: item.picture.thumbnail }}
                containerStyle={{ borderBottomWidth: 0 }}
              />
            )}
            keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
          />
        </List>
      </SafeAreaView>
    );
  }
}

export default NewOrder;
