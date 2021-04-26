import React from "react";
import NetInfo from "@react-native-community/netinfo";

export default (setOnline) => {
  NetInfo.fetch().then(state => {
    setOnline(state.isConnected);
  });
};