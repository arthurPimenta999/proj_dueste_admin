import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const stylesCardapioPrevia = StyleSheet.create({
  // modal de apagar cartão

  alignExcluir: {
    alignItems: "center",
  },

  btnExcluir: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#aa0000",
    width: 150,
    height: 50,
  },
});

export default stylesCardapioPrevia;
