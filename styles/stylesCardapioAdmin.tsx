import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styleCardapio = StyleSheet.create({
  fullViewAlign: {
    marginHorizontal: width * 0.05,
  },

  // estilos dos cartões
  pizzaTitleAlign: {
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.02,
  },
  pizzaTitleStyle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
  },
  styleCard: {
    marginBottom: height * 0.03,
    marginHorizontal: width * 0.05,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  styleImage: {
    width: width * 0.3,
    height: height * 0.15,
    borderRadius: 25,
  },
  pizzaTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    marginLeft: width * 0.07,
    marginVertical: height * 0.003,
    maxWidth: "70%",
  },
  precoAlign: {
    fontFamily: "Montserrat_400Regular",
    marginLeft: width * 0.07,
  },

  // prévia de cartão

  previewCardAlign: {
    marginTop: height * 0.01,
  },

  // alinhar botões de adicionar pizza ao DB e gerar link

  alignPizzaBtns: {
    marginVertical: height * 0.025,
    justifyContent: "center",
    flexDirection: "row",
    gap: 25,
  },

  // alinhar icone de modal info

  modalIconAlign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // estilos modal gerar link

  imagePlaceholder: {
    backgroundColor: "#ccc",
    borderRadius: 25,
    alignItems: "center",
    width: width * 0.75,
    height: width * 0.75,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  // modal de link gerado

  modalCentralizada: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalLinkStyle: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  // estilo de texto do switch selector

  switchStyle: {
    fontFamily: "Montserrat_400Regular",
  },
});
