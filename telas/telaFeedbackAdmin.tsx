import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesPadrao } from "../styles/stylesDefault";
import stylesFeedback from "../styles/stylesFeedbackAdmin";
import { db } from "../apis/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function TelaFeedbackAdmin() {
  const [feedbackNome, setFeedbackNome] = useState([]);
  const [feedbackSubject, setFeedbackSubject] = useState([]);
  const [feedbackContent, setFeedbackContent] = useState([]);

  async function Update() {
    let nomes: string[] = [];
    let titulos: string[] = [];
    let conteudo: string[] = [];

    const fetchData = async () => {
      const feedbackRef = collection(db, "pizzaFeedback");
      const querySnapshot = await getDocs(feedbackRef);

      querySnapshot.forEach((doc) => {
        const nomeObtido = doc.data().feedbackNome;
        const tituloObtido = doc.data().feedbackTitle;
        const conteudoObtido = doc.data().feedbackContent;

        nomes.push(nomeObtido);
        titulos.push(tituloObtido);
        conteudo.push(conteudoObtido);
      });

      return [
        nomes,
        titulos,
        conteudo,
        setFeedbackNome(nomes),
        setFeedbackSubject(titulos),
        setFeedbackContent(conteudo),
      ];
    };

    fetchData();
  }

  useEffect(() => {
    Update();
  }, []);

  const [recarregando, setRecarregando] = useState(false);

  const aoRecarregar = useCallback(async () => {
    setRecarregando(true);
    setTimeout(() => {
      Update();
      setRecarregando(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={stylesPadrao.safeAreaAlign}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={recarregando} onRefresh={aoRecarregar} />
        }
      >
        <View style={stylesPadrao.titleAlign}>
          <Text style={stylesPadrao.titleStyle}>Feedbacks</Text>
        </View>

        <View>
          {feedbackNome.map((title, index) => (
            <View key={index} style={stylesFeedback.alignCard}>
              <View style={stylesFeedback.cardStyle}>
                <Text style={stylesFeedback.textStyle}>
                  Nome do usuário: {title}
                </Text>

                <Text style={stylesFeedback.textStyle}>
                  Title: {feedbackSubject[index]}
                </Text>

                <Text style={stylesFeedback.textStyle}>
                  Content: {feedbackContent[index]}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
