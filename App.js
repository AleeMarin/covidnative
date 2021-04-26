import React from "react";
import AppLoading from "expo-app-loading";
import {useFonts} from "expo-font";
import {StatusBar} from "expo-status-bar";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Header from "./app/components/Header";
import Navigation from "./app/navigations/Navigation";

export default function App() {
  let [fontsLoaded] = useFonts({
    "ASSC-Black": require("./assets/fonts/AlegreyaSansSC-Black.ttf"),
    "ASSC-ExtraBold": require("./assets/fonts/AlegreyaSansSC-ExtraBold.ttf"),
    "ASSC-Bold": require("./assets/fonts/AlegreyaSansSC-Bold.ttf"),
    "ASSC-Medium": require("./assets/fonts/AlegreyaSansSC-Medium.ttf"),
    "ASSC-Regular": require("./assets/fonts/AlegreyaSansSC-Regular.ttf"),
    "ASSC-Light": require("./assets/fonts/AlegreyaSansSC-Light.ttf"),
    "ASSC-Thin": require("./assets/fonts/AlegreyaSansSC-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading/>;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar style="light"
                   backgroundColor="black"
        />
        <Header/>
        <Navigation/>
      </SafeAreaProvider>
    );
  }
};