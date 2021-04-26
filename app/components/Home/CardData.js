import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Card} from "react-native-elements";
import {Backgrounds, Colours, Grid, Typography} from "../../styles";

export default (props) => {
  const {infoTitle, infoData, variant} = props;

  return (
    <Card>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={[styles.infoData, (variant === "primary") ? styles.primaryInfoData : styles.secondaryInfoData]}>
            {infoData}
          </Text>
        </View>
      </View>
      <Card.Title style={(variant === "primary") ? styles.primaryInfoTitle : styles.secondaryInfoTitle}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.infoTitle}>
              {infoTitle}
            </Text>
          </View>
        </View>
      </Card.Title>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    ...Grid.row,
  },
  col: {
    ...Grid.col,
  },
  infoData: {
    ...Typography.infoData,
  },
  primaryInfoData: {
    ...Colours.primary,
  },
  secondaryInfoData: {
    ...Colours.secondary,
  },
  infoTitle: {
    ...Typography.infoTitle,
  },
  primaryInfoTitle: {
    ...Backgrounds.primary,
  },
  secondaryInfoTitle: {
    ...Backgrounds.secondary,
  },
});