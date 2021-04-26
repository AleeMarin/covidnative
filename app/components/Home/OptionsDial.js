import React, {useState} from "react";
import {Share, StyleSheet, Text} from "react-native";
import {Icon, SpeedDial} from "react-native-elements";
import CountrySelector from "./CountrySelector";
import {Backgrounds, Colours, Typography} from "../../styles";

export default (props) => {
  const {shareData, slug, setCountry} = props;
  const [open, setOpen] = useState(false);
  const [countrySelectorOpen, setCountrySelectorOpen] = useState(false);

  const setCountrySelection = (value) => {
    setCountry(value);
    setCountrySelectorOpen(false);
    setOpen(false);
  };

  const shareInfo = async () => {
    try {
      const result = await Share.share({
        message: shareData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SpeedDial
        isOpen={open}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        icon={
          <Icon type="material-community"
                name="plus"
                color="#fff"
          />
        }
        openIcon={
          <Icon type="material-community"
                name="close"
                color="#fff"
          />
        }
        buttonStyle={styles.backgroundBlack}
      >
        <SpeedDial.Action
          icon={
            <Icon type="material-community"
                  name="magnify"
                  color="#fff"
            />
          }
          buttonStyle={styles.backgroundBlack}
          title={
            <Text style={styles.title}>
              Buscar país
            </Text>
          }
          titleStyle={styles.backgroundBlack}
          onPress={() => setCountrySelectorOpen(true)}
        />
        <SpeedDial.Action
          icon={
            <Icon type="material-community"
                  name="share-variant"
                  color="#fff"
            />
          }
          buttonStyle={styles.backgroundBlack}
          title={
            <Text style={styles.title}>
              Compartir
            </Text>
          }
          titleStyle={styles.backgroundBlack}
          onPress={shareInfo}
        />
      </SpeedDial>
      <CountrySelector isVisible={countrySelectorOpen}
                       setCountry={setCountrySelection}
                       slug={slug}
      />
    </>
  );
};

const styles = StyleSheet.create({
  backgroundBlack: {
    ...Backgrounds.black,
  },
  title: {
    ...Typography.action,
    ...Colours.white,
  },
});