import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesPadrao } from "../styles/stylesDefault";
import { db } from "../apis/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { styleCardapio } from "../styles/stylesCardapioAdmin";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function TelaCardapioAdmin() {
  // useStates pra definir valores digitados nos inputs

  const [precoPizza, setPrecoPizza] = useState("");
  const [nomePizza, setNomePizza] = useState("");
  const [urlPizza, setUrlPizza] = useState("");

  // try-catch pra add as pizzas no cardapio

  async function addPizzaOnPress() {
    if (precoPizza === "" || nomePizza === "" || urlPizza === "") {
      alert("Preencha todos os campos antes de continuar.");
    } else {
      try {
        const docRef = await updateDoc(doc(db, "pizzaCards", "pizzaSal"), {
          pizzaPreco: arrayUnion(precoPizza),
          pizzaTitle: arrayUnion(nomePizza),
          pizzaURL: arrayUnion(urlPizza),
        });
        return [docRef, console.log("Documento Alterado com sucesso")];
      } catch (e) {
        console.error("Erro ao alterar documento:", e);
      }
    }
  }

  return (
    <SafeAreaView style={stylesPadrao.safeAreaAlign}>
      <View style={stylesPadrao.titleAlign}>
        <Text style={stylesPadrao.titleStyle}>Editar Cardápio</Text>
      </View>

      <View style={styleCardapio.fullViewAlign}>
        <View>
          {/* textinput de titulo da pizza */}
          <View>
            <Text style={stylesPadrao.subTitle400}>Nome da pizza:</Text>
            <TextInput
              selectionColor={"#d69e04"}
              style={styleCardapio.pizzaAddInput}
              placeholder="Digite o nome da pizza"
              onChangeText={setNomePizza}
            />
            <Text style={stylesPadrao.subTitle400}>Preço da pizza:</Text>
            <TextInput
              selectionColor={"#d69e04"}
              style={styleCardapio.pizzaAddInput}
              placeholder="Digite o preço da pizza"
              onChangeText={setPrecoPizza}
            />
            <Text style={stylesPadrao.subTitle400}>
              Link de imagem da pizza:
            </Text>
            <TextInput
              selectionColor={"#d69e04"}
              style={styleCardapio.pizzaAddInput}
              placeholder="Copie aqui o URL da imagem"
              onChangeText={setUrlPizza}
            />

            <View style={styleCardapio.previewAlign}>
              <Text style={stylesPadrao.subTitle600}>Prévia:</Text>
            </View>

            <Pressable onPress={addPizzaOnPress}>
              <View style={styleCardapio.alignAddBtn}>
                <View style={stylesPadrao.btn}>
                  <Text style={stylesPadrao.btnText}>Adicionar</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styleCardapio.previewCardAlign}>
        <View style={styleCardapio.styleCard}>
          <Image source={{ uri: urlPizza }} style={styleCardapio.styleImage} />
          <View>
            <Text style={styleCardapio.pizzaTitle}>{nomePizza}</Text>
            <Text style={styleCardapio.precoAlign}>{precoPizza}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  const navigation = useNavigation();
}
