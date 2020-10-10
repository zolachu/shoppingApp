import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WeatherInfo({ temp }) {
  const temperature = temp;
  return (
    <View style={styles.tempInfo}>
      <Text style={styles.temp}>{temperature}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tempInfo: {
    // alignItems: "center",
  },
  temp: {
    color: "#eb1081",
    fontSize: 50,
    fontWeight: "bold",
  },
});
