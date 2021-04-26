import React from "react";
import {StyleSheet} from "react-native";
import {Header as HeaderNative} from "react-native-elements";
import {Header as HeaderStyles} from "../styles";

export default () => {
  return (
    <HeaderNative containerStyle={styles.container}
                  leftComponent={{
                    text: "COVID native",
                    style: styles.leftComponent
                  }}
                  leftContainerStyle={styles.leftContainer}
                  rightContainerStyle={styles.rightContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...HeaderStyles.container,
  },
  leftComponent: {
    ...HeaderStyles.leftComponent,
  },
  leftContainer: {
    ...HeaderStyles.leftContainer,
  },
  rightContainer: {
    ...HeaderStyles.rightContainer,
  },
});