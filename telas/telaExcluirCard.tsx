import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TextInput,
  Pressable,
} from "react-native";
import { db } from "../apis/firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesPadrao } from "../styles/stylesDefault";
import stylesExcluir from "../styles/styleExcluirCard";
import { styleCardapio } from "../styles/stylesCardapioAdmin";
import SwitchSelector from "react-native-switch-selector";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TelaExcluir() {
  const [pizzaSalTitle, setPizzaSalTitle] = useState([]);
  const [pizzaDoceTitle, setPizzaDoceTitle] = useState([]);
  const [bebida, setBebida] = useState([]);

  const [loading, setLoading] = useState(false);

  const update = async () => {
    const fetchData = async () => {
      const salRef = doc(db, "pizzaCards", "pizzaSal");
      const salSnap = await getDoc(salRef);

      const doceRef = doc(db, "pizzaCards", "pizzaDoce");
      const doceSnap = await getDoc(doceRef);

      const bebidaRef = doc(db, "pizzaCards", "pizzaBebida");
      const bebidaSnap = await getDoc(bebidaRef);

      // atribuindo os valores obtidos da requisição às variáveis do useState

      if (salSnap.exists() && doceSnap.exists() && bebidaSnap.exists()) {
        setPizzaSalTitle(salSnap.data().pizzaTitle);
        setPizzaDoceTitle(doceSnap.data().pizzaTitle);
        setBebida(bebidaSnap.data().pizzaTitle);
      } else {
        console.log("Documento não encontrado.");
      }
      setLoading(false);
    };

    fetchData();
  };

  useEffect(() => {
    update();
  });

  const [recarregando, setRecarregando] = useState(false);

  const aoRecarregar = useCallback(async () => {
    setRecarregando(true);
    setTimeout(() => {
      update();
      setRecarregando(false);
    }, 1500);
  }, []);

  // variáveis de selecionar qual cartão excluir.

  const [pizzaID, setPizzaID] = useState("");

  const [pizzaRef, setPizzaRef] = useState("");

  const options = [
    { label: "Salgada", value: "pizzaSal" },
    { label: "Doce", value: "pizzaDoce" },
    { label: "Bebida", value: "pizzaBebida" },
  ];

  async function addPizzaOnPress() {
    if (pizzaID === "") {
      alert("Preencha todos os campos antes de continuar.");
    } else {
      try {
        const docRef = await updateDoc(doc(db, "pizzaCards", pizzaRef), {
          pizzaTitle: arrayRemove(pizzaID),
          pizzaURL: arrayRemove(pizzaID),
          pizzaPreco: arrayRemove(pizzaID),
        });
        return [
          docRef,
          console.log("Cartão deletado com sucesso."),
          alert("Cartão deletado com sucesso."),
        ];
      } catch (e) {
        console.error("Erro ao alterar documento:", e);
      }
    }
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={stylesExcluir.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={recarregando}
              onRefresh={aoRecarregar}
            />
          }
        >
          <View style={stylesPadrao.titleAlign}>
            <Text style={stylesPadrao.titleStyle}>Deletar Cartão</Text>
          </View>

          <View style={stylesExcluir.centerDelete}>
            <View style={stylesExcluir.marginDeleteContent}>
              <Text style={stylesPadrao.regularFont400}>
                Use os IDs para identificar quais cartões você deseja excluir.
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
                onChangeText={setPizzaID}
                value={pizzaID}
                keyboardType="decimal-pad"
              />
            </View>

            <View style={stylesExcluir.alignEndBtn}>
              <View style={stylesExcluir.marginDeleteContent}>
                <Pressable onPress={addPizzaOnPress}>
                  <View style={stylesPadrao.btn}>
                    <Text style={stylesPadrao.btnText}>Excluir</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={stylesExcluir.fullViewAlign}>
            <View style={stylesExcluir.marginDeleteContent}>
              <Text style={stylesPadrao.regularFont400}>
                Selecione um catrão de sabor para excluir:
              </Text>
            </View>

            <View>
              <View>
                <Text style={stylesPadrao.subTitle600}>Salgadas:</Text>
                {pizzaSalTitle.map((title, index) => (
                  <View style={stylesExcluir.cardAlign}>
                    <View style={stylesExcluir.cardSectionAlign}>
                      <Text style={stylesExcluir.cardSectionTitle}>
                        Nome do sabor:
                      </Text>
                      <Text style={stylesExcluir.cardSectionContent}>
                        {title}
                      </Text>
                    </View>

                    <View style={stylesExcluir.cardSectionAlign}>
                      <Text style={stylesExcluir.cardSectionTitle}>ID:</Text>
                      <Text style={stylesExcluir.cardSectionContent}>
                        {[index]}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <View>
                <Text style={stylesPadrao.subTitle600}>Doces:</Text>
                {pizzaDoceTitle.map((title, index) => (
                  <View style={stylesExcluir.cardAlign}>
                    <View style={stylesExcluir.cardSectionAlign}>
                      <Text style={stylesExcluir.cardSectionTitle}>
                        Nome do sabor:
                      </Text>
                      <Text style={stylesExcluir.cardSectionContent}>
                        {title}
                      </Text>
                    </View>

                    <View style={stylesExcluir.cardSectionAlign}>
                      <Text style={stylesExcluir.cardSectionTitle}>ID:</Text>
                      <Text style={stylesExcluir.cardSectionContent}>
                        {[index]}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <View>
                <Text style={stylesPadrao.subTitle600}>Bebidas:</Text>
                {bebida.map((title, index) => (
                  <View style={stylesExcluir.cardAlign}>
                    <View style={stylesExcluir.cardSectionAlign}>
                      <Text style={stylesExcluir.cardSectionTitle}>
                        Nome do sabor:
                      </Text>
                      <Text style={stylesExcluir.cardSectionContent}>
                        {title}
                      </Text>
                    </View>

                    <View style={stylesExcluir.cardSectionAlign}>
                      <Text style={stylesExcluir.cardSectionTitle}>ID:</Text>
                      <Text style={stylesExcluir.cardSectionContent}>
                        {[index]}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
