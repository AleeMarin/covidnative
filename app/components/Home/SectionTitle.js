import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Backgrounds, Colours, Grid, Typography} from "../../styles";

export default (props) => {
  const {sectionTitle, variant} = props;

  return (
    <View style={styles.row}>
      <View style={styles.col}>
        <Text style={[styles.sectionTitle, (variant === "primary") ? styles.primarySectionTitle : styles.secondarySectionTitle]}>
          {sectionTitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    ...Grid.row,
  },
  col: {
    ...Grid.col,
  },
  sectionTitle: {
    ...Typography.sectionTitle,
  },
  primarySectionTitle: {
    ...Backgrounds.black,
    ...Colours.primary,
  },
  secondarySectionTitle: {
    ...Backgrounds.black,
    ...Colours.secondary,
  },
});