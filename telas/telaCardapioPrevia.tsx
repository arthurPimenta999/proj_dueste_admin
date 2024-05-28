import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesPadrao } from "../styles/stylesDefault";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { styleCardapio } from "../styles/stylesCardapioAdmin";
import { db } from "../apis/firebaseConfig";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import stylesCardapioPrevia from "../styles/stylesCardapioPrevia";

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

  const salRefDel = "pizzaSal";
  const doceRefDel = "pizzaDoce";
  const bebidaRefDel = "pizzaBebida";

  // acessando db

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

  // função usada pra recarregar a pagina ao puxar pra baixo

  const [recarregando, setRecarregando] = useState(false);

  const aoRecarregar = useCallback(async () => {
    setRecarregando(true);
    setTimeout(() => {
      update();
      setRecarregando(false);
    }, 1500);
  }, []);

  // Modal

  const refModal = useRef(null);
  const snapPointModal = useMemo(() => ["50%", "70%"], []);
  const handleOpenModal = () => refModal.current?.expand();

  // referencia de qual titulo jogar pra modal

  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    preco: string;
    url: string;
    ref: string;
  } | null>(null);

  const handlePressSelect = (
    title: string,
    preco: string,
    url: string,
    ref: string
  ) => {
    handleOpenModal();
    setSelectedItem({ title, preco, url, ref });
    console.log("O titulo selecionado é: ", selectedItem?.title);
    console.log("O titulo selecionado é: ", selectedItem?.preco);
    console.log("O titulo selecionado é: ", selectedItem?.url);
    console.log("O titulo selecionado é: ", selectedItem?.ref);
  };

  // função de excluir cartão

  const deletePizzaOnPress = async () => {
    try {
      const docRef = doc(db, "pizzaCards", selectedItem.ref);

      await updateDoc(docRef, {
        pizzaTitle: arrayRemove(selectedItem?.title),
        pizzaPreco: arrayRemove(selectedItem?.preco),
        pizzaURL: arrayRemove(selectedItem?.url),
      });
      return [
        console.log("Cartão deletado com sucesso."),
        alert("Cartão deletado com sucesso."),
      ];
    } catch (e) {
      console.error("Erro ao alterar documento:", e);
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={stylesPadrao.safeAreaAlign}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={recarregando}
              onRefresh={aoRecarregar}
            />
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
                {
                  marginHorizontal: width * 0.05,
                  marginBottom: height * 0.025,
                },
              ]}
            >
              Pizzas salgadas:
            </Text>
            {pizzaSalTitle.map((title, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  handlePressSelect(
                    title,
                    pizzaSalPreco[index],
                    pizzaSalURL[index],
                    salRefDel
                  )
                }
              >
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
                    <Text style={styleCardapio.pizzaTitle}>ID: {[index]}</Text>
                  </View>
                </View>
              </Pressable>
            ))}

            <Text
              style={[
                stylesPadrao.subTitle600,
                {
                  marginHorizontal: width * 0.05,
                  marginBottom: height * 0.025,
                },
              ]}
            >
              Pizzas doces:
            </Text>

            {pizzaDoceTitle.map((title, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  handlePressSelect(
                    title,
                    pizzaDocePreco[index],
                    pizzaDoceURL[index],
                    doceRefDel
                  )
                }
              >
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
                    <Text style={styleCardapio.pizzaTitle}>ID: {[index]}</Text>
                  </View>
                </View>
              </Pressable>
            ))}

            <Text
              style={[
                stylesPadrao.subTitle600,
                {
                  marginHorizontal: width * 0.05,
                  marginBottom: height * 0.025,
                },
              ]}
            >
              Bebidas:
            </Text>

            {bebidaTitle.map((title, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  handlePressSelect(
                    title,
                    bebidaPreco[index],
                    bebidaURL[index],
                    bebidaRefDel
                  )
                }
              >
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
                    <Text style={styleCardapio.pizzaTitle}>ID: {[index]}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <BottomSheet
          ref={refModal}
          index={-1}
          snapPoints={snapPointModal}
          enablePanDownToClose={true}
          style={[stylesPadrao.modalStyle, { alignItems: "center" }]}
          backgroundStyle={{ backgroundColor: "#fafafa" }}
        >
          <View style={stylesPadrao.modalContainer}>
            <View style={stylesPadrao.modalTitleAlign}>
              <Text style={[stylesPadrao.modalTitle, { textAlign: "center" }]}>
                Ações
              </Text>
            </View>

            <View>
              <View style={{ marginVertical: 10 }}>
                <Text style={stylesPadrao.regularFont400}>
                  Cartão selecionado:
                </Text>
              </View>
              <View style={styleCardapio.styleCard}>
                <Image
                  source={{ uri: selectedItem?.url }}
                  style={styleCardapio.styleImage}
                />
                <View>
                  <Text style={styleCardapio.pizzaTitle}>
                    {selectedItem?.title}
                  </Text>
                  <Text style={styleCardapio.precoAlign}>
                    {selectedItem?.preco}
                  </Text>
                </View>
              </View>
            </View>

            <View style={stylesCardapioPrevia.alignExcluir}>
              <Pressable onPress={deletePizzaOnPress}>
                <View style={stylesCardapioPrevia.btnExcluir}>
                  <Text
                    style={[stylesPadrao.regularFont400, { color: "#fff" }]}
                  >
                    Apagar Cartão?
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
