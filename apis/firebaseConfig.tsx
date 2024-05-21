import AppLoading from "expo-app-loading";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { styleCardapio } from "../styles/stylesCardapioAdmin";
import { stylesPadrao } from "../styles/stylesDefault";

const firebaseConfig = {
  apiKey: "AIzaSyDy2KiQXzy0Ce5CuR83G_LE6UxJLYsWFiA",
  authDomain: "projetodueste.firebaseapp.com",
  databaseURL: "https://projetodueste-default-rtdb.firebaseio.com",
  projectId: "projetodueste",
  storageBucket: "projetodueste.appspot.com",
  messagingSenderId: "989713015226",
  appId: "1:989713015226:web:2185390e6f3eeb4ac93d83",
  measurementId: "G-BH2VJ1FDZN",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// ========== funções exemplo pra ler/gravar dados ==========

async function readData() {
  const querySnapshot = await getDocs(collection(db, "cardapioURL"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

async function writeData() {
  try {
    const docRef = await addDoc(collection(db, "oirsrs"), {
      first: "Allan",
      middle: "Diniz Raposo Moreira",
      last: "de Góes",
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// ==========================================================

export function PizzasSalgadas() {
  const [pizzaURL, setPizzaURL] = useState<string[]>([]);
  const [pizzaTitle, setPizzaTitle] = useState([]);
  const [pizzaPreco, setPizzaPreco] = useState([]);
  const [loading, setLoading] = useState(false);

  // requisição dos itens de dos cartões de cardapio

  useEffect(() => {
    const fetchData = async () => {
      const cardRef = doc(db, "pizzaCards", "pizzaSal");
      const cardSnap = await getDoc(cardRef);

      // atribuindo os valores obtidos da requisição às variáveis do useState

      if (cardSnap.exists()) {
        setPizzaURL(cardSnap.data().pizzaURL);
        setPizzaTitle(cardSnap.data().pizzaTitle);
        setPizzaPreco(cardSnap.data().pizzaPreco);
      } else {
        console.log("Documento não encontrado.");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <AppLoading />;
  }
  const [busca, setBusca] = useState("");

  const pizzasFiltradas = pizzaTitle
    .map(String)
    .filter((title) => title.toLowerCase().includes(busca.toLowerCase()));

  return (
    <View>
      {pizzasFiltradas.map((title, index) => (
        <View style={styleCardapio.styleCard}>
          <Image
            source={{ uri: pizzaURL[index] }}
            style={styleCardapio.styleImage}
          />
          <View>
            <Text style={styleCardapio.pizzaTitle}>{title}</Text>
            <Text style={styleCardapio.precoAlign}>{pizzaPreco[index]}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

//Deletar QUALQUER documento do BD ~~Rafinha
async function DeleteData(colecao: string, id: string) {
  try {
    const docRef = await deleteDoc(doc(db, colecao, id));
    console.log("Documento deletado com sucesso");
  } catch (e) {
    console.error("Erro ao deletar documento do ID:", id);
  }
}
