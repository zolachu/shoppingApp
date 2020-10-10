import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";

export default function weatherPicker({ unitsSystem, setUnitsSystem }) {
  return (
    <Picker
      style={styles.picker}
      selectedValue={unitsSystem}
      onValueChange={(item) => setUnitsSystem(item)}
    >
      <Picker.Item label="C°" value="metric" />
      <Picker.Item label="F°" value="imperial" />
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 200,
    width: 100,
  },
});
