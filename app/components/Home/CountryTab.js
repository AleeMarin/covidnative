import React from "react";
import {StyleSheet} from "react-native";
import {Tab} from "react-native-elements";
import {Backgrounds, Colours, Typography} from "../../styles";

export default (props) => {
  const {country} = props;

  return (
    <Tab value="0"
         indicatorStyle={styles.indicator}
    >
      <Tab.Item title={country}
                titleStyle={styles.title}
                containerStyle={styles.container}
      />
    </Tab>
  );
};

const styles = StyleSheet.create({
  indicator: {
    ...Backgrounds.black,
    height: 5,
  },
  title: {
    ...Typography.action,
    ...Colours.white,
  },
  container: {
    ...Backgrounds.black,
    borderBottomWidth: 10,
  },
});