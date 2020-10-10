import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import { Picker } from "@react-native-community/picker";
import { Icon as WeatherIcon, InlineIcon } from "@iconify/react";
import dayCloudyGusts from "@iconify/icons-wi/day-cloudy-gusts";
import WeatherPicker from "./components/WeatherPicker";
import DisplayWeather from "./components/DisplayWeather";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import {
  StyleSheet,
  Text,
  Image,
  View,
  Alert,
  Button,
  ImageBackground,
  Dimensions,
  TextInput,
} from "react-native";
import Icon from "@mdi/react";
import { mdiCardAccountDetailsOutline } from "@mdi/js";

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

  const FirstRoute = ({
    iconUrl,
    name,
    temp,
    description,
    main,
    humidity,
    feels_like,
    pressure,
    speed,
  }) => (
    <ImageBackground
      source={require("./assets/background.png")}
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
  );

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
  );

  const initialLayout = { width: Dimensions.get("window").width };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  if (currentWeather) {
    const {
      main: { temp, feels_like, pressure, humidity },
      weather: [details],
      name,
      wind: { speed },
    } = currentWeather;
    const { icon, main, description } = details;
    const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@4x.png";

    const renderScene = ({
      route,
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
    }) => {
      switch (route.key) {
        case "first":
          return (
            <DisplayWeather
              iconUrl={iconUrl}
              name={name}
              temp={temp}
              description={description}
              main={main}
              humidity={humidity}
              feels_like={feels_like}
              pressure={pressure}
              speed={speed}
              unitsSystem={unitsSystem}
              setUnitsSystem={setUnitsSystem}
              WeatherInfo={WeatherInfo}
            />
          );
        case "second":
          return SecondRoute;
      }
    };

    return (
      <View style={styles.weatherInfo}>
        {/* <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        /> */}

        <DisplayWeather
          iconUrl={iconUrl}
          name={name}
          temp={temp}
          description={description}
          main={main}
          humidity={humidity}
          feels_like={feels_like}
          pressure={pressure}
          speed={speed}
          unitsSystem={unitsSystem}
          setUnitsSystem={setUnitsSystem}
          WeatherInfo={WeatherInfo}
        />
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
  // */
}

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  scene: {
    flex: 1,
  },
});
