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
    shadowColor: "#000",
    alignItems: "center",
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
  },
  precoAlign: {
    fontFamily: "Montserrat_400Regular",
    marginLeft: width * 0.07,
  },

  // inputs pra adicionar pizzas

  pizzaAddInput: {
    marginVertical: height * 0.01,
    backgroundColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: "Montserrat_400Regular",
  },

  // prévia de cartão

  previewAlign: {
    marginTop: height * 0.025,
  },
  previewCardAlign: {
    marginTop: height * 0.01,
  },

  // alinhar botão de adicionar pizza

  alignAddBtn: {
    position: "absolute",
    marginHorizontal: width * 0.25,
    marginTop: height * 0.3,
  },
});
