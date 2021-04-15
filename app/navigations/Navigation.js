import React from "react";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon} from "react-native-elements";
import HomeStack from "./HomeStack";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        tabBarOptions={
          {
            activeTintColor: "#00a680",
            inactiveTintColor: "#666",
          }
        }
        screenOptions={
          ({route}) => ({
            tabBarIcon: ({color}) => screenOptions(route, color),
          })
        }
      >
        <Tab.Screen name="Home"
                    component={HomeStack}
                    options={
                      {
                        title: "Inicio"
                      }
                    }
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "Home":
      iconName = "home"
      break;
  }

  return (
    <Icon type="material-community"
          name={iconName}
          color={color}
    />
  )
}