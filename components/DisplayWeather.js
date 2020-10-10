import React, { Component } from "react";
import WeatherPicker from "./WeatherPicker";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";

export default function DisplayWeather({
  iconUrl,
  name,
  temp,
  description,
  main,
  humidity,
  feels_like,
  pressure,
  speed,
  unitsSystem,
  setUnitsSystem,
  WeatherInfo,
}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.background}
      >
        <View style={styles.displayWeather}>
          <WeatherPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />

          <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
          <Text style={{ fontSize: 30 }}>{name}</Text>
          <WeatherInfo temp={temp} />
          <Text style={styles.weatherDescription}>{description}</Text>
          <Text style={styles.main}>{main}</Text>
        </View>

        <View style={styles.descriptions}>
          <View style={styles.boxes}>
            <View style={styles.table}>
              <Text style={styles.textDescriptions}>Humidity:</Text>
              <Text style={styles.box}>{humidity}%</Text>
            </View>
            <View style={styles.table}>
              <Text style={styles.textDescriptions}>Feels like:</Text>
              <Text style={styles.box}>{feels_like}°</Text>
            </View>
          </View>

          <View style={styles.boxes}>
            <View style={styles.table}>
              <Text style={styles.textDescriptions}>Pressure:</Text>
              <Text style={styles.box}>{pressure} hPa</Text>
            </View>
            <View style={styles.table}>
              <Text style={styles.textDescriptions}>Wind Speed</Text>
              <Text style={styles.box}>{speed} m/s</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    flexDirection: "column",
  },
  displayWeather: {
    alignItems: "center",
    justifyContent: "center",
    flex: 3,
  },
  main: {
    fontSize: 25,
    fontWeight: "bold",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    textTransform: "capitalize",
  },
  box: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
  },

  boxes: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    marginLeft: 30,
  },
  table: {
    width: 100,
    alignSelf: "stretch",
    borderColor: "#fff",
    width: Dimensions.get("screen").width / 2,
  },
  textDescriptions: {
    textAlign: "left",
    fontSize: 15,
  },
  descriptions: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
});
