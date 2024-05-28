import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const stylesExcluir = StyleSheet.create({
  container: {
    flex: 1,
  },

  fullViewAlign: {
    marginHorizontal: width * 0.05,
  },

  // alinhar e estilizar cada info de cartão

  cardAlign: {
    marginVertical: height * 0.01,
  },

  cardSectionAlign: {
    flexDirection: "row",
    gap: 5,
  },

  cardSectionTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 17,
  },

  cardSectionContent: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 17,
  },

  // alinhar botão de excluir

  alignEndBtn: {
    alignItems: "center",
  },

  // centralizar campo de descrição/botões

  centerDelete: {
    marginHorizontal: width * 0.05,
  },

  marginDeleteContent: {
    marginVertical: height * 0.01,
  },
});

export default stylesExcluir;
