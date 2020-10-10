import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import { Picker } from "@react-native-community/picker";
import { Icon as WeatherIcon, InlineIcon } from "@iconify/react";
import dayCloudyGusts from "@iconify/icons-wi/day-cloudy-gusts";

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
  Alert,
  Button,
  ImageBackground,
  Dimensions,
  TextInput,
} from "react-native";
import Icon from "@mdi/react";

const WEATHER_API_KEY = "e4226edb81f8dc101efa2256aac4af19";
const FAKE = "840832dc8968382e5af61395ac8b54a1";
const BASE_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?";

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");

  useEffect(() => {
    load();
  }, [unitsSystem]);

  async function load() {
    try {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the app");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const longitude = location.coords["longitude"];
      const latitude = location.coords["latitude"];

      const weather_url =
        "http://api.openweathermap.org/data/2.5/weather?" +
        "lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=" +
        unitsSystem +
        "&appid=" +
        FAKE;

      const response = await fetch(weather_url);
      const result = await response.json();

      if (response.ok) {
        console.log("ok");
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
        console.log("couldnt extract current weather");
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.log("couldn't connect to the url");
    }
  }
  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.text}>{errorMessage}</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );

  if (true) {
    const {
      main: { temp, feels_like, pressure, humidity },
      weather: [details],
      name,
      wind: { speed },
    } = currentWeather;
    const { icon, main, description } = details;
    const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@4x.png";

    return (
      <View style={styles.weatherInfo}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 4,
          }}
        >
          <View>
            <Picker
              style={styles.picker}
              selectedValue={unitsSystem}
              onValueChange={(item) => setUnitsSystem(item)}
            >
              <Picker.Item label="C°" value="metric" />
              <Picker.Item label="F°" value="imperial" />
            </Picker>
          </View>
          <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
          <Text>{name}</Text>
          <WeatherInfo temp={temp} />
          <Text style={styles.weatherDescription}>{description}</Text>
          <Text style={styles.main}>{main}</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "stretch",
          }}
        >
          <View style={styles.boxes}>
            <View style={styles.table}>
              <Text style={styles.descriptions}>Humidity:</Text>
              <Text style={styles.box}>{humidity}</Text>
            </View>
            <View style={styles.table}>
              <Text style={styles.descriptions}>Feels like:</Text>
              <Text style={styles.box}>{feels_like}</Text>
            </View>
          </View>

          <View style={styles.boxes}>
            <View style={styles.table}>
              <WeatherIcon icon={dayCloudyGusts} />
              <Text style={styles.descriptions}>Pressure:</Text>
              <Text style={styles.box}>{pressure}</Text>
            </View>
            <View style={styles.table}>
              <Text style={styles.descriptions}>Wind Speed</Text>
              <Text style={styles.box}>{speed}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.weatherInfo}>
        <Text style={styles.text}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
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
  picker: {
    height: 50,
    width: 100,
  },
  boxes: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
  },
  table: {
    borderWidth: 1,
    width: 100,
    alignSelf: "stretch",
    borderColor: "#ddd",
    width: Dimensions.get("screen").width / 2,
  },
  descriptions: {
    textAlign: "left",
    fontSize: 15,
  },
});
