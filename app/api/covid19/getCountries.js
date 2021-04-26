import axios from "axios";
import translation from "../libretranslate/translation";

export default async () => {
  try {
    const response = await axios.get("https://api.covid19api.com/countries");
/*
    const countries = [];
    for (const data of response.data) {
      let countryName = await translation(data.Country);
      countries.push({...data, ...{Country: countryName}});
    }
*/
    return response.data.sort(
      (a, b) => {
        if (a.Country > b.Country) {
          return 1;
        }
        if (a.Country < b.Country) {
          return -1;
        }
        return 0;
      }
    );
    /*
      const countries = [];
      for (const data of response.data) {
        countries.push({...data, ...{Country_ES: await translate(data.Country)}});
      }
      return countries;
    */
  } catch (error) {
    return [{"error": "Ha ocurrido un error al cargar el listado de paises desde la API. Intente nuevamente más tarde."}];
  }
}