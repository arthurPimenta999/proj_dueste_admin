import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const stylesFeedback = StyleSheet.create({
  container: {
    flex: 1,
  },

  // ========== CARTÕES DE FEEDBACK ==========

  // alinhar cartões ao centro da tela

  alignCard: {
    alignItems: "center",
  },

  // alinhar texto

  textStyle: {
    textAlign: "left",
    fontFamily: "Montserrat_400Regular",
  },

  // estilos do cartão

  cardStyle: {
    backgroundColor: "#ccc",
    padding: 20,
    borderRadius: 15,
  },
});

export default stylesFeedback;
