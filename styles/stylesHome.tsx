import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styleHome = StyleSheet.create({
  // amarelo kkkkkk

  container: {
    flex: 1,
    backgroundColor: "#fcba04",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  // lista de funções do app

  alignAppDescription: {
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.025,
  },

  functionStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  bulletStyle: {
    fontSize: 24,
    marginRight: 10,
  },

  // estilos da logo
  alignLogo: {
    marginVertical: height * 0.05,
    alignItems: "center",
  },

  styleLogo: {
    width: width * 0.8,
    height: height * 0.12,
  },

  adminTxt: {
    marginVertical: width * 0.025,
    fontFamily: "Montserrat_400Regular",
    fontSize: 25,
    color: "#fff",
  },

  // alinhar botao embaixo da tela.

  flexEndBtn: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: height * 0.025,
  },

  alignBtn: {
    marginVertical: height * 0.015,
  },

  alignBtnRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default styleHome;
