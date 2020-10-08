import { StatusBar } from "expo-status-bar";
import React from "react";

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
} from "react-native";
import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";
import { Header } from "react-native/Libraries/NewAppScreen";

const DATA = {};
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("./assets/background.png")} />
      <Header>Shopping Cart</Header>
      <View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
});
