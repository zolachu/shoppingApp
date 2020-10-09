import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import * as Location from "expo-location";

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
  Alert,
  Button,
  ImageBackground,
  TextInput,
} from "react-native";

const WEATHER_API_KEY = "e4226edb81f8dc101efa2256aac4af19";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the app");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // const latitude = location.latitude;
      // const longitude = location.longitude;

      const latitude = 37.0;
      const longitude = -122.0;
      //      const { latitude, longitude } = {location.coords};
      console.log("latitude : " + latitude + ", longitude : " + longitude);

      const weather_url =
        "${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}";

      const response = await fetch(weather_url);

      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
        console.log("current weather");
        alert("currentWeather: " + currentWeather);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // if (currentWeather) {
  //   const {
  //     main: { temp },
  //   } = currentWeather;
  return (
    // {temp}
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.main}>
        <Text>133</Text>
      </View>
    </View>
  );
}
//  else {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>{errorMessage}</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
});
