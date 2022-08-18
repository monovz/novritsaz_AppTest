import { StyleSheet } from "react-native";
import globalVar from "./variable";

const globalStyle = StyleSheet.create({
  regularFont: {
    fontFamily: 'Montserrat_400',
    // lineHeight: 24
  },
  mediumFont: {
    fontFamily: 'Montserrat_500',
    // lineHeight: 24
  },
  boldFont: {
    fontFamily: 'Montserrat_700',
    // lineHeight: 24
  },
  whiteFont: {
    color: globalVar.color.white,
  },
  gray99Font: {
    color: globalVar.color.gray99,
  }
})

export default globalStyle