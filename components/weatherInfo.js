import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WeatherInfo({ temp }) {
  const temperature = temp;
  return (
    <View style={styles.weatherInfo}>
      <Text>{temperature}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
  },
});
