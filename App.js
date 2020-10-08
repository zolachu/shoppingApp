import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  View,
  Platform,
  ImageBackground,
  FlatList,
} from "react-native";

import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";

import { Header } from "react-native/Libraries/NewAppScreen";

const DATA = [
  {
    id: "1",
    title: "First Item",
  },
  {
    id: "2",
    title: "Second Item",
  },
  {
    id: "3",
    title: "Third Item",
  },
];

const Item = ({ title }) => (
  <View>
    <Text> {title}</Text>
  </View>
);

export default class App extends Component {
  render() {
    const renderItem = ({ item }) => <Item title={item.title} />;

    const [value, onChangeText] = React.useState("place holder");

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.logo}
          source={require("./assets/background.png")}
        >
          <Header>
            <Text>Items to buy</Text>
          </Header>
          <View style={styles.text}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            <TextInput
              onChangeText={(text) => onChangeText(text)}
              value={value}
              Enter
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  logo: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  text: {
    textAlign: "center",
    alignItems: "center",
    fontFamily: "bold",
  },
});
