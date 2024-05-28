import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const stylesPadrao = StyleSheet.create({
  safeAreaAlign: {
    flex: 1,
  },

  // fontes gerais

  regularFont600: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
  },
  regularFont400: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
  },

  // styles de titulos de paginas

  titleAlign: {
    marginVertical: height * 0.025,
    marginHorizontal: width * 0.05,
  },
  titleStyle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 30,
  },

  // styles de subtitulos de paginas

  subTitle600: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 23,
  },
  subTitle400: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 20,
  },

  // botão amarelo padrão

  btn: {
    width: 160,
    height: 60,
    backgroundColor: "#fcba03",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  btnText: {
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 18,
    position: "absolute",
  },

  // estilo global de modals

  modalStyle: {
    backgroundColor: "rgba(52, 52, 52, 0.0)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 100,
    },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 10,
  },

  modalContainer: {
    flex: 1,
    marginHorizontal: width * 0.1,
  },
  modalTitleAlign: {
    marginVertical: height * 0.01,
    alignItems: "center",
  },
  modalTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
  },
  modalContentAlign: {
    marginTop: height * 0.025,
    alignItems: "center",
  },

  // estilo de input padrão

  defaultInput: {
    marginVertical: height * 0.01,
    backgroundColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: "Montserrat_400Regular",
  },
});
