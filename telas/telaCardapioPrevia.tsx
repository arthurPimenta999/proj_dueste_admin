import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesPadrao } from "../styles/stylesDefault";
import AppLoading from "expo-app-loading";
import { doc, getDoc } from "firebase/firestore";
import { styleCardapio } from "../styles/stylesCardapioAdmin";
import { db } from "../apis/firebaseConfig";

export default function SubCardapio() {
  const { width, height } = Dimensions.get("window");

  // variaveis que guardam o que foi obtido do db

  const [pizzaSalURL, setPizzaSalURL] = useState<string[]>([]);
  const [pizzaSalTitle, setPizzaSalTitle] = useState([]);
  const [pizzaSalPreco, setPizzaSalPreco] = useState([]);

  const [pizzaDoceURL, setPizzaDoceURL] = useState<string[]>([]);
  const [pizzaDoceTitle, setPizzaDoceTitle] = useState([]);
  const [pizzaDocePreco, setPizzaDocePreco] = useState([]);

  const [bebidaURL, setBebidaURL] = useState<string[]>([]);
  const [bebidaTitle, setBebidaTitle] = useState([]);
  const [bebidaPreco, setBebidaPreco] = useState([]);

  const [loading, setLoading] = useState(false);

  const update = () => {
    const fetchData = async () => {
      const salRef = doc(db, "pizzaCards", "pizzaSal");
      const salSnap = await getDoc(salRef);

      const doceRef = doc(db, "pizzaCards", "pizzaDoce");
      const doceSnap = await getDoc(doceRef);

      const bebidaRef = doc(db, "pizzaCards", "pizzaBebida");
      const bebidaSnap = await getDoc(bebidaRef);

      // atribuindo os valores obtidos da requisição às variáveis do useState

      if (salSnap.exists() && doceSnap.exists() && bebidaSnap.exists()) {
        setPizzaSalURL(salSnap.data().pizzaURL);
        setPizzaSalTitle(salSnap.data().pizzaTitle);
        setPizzaSalPreco(salSnap.data().pizzaPreco);

        setPizzaDoceURL(doceSnap.data().pizzaURL);
        setPizzaDoceTitle(doceSnap.data().pizzaTitle);
        setPizzaDocePreco(doceSnap.data().pizzaPreco);

        setBebidaURL(bebidaSnap.data().pizzaURL);
        setBebidaTitle(bebidaSnap.data().pizzaTitle);
        setBebidaPreco(bebidaSnap.data().pizzaPreco);
      } else {
        console.log("Documento não encontrado.");
      }
      setLoading(false);
    };

    fetchData();
  };
  // requisição dos itens de dos cartões de cardapio

  useEffect(() => {
    update();
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  const [recarregando, setRecarregando] = useState(false);

  const aoRecarregar = useCallback(async () => {
    setRecarregando(true);
    setTimeout(() => {
      update();
      setRecarregando(false);
    }, 1500);
  }, []);

  // useState para recarregar ao puxar de cima pra baixo

  return (
    <SafeAreaView style={stylesPadrao.safeAreaAlign}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={recarregando} onRefresh={aoRecarregar} />
        }
      >
        <View style={stylesPadrao.titleAlign}>
          <Text style={stylesPadrao.titleStyle}>Prévia do Cardápio</Text>
          <Text style={[stylesPadrao.subTitle400, { marginBottom: 10 }]}>
            Prévia de como os usuários vêem o cardápio:
          </Text>
        </View>

        <View>
          <Text
            style={[
              stylesPadrao.subTitle600,
              { marginHorizontal: width * 0.05, marginBottom: height * 0.025 },
            ]}
          >
            Pizzas salgadas:
          </Text>
          {pizzaSalTitle.map((title, index) => (
            <View style={styleCardapio.styleCard}>
              <Image
                source={{ uri: pizzaSalURL[index] }}
                style={styleCardapio.styleImage}
              />
              <View>
                <Text style={styleCardapio.pizzaTitle}>{title}</Text>
                <Text style={styleCardapio.precoAlign}>
                  {pizzaSalPreco[index]}
                </Text>
              </View>
            </View>
          ))}

          <Text
            style={[
              stylesPadrao.subTitle600,
              { marginHorizontal: width * 0.05, marginBottom: height * 0.025 },
            ]}
          >
            Pizzas doces:
          </Text>

          {pizzaDoceTitle.map((title, index) => (
            <View style={styleCardapio.styleCard}>
              <Image
                source={{ uri: pizzaDoceURL[index] }}
                style={styleCardapio.styleImage}
              />
              <View>
                <Text style={styleCardapio.pizzaTitle}>{title}</Text>
                <Text style={styleCardapio.precoAlign}>
                  {pizzaDocePreco[index]}
                </Text>
              </View>
            </View>
          ))}

          <Text
            style={[
              stylesPadrao.subTitle600,
              { marginHorizontal: width * 0.05, marginBottom: height * 0.025 },
            ]}
          >
            Bebidas:
          </Text>

          {bebidaTitle.map((title, index) => (
            <View style={styleCardapio.styleCard}>
              <Image
                source={{ uri: bebidaURL[index] }}
                style={styleCardapio.styleImage}
              />
              <View>
                <Text style={styleCardapio.pizzaTitle}>{title}</Text>
                <Text style={styleCardapio.precoAlign}>
                  {bebidaPreco[index]}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
