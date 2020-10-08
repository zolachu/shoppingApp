import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  SafeAreaView,
  View,
  Alert,
  Button,
  Platform,
  FlatList,
  ImageBackground,
  TextInput,
} from "react-native";
import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";

const DATA = [
  { id: "1", title: "Zola" },
  { id: "2", title: "Kevin" },
  { id: "3", title: "Cookie" },
];

const Item = ({ title }) => (
  <View>
    <Text> {title} </Text>
  </View>
);

export default function App() {
  const renderItem = ({ item }) => <Item title={item.title} />;
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{
          width: "100%",
          height: "100%",
        }}
        source={require("./assets/background.png")}
      >
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        {/* <Button></Button> */}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
