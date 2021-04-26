import AsyncStorage from "@react-native-async-storage/async-storage";
import getCasesData from "../api/covid19/getCasesData";

const clearAsyncStorage = async () => {
  try {
    let keys = await AsyncStorage.getAllKeys()
    await AsyncStorage.multiRemove(keys)
  } catch (error) {
    console.log(error);
  }
};

export const getCountryCasesData = async (slug, forceUpdate=false) => {
  const todayString = new Date().toLocaleString();
  let resultData = {
    "totalCasesConfirmed": "",
    "totalDailyConfirmed": "",
    "totalCasesDeaths": "",
    "totalDailyDeaths": "",
    "totalCasesRecovered": "",
    "totalDailyRecovered": "",
    "totalCasesActive": "",
    "dataDate": "",
    "update": todayString,
    "isFavourite": false,
  }

  try {
    const value = await AsyncStorage.getItem(slug);
    let needUpdate = true;
    if (value) {
      let casesDataStorage = JSON.parse(value);
      resultData = {...resultData, ...casesDataStorage};
      const updateDay = parseInt(casesDataStorage.update.split("/")[0]);
      const todayDay = parseInt(todayString.split("/")[0]);
      if (!(todayDay - updateDay)) {
        needUpdate = false;
      }
    }
    if (needUpdate || forceUpdate) {
      const casesData = await getCasesData(slug);
      if ("error" in casesData) {
        resultData["error"] = casesData["error"];
      } else {
        resultData = {...resultData, ...casesData};
        await AsyncStorage.setItem(slug, JSON.stringify(resultData));
      }
    }
  } catch (error) {
    return {"error": "Ha ocurrido un error al consultar los datos. Intente nuevamente."};
  }
  return resultData;
};

export const setIsFavouriteCountry = async (slug, isFavourite) => {
  let state = isFavourite;
  try {
    const newState = !isFavourite;
    const value = await AsyncStorage.getItem(slug);
    if (value) {
      let casesDataStorage = JSON.parse(value);
      let updatedFavourite = {...casesDataStorage, ...{"isFavourite": !isFavourite}}
      await AsyncStorage.setItem(slug, JSON.stringify(updatedFavourite));
      state = !isFavourite;
    }
    return {
      "state": state,
    }
  } catch (error) {
    return {
      "error": `Ha ocurrido un error al ${(isFavourite) ? "quitar" : "agregar"} el favorito. Intente nuevamente.`,
      "state": state,
    };
  }
}

export const getFavouritesCountries = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const countries = await AsyncStorage.multiGet(keys);
    return countries.filter((country) => JSON.parse(country[1]).isFavourite);
  } catch (error) {
    return {
      "error": `Ha ocurrido un error al filtrar los países. Intente nuevamente.`,
      "state": state,
    };
  }
};