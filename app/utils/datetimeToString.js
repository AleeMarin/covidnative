export const datetimeToString = (datetime) => {
  return `${dateToString(datetime)} a las ${timeToString(datetime)}`;
};

export const dateToString = (datetime) => {
  const pad = (s) => {
    return (s < 10) ? "0" + s : s;
  }
  return [pad(datetime.getDate()), pad(datetime.getMonth()+1), datetime.getFullYear()].join('/')
};

export const timeToString = (datetime) => {
  return datetime.toLocaleTimeString();
};