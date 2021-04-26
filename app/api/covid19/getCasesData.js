import axios from "axios";
import {datetimeToString as datetimeFormat, dateToString as dateFormat} from "../../utils/datetimeToString";
import thousandsSeparators from "../../utils/thousandsSeparators";

/**
 * Summary. Obtener los casos de un país.
 *
 * Description. Función que consulta a COVID19API los casos de la última semana para el país del que se recibe su slug.
 *
 * @param {String}  country   Slug en COVID19API de un país.
 *
 * @return {Object} Diccionario con los casos del país y/o un mensaje del error que pudiera ocurrir.
 */
export default async (country) => {
  try {
    // Se obtienen las fechas y sus strings en formato que permitan filtrar la consulta a la API
    const today = new Date();
    const todayDate = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const lastWeekDate = lastWeek.getFullYear() + "-" + ("0" + (lastWeek.getMonth() + 1)).slice(-2) + "-" + ("0" + lastWeek.getDate()).slice(-2);

    // Se realizan las consultas a la API
    const totalConfirmed = await axios.get(`https://api.covid19api.com/total/country/${country}/status/confirmed?from=${lastWeekDate}T00:00:00Z&to=${todayDate}T00:00:00Z`);
    const totalRecovered = await axios.get(`https://api.covid19api.com/total/country/${country}/status/recovered?from=${lastWeekDate}T00:00:00Z&to=${todayDate}T00:00:00Z`);
    const totalDeaths = await axios.get(`https://api.covid19api.com/total/country/${country}/status/deaths?from=${lastWeekDate}T00:00:00Z&to=${todayDate}T00:00:00Z`);

    // Se procesan los datos obtenidos para su posterior visualización y se retornan
    const processDataObject = processData({
      "totalConfirmed": totalConfirmed.data.reverse(),
      "totalDeaths": totalDeaths.data.reverse(),
      "totalRecovered": totalRecovered.data.reverse(),
    });
    return processDataObject;
  } catch (error) {
    // Ocurre un error al realizar la obtención de los datos por lo que se retorna informando la situación
    return {"error": "Ha ocurrido un error al obtener la información desde la API. Intente nuevamente más tarde."};
  }
}

/**
 * Summary. Procesar los datos obtenidos de COVID19API.
 *
 * Description. Función que recibe los datos obtenidos en las consultas a la API y los procesa para su posterior visualización.
 *
 * @param {Object}  data    Datos obtenidos de la API
 *
 * @return {Object} Diccionario con los datos procesados y organizados para visualizar.
 */
const processData = (data) => {
  // Se reciben los datos obtenidos de la API
  const {totalConfirmed, totalDeaths, totalRecovered} = data;

  // Se inicializa el objeto a devolver con "update" actualizado
  const resultData = {
    "update": datetimeFormat(new Date()),
  };

  // Se declaran las variables que contendran el valor de casos totales
  let totalCasesConfirmed, totalCasesDeaths, totalCasesRecovered;

  // Si se tiene información de los casos confimados, se la procesa
  if (totalConfirmed.length) {
    // Se inicializa la variable que contiene la fecha de los datos y se almacena en el objeto a devolver en un formato para visualizar
    let casesDate = new Date(totalConfirmed[0].Date);
    resultData["dataDate"] = dateFormat(new Date(casesDate.setHours(casesDate.getHours() + 3)));

    // Se almacena en el objeto a devolver la cantidad de casos confirmados totales
    totalCasesConfirmed = totalConfirmed[0].Cases;
    resultData["totalCasesConfirmed"] = thousandsSeparators(totalCasesConfirmed);

    // Se almacena en el objeto a devolver la cantidad de casos confirmados diarios (calculado restando los casos totales en el día menos los registrados en el día anterior)
    resultData["totalDailyConfirmed"] = thousandsSeparators(totalCasesConfirmed - totalConfirmed[1].Cases);
  }

  // Si se tiene información de los fallecimientos, se la procesa
  if (totalDeaths.length) {
    // Se almacena en el objeto a devolver la cantidad de fallecimientos totales
    totalCasesDeaths = totalDeaths[0].Cases;
    resultData["totalCasesDeaths"] = thousandsSeparators(totalCasesDeaths);

    // Se almacena en el objeto a devolver la cantidad de fallecimientos diarios (calculado restando los casos totales en el día menos los registrados en el día anterior)
    resultData["totalDailyDeaths"] = thousandsSeparators(totalCasesDeaths - totalDeaths[1].Cases);
  }

  // Si se tiene información de los casos recuperados, se la procesa
  if (totalRecovered.length) {
    // Se almacena en el objeto a devolver la cantidad de casos recuperados totales
    totalCasesRecovered = totalRecovered[0].Cases;
    resultData["totalCasesRecovered"] = thousandsSeparators(totalCasesRecovered);

    // Se almacena en el objeto a devolver la cantidad de casos recuperados diarios (calculado restando los casos totales en el día menos los registrados en el día anterior)
    resultData["totalDailyRecovered"] = thousandsSeparators(totalCasesRecovered - totalRecovered[1].Cases);
  }

  // Si se tiene información de todos los casos, se la procesa para obtener los casos activos
  if (totalConfirmed.length && totalDeaths.length && totalRecovered.length) {
    // Se almacena en el objeto a devolver la cantidad de casos activos totales
    resultData["totalCasesActive"] = thousandsSeparators(totalCasesConfirmed - totalCasesDeaths - totalCasesRecovered);
  }

  // Se retornan los datos procesados
  return resultData;
};