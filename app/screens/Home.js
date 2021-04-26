import React, {useEffect, useRef, useState} from "react";
import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import {Icon, Tooltip} from "react-native-elements";
import {Backgrounds, Colours, Grid, Typography} from "../styles";
import {getCountryCasesData, getFavouritesCountries, setIsFavouriteCountry} from "../bd/AsyncStorage";
import CardData from "../components/Home/CardData";
import CountryTab from "../components/Home/CountryTab";
import OptionsDial from "../components/Home/OptionsDial";
import SectionTitle from "../components/Home/SectionTitle";
import isOnline from "../utils/isOnline";

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [slug, setSlug] = useState("");
  const [shareData, setShareData] = useState("");
  const [favourite, setFavourite] = useState(false);
  const [refreshingData, setRefreshingData] = React.useState(false);
  const [totalCasesConfirmed, setTotalCasesConfirmed] = useState("");
  const [totalDailyConfirmed, setTotalDailyConfirmed] = useState("");
  const [totalCasesDeaths, setTotalCasesDeaths] = useState("");
  const [totalDailyDeaths, setTotalDailyDeaths] = useState("");
  const [totalCasesRecovered, setTotalCasesRecovered] = useState("");
  const [totalDailyRecovered, setTotalDailyRecovered] = useState("");
  const [totalCasesActive, setTotalCasesActive] = useState("");
  const [dataDate, setDataDate] = useState("");
  const [update, setUpdate] = useState("");
  const [error, setError] = useState("");
  const [online, setOnline] = useState(false);
  const [scrollViewPaddingBottom, setScrollViewPaddingBottom] = useState(250);

  const tooltipRef = useRef(null);

  useEffect(
    () => {
      isOnline(setOnline);
      fetchCountryData();
    }, [slug]
  );

  useEffect(
    () => {
      const scrollViewPadding = 250;
      const errorPadding = (error.length > 0) ? 100 : 0;
      const onlinePadding = (!online) ? 100 : 0;
      setScrollViewPaddingBottom(scrollViewPadding + errorPadding + onlinePadding);
    }, [error, online]
  );

  useEffect(
    () => {
      setShareData(`📌 Datos sobre COVID-19  en ${country}\n\n📆 El día ${dataDate} se registraron:\n🟡 ${totalDailyConfirmed} casos nuevos\n🔴 ${totalDailyDeaths} fallecidos\n🟢 ${totalDailyRecovered} recuperados\n\n📈 En total se registraron:\n🟣 ${totalCasesConfirmed} casos\n🔴 ${totalCasesDeaths} fallecidos\n🟢 ${totalCasesRecovered} recuperados\n🟡 ${totalCasesActive} activos\n\n🔹 Datos obtenidos de COVID19API a través de COVIDnative`);
    }, [country, dataDate, totalDailyConfirmed, totalDailyDeaths, totalDailyRecovered, totalCasesConfirmed, totalCasesDeaths, totalCasesRecovered, totalCasesActive]
  );

  const fetchCountryData = async (forceUpdate = false) => {
    setIsLoading(true);
    setError("");
    if (country && country.length && slug && slug.length) {
      const countryCasesData = await getCountryCasesData(slug, forceUpdate);
      if ("error" in countryCasesData) {
        setError(countryCasesData.error);
      }
      setTotalCasesConfirmed(countryCasesData.totalCasesConfirmed);
      setTotalDailyConfirmed(countryCasesData.totalDailyConfirmed);
      setTotalCasesDeaths(countryCasesData.totalCasesDeaths);
      setTotalDailyDeaths(countryCasesData.totalDailyDeaths);
      setTotalCasesRecovered(countryCasesData.totalCasesRecovered);
      setTotalDailyRecovered(countryCasesData.totalDailyRecovered);
      setTotalCasesActive(countryCasesData.totalCasesActive);
      setDataDate(countryCasesData.dataDate);
      setUpdate(countryCasesData.update);
      setFavourite(countryCasesData.isFavourite);
    }
    setIsLoading(false);
  };

  const onRefreshData = async () => {
    setRefreshingData(true);
    await fetchCountryData(true);
    setRefreshingData(false);
  };

  const setCountryData = (countryObject) => {
    if (countryObject){
      setCountry(countryObject.Country);
      setSlug(countryObject.Slug);
    }
  };

  const updateFavourite = async () => {
    setError("");
    const isFavourite = await setIsFavouriteCountry(slug, favourite);
    if ("error" in isFavourite) {
      setError(isFavourite.error);
    }
    setFavourite(isFavourite.state);
  };

  const showTooltip = () => {
    tooltipRef.current.toggleTooltip();
  };

  return (
    <>
      <CountryTab country={country}/>
      <View style={styles.container}>
        {
          (!online) &&
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.info}>
                Parece que estás sin internet.
              </Text>
            </View>
          </View>
        }
        {
          (error.length > 0) &&
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.info}>
                {error}
              </Text>
            </View>
          </View>
        }
        {
          (!online || error.length > 0) &&
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.info}>
                Se mostrarán los datos almacenados en el dispositivo hasta recuperar la conexión.
              </Text>
            </View>
          </View>
        }
        {
          (isLoading) &&
          <View style={styles.row}>
            <View style={[styles.col, {marginTop: 70}]}>
              <ActivityIndicator size="large"
                                 color="#000"
              />
            </View>
          </View>
        }
        {
          (!isLoading) &&
          <View style={styles.row}>
            <View style={styles.col}>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Icon type="material-community"
                        name={favourite ? "heart-minus" : "heart-plus-outline"}
                        color="#000"
                        onPress={updateFavourite}
                        onLongPress={showTooltip}
                  />
                  <Tooltip ref={tooltipRef}
                           overlayColor="rgba(0,0,0,0)"
                           pointerColor="#000"
                           containerStyle={styles.tooltipContainer}
                           height={80}
                           popover={
                             <Text style={styles.tooltipText}>
                               {
                                 (favourite) ? "Eliminar de mis países favoritos" : "Agregar a mis países favoritos"
                               }
                             </Text>
                           }
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.col}>
                  <ScrollView
                    contentContainerStyle={[styles.contentContainer, {paddingBottom: scrollViewPaddingBottom}]}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshingData}
                        onRefresh={onRefreshData}
                      />
                    }
                  >
                    <SectionTitle sectionTitle={dataDate}
                                  variant="secondary"
                    />
                    <SectionTitle sectionTitle="Nuevos casos diarios"
                                  variant="primary"
                    />
                    <CardData infoTitle="Confirmados"
                              infoData={totalDailyConfirmed}
                              variant="primary"
                    />
                    <CardData infoTitle="Muertos"
                              infoData={totalDailyDeaths}
                              variant="primary"
                    />
                    <CardData infoTitle="Recuperados"
                              infoData={totalDailyRecovered}
                              variant="primary"
                    />
                    <SectionTitle sectionTitle="Total de casos"
                                  variant="primary"
                    />
                    <CardData infoTitle="Confirmados"
                              infoData={totalCasesConfirmed}
                              variant="secondary"
                    />
                    <CardData infoTitle="Muertos"
                              infoData={totalCasesDeaths}
                              variant="secondary"
                    />
                    <CardData infoTitle="Recuperados"
                              infoData={totalCasesRecovered}
                              variant="secondary"
                    />
                    <CardData infoTitle="Activos"
                              infoData={totalCasesActive}
                              variant="secondary"
                    />
                    <Text style={styles.info}>
                      Última actualización el {update}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        }
      </View>
      <OptionsDial shareData={shareData}
                   slug={slug}
                   setCountry={setCountryData}
      />
    </>
  );
}
;

const styles = StyleSheet.create({
  container: {
    ...Grid.container,
  },
  contentContainer: {
    ...Grid.container,
    ...Grid.contentContainer,
  },
  row: {
    ...Grid.row,
  },
  col: {
    ...Grid.col,
  },
  info: {
    ...Typography.info,
  },
  tooltipContainer: {
    ...Backgrounds.black,
  },
  tooltipText: {
    ...Typography.info,
    ...Colours.white,
  },
});