import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {BottomSheet, Button} from "react-native-elements";
import {Picker} from '@react-native-picker/picker';
import getCountries from "../../api/covid19/getCountries";
import {Backgrounds, Grid, Typography} from "../../styles";
import {getFavouritesCountries} from "../../bd/AsyncStorage";

export default (props) => {
  const {isVisible, slug, setCountry} = props;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [favouritesCountries, setFavouritesCountries] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);

  useEffect(
    () => {
      fetchCountries();
    }, []
  );

  useEffect(
    () => {
      setSelectedCountry(slug);
    }, [slug]
  );

  useEffect(
    () => {
      if (countries.length) {
        firstCountryToShow();
      }
    }, [countries]
  );

  useEffect(
    () => {
      updateListCountries();
    }, [showFavourites]
  );

  const fetchCountries = async () => {
    const countriesList = await getCountries();
    if (countriesList.length > 1) {
      setCountries(countriesList);
    }
  };

  const firstCountryToShow = async () => {
    const favouritesSlugs = await getFavouritesCountries();
    let slugToInclude;
    slugToInclude = (favouritesSlugs.length) ? favouritesSlugs[0][0] : "argentina";
    setCountry(countries.filter((country) => country.Slug === slugToInclude)[0]);
  };

  const updateListCountries = async () => {
    if (showFavourites) {
      const favouritesCountries = await getFavouritesCountries();
      if (!("error" in favouritesCountries)) {
        const favouritesSlugs = [];
        favouritesCountries.forEach(
          (countryObject) => {
            favouritesSlugs.push(countryObject[0]);
          }
        );
        if (countries.length) {
          setFavouritesCountries(countries.filter((country) => favouritesSlugs.includes(country.Slug)));
        }
        if (favouritesSlugs.length) {
          setSelectedCountry(favouritesSlugs[0]);
        }
      }
    } else {
      setFavouritesCountries([]);
      setSelectedCountry(slug);
    }
  };

  const listCountry = () => {
    return (favouritesCountries.length) ? favouritesCountries : countries;
  };

  const toogleFavouritesCountries = async () => {
    setShowFavourites(!showFavourites);
  };

  return (
    <BottomSheet isVisible={isVisible}
                 containerStyle={styles.bottomSheetContainer}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.title}>
              Elija el país
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.bottomSheetBody]}>
          <View style={styles.col}>
            {
              (!countries.length && !favouritesCountries.length) &&
              <ActivityIndicator size="large"
                                 color="#000"
              />
            }
            {
              (countries.length || favouritesCountries.length) &&
              <View style={styles.container}>
                <View style={styles.row}>
                  <View style={styles.col}>
                    <Picker
                      selectedValue={selectedCountry}
                      onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                      itemStyle={styles.info}
                    >
                      {
                        listCountry().length &&
                        listCountry().map(
                          (country, index) => <Picker.Item key={index}
                                                                  label={country.Country}
                                                                  value={country.Slug}
                          />
                        )
                      }
                    </Picker>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.col}>
                    <Button type="clear"
                            title={
                              <Text style={styles.action}>
                                Aceptar
                              </Text>
                            }
                            onPress={() => setCountry(countries.filter((country_object) => country_object.Slug === selectedCountry)[0])}
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.col}>
                    <Button type="clear"
                            title={
                              <Text style={styles.title}>
                                {
                                  (showFavourites) ? "Mostrar todos" : "Mostrar favoritos"
                                }
                              </Text>
                            }
                            onPress={toogleFavouritesCountries}
                    />
                  </View>
                </View>
              </View>
            }
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    ...Grid.container,
    ...Backgrounds.white,
    paddingTop: 10,
  },
  row: {
    ...Grid.row,
  },
  col: {
    ...Grid.col,
  },
  title: {
    ...Typography.title,
  },
  info: {
    ...Typography.info,
  },
  action: {
    ...Typography.action,
  },
  bottomSheetBody: {
    minHeight: 280,
    alignItems: "center"
  },
});