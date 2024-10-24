import { StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
  },

  text: {
    color: "#f5f5f5",
    fontSize: responsiveFontSize(2),
    fontFamily: "RubikNormal",
  },

  icon: {
    marginRight: 10,
  },
});
