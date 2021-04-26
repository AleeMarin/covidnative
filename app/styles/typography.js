import {black as colorBlack} from "./colours";
import {medium as fontMedium, regular as fontRegular, bold as fontBold} from "./fonts";
import {large as fontLarge} from "./fontSizes";

export const text = {
  ...fontMedium,
  ...colorBlack,
  textAlign: "center",
};

export const info = {
  ...text,
  ...fontRegular,
};

export const title = {
  ...text,
  ...fontLarge,
};

export const action = {
  ...text,
  ...fontBold,
  ...fontLarge,
};

export const sectionTitle = {
  ...text,
  fontSize: 32,
};

export const infoTitle = {
  ...text,
  ...fontBold,
  fontSize: 40,
};

export const infoData = {
  ...text,
  fontSize: 64,
};