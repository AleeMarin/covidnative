export default (number) => {
  let stringNumber = number.toString();
  let resultString = "";
  stringNumber.split("").reverse().forEach(
    (stringDigit, index) => {
      if (index > 0 && !(index % 3)) {
        resultString = "." + resultString;
      }
      resultString = stringDigit + resultString;
    }
  );
  return resultString;
}