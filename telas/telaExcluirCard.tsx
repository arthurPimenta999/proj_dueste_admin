import React, { useState } from "react";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { View, Text, Pressable, TextInput } from "react-native";
import { db } from "../apis/firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesPadrao } from "../styles/stylesDefault";
import stylesExcluir from "../styles/styleExcluirCard";
import { styleCardapio } from "../styles/stylesCardapioAdmin";
import SwitchSelector from "react-native-switch-selector";
import NumericInput from "@wwdrew/react-native-numeric-textinput";

export default function TelaExcluir() {
  // variáveis de selecionar qual cartão excluir.

  const [pizzaID, setPizzaID] = useState(0);

  const handleInputChange = (text: string) => {
    const numeroDigitado = parseInt(text);

    if (!isNaN(numeroDigitado)) {
      setPizzaID(numeroDigitado);
    }
  };

  const [pizzaRef, setPizzaRef] = useState("");

  const options = [
    { label: "Salgada", value: "pizzaSal" },
    { label: "Doce", value: "pizzaDoce" },
    { label: "Bebida", value: "pizzaBebida" },
  ];

  function deletePizzaOnPress() {
    const press = async () => {
      try {
        const docRef = doc(db, "pizzaCards", "pizzaDoce");

        await updateDoc(docRef, {
          pizzaTitle: arrayRemove("Teste"),
          pizzaURL: arrayRemove(
            "https://firebasestorage.googleapis.com/v0/b/projetodueste.appspot.com/o/PizzaImages%2F1716852570561?alt=media&token=c494b286-1f13-47f1-9dec-a36acb687dba"
          ),
          pizzaPreco: arrayRemove("R$40"),
        });
        return [
          console.log("Cartão deletado com sucesso."),
          alert("Cartão deletado com sucesso."),
        ];
      } catch (e) {
        console.error("Erro ao alterar documento:", e);
      }
    };

    press();
  }

  return (
    <SafeAreaView style={stylesExcluir.container}>
      <View style={stylesPadrao.titleAlign}>
        <Text style={stylesPadrao.titleStyle}>Deletar Cartão</Text>
      </View>

      <View style={stylesExcluir.centerDelete}>
        <View style={stylesExcluir.marginDeleteContent}>
          <Text style={stylesPadrao.regularFont400}>
            Use os IDs para identificar quais cartões você deseja excluir. É
            possível ver o ID do cartão na aba de prévia do cardápio.
          </Text>
          <Text style={stylesPadrao.regularFont400}>
            Qual cartão você quer excluir?
          </Text>
        </View>

        <View style={stylesExcluir.marginDeleteContent}>
          <SwitchSelector
            options={options}
            initial={0}
            onPress={(value) => setPizzaRef(value)}
            selectedColor={"#000"}
            buttonColor={"#fcba04"}
            textStyle={styleCardapio.switchStyle}
            selectedTextStyle={styleCardapio.switchStyle}
          />
        </View>

        <View style={stylesExcluir.marginDeleteContent}>
          <TextInput
            selectionColor={"#d69e04"}
            style={stylesPadrao.defaultInput}
            placeholder="Digite o ID do item"
            onChangeText={handleInputChange}
            value={pizzaID.toString()}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={stylesExcluir.alignEndBtn}>
          <View style={stylesExcluir.marginDeleteContent}>
            <Pressable onPress={deletePizzaOnPress}>
              <View style={stylesPadrao.btn}>
                <Text style={stylesPadrao.btnText}>Excluir</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
