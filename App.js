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
} from "react-native";
import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("./assets/background.png")} />
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
