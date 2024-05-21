import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const stylesPadrao = StyleSheet.create({
  safeAreaAlign: {
    flex: 1,
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
    fontFamily: "Montserrat_400Regular",
    fontSize: 18,
    position: "absolute",
  },
});
