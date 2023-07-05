import { COLORS } from "./color-variables";
import { StyleSheet } from "react-native";

export const FONTS = StyleSheet.create({
  primaryFont: {
    fontSize: 20,
    color: COLORS.bluePrimary,
    textAlign: "left",
    fontFamily: "roboto-bold",
    textTransform: "uppercase",
  },
  navFont: {
    fontSize: 14,
    color: COLORS.grayMedium,
    fontFamily: "roboto-medium",
  },
  defaultFont: {
    fontSize: 14,
    color: COLORS.grayDark,
    fontFamily: "roboto-regular",
  },
  lightFont: {
    fontSize: 14,
    color: COLORS.grayMedium,
    fontFamily: "roboto-regular",
  },
});
