import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon} from "react-native-elements";
import HomeStack from "./HomeStack";
import {customTheme} from "../themes/customTheme";

const Tab = createBottomTabNavigator();

export default () => {
  const screenOptions = (route, color) => {
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
    );
  };

  return (
    <NavigationContainer theme={customTheme}>
      <Tab.Navigator
        tabBar={() => null}
        tabBarOptions={
          {
            activeTintColor: "#000",
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
  );
};