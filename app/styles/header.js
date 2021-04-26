import {black as fontBlack} from "./fonts";
import {black as backgroundBlack} from "./backgrounds";
import {white as colorWhite} from "./colours";
import {large as fontLarge} from "./fontSizes";

export const container = {
  ...backgroundBlack,
  borderBottomWidth: 0,
};

export const leftComponent = {
  ...fontBlack,
  ...colorWhite,
  ...fontLarge,
};

export const leftContainer = {
  flex: 6,
};

export const rightContainer = {
  flex: 6,
};