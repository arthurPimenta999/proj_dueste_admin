import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesPadrao } from "../styles/stylesDefault";
import { useNavigation } from "@react-navigation/native";
import NavigationContainer from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaCardapioAdmin from "./telaCardapioAdmin";
import styleHome from "../styles/stylesHome";
import TelaFeedbackAdmin from "./telaFeedbackAdmin";
import LogoDueste from "../components/duesteLogo.png";
import TelaExcluir from "./telaExcluirCard";

function TelaHome() {
  const navigation = useNavigation();

  const [boasVindas, setBoasVindas] = useState("");

  useEffect(() => {
    const updateBemVindo = () => {
      const agora = new Date();
      const horas = agora.getHours();

      if (horas < 12) {
        setBoasVindas("Bom dia");
      } else if (horas < 18) {
        setBoasVindas("Boa tarde");
      } else {
        setBoasVindas("Boa noite");
      }
    };

    updateBemVindo();

    const interval = setInterval(updateBemVindo, 300000);

    return () => clearInterval(interval);
  }, []);

  const descricoes = [
    { key: "Gestão dinâmica do cardápio;" },
    { key: "Interatividade com opiniões de clientes;" },
    { key: "Criar, ver, editar e deletar itens do cardápio." },
  ];

  const renderItem = ({ item }) => (
    <View style={styleHome.functionStyle}>
      <Text style={styleHome.bulletStyle}>•</Text>
      <Text style={stylesPadrao.regularFont400}>{item.key}</Text>
    </View>
  );

  return (
    <SafeAreaView style={stylesPadrao.safeAreaAlign}>
      <View style={stylesPadrao.titleAlign}>
        <Text style={stylesPadrao.titleStyle}>{boasVindas}.</Text>
      </View>

      <View style={styleHome.alignAppDescription}>
        <Text style={stylesPadrao.subTitle600}>Este app permite:</Text>
        <FlatList
          data={descricoes}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </View>

      <View style={styleHome.container}>
        <View style={styleHome.alignLogo}>
          <Image source={LogoDueste} style={styleHome.styleLogo} />
          <Text style={styleHome.adminTxt}>A D M I N I S T R A D O R</Text>
        </View>

        <View style={styleHome.flexEndBtn}>
          <View style={styleHome.alignBtn}>
            <View style={styleHome.alignBtnRow}>
              <Pressable onPress={() => navigation.navigate("Create")}>
                <View style={[stylesPadrao.btn, { backgroundColor: "#eee" }]}>
                  <Text style={stylesPadrao.btnText}>Criar Cartão</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Delete")}>
                <View style={[stylesPadrao.btn, { backgroundColor: "#eee" }]}>
                  <Text style={stylesPadrao.btnText}>Excluir Cartão</Text>
                </View>
              </Pressable>
            </View>
          </View>

          <View style={styleHome.alignBtn}>
            <View style={styleHome.alignBtnRow}>
              <Pressable onPress={() => navigation.navigate("Update")}>
                <View style={[stylesPadrao.btn, { backgroundColor: "#eee" }]}>
                  <Text style={stylesPadrao.btnText}>Editar Cartão</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Feedback")}>
                <View style={[stylesPadrao.btn, { backgroundColor: "#eee" }]}>
                  <Text style={stylesPadrao.btnText}>Ver Opiniões</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function Telas() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Delete"
    >
      <Stack.Screen name="Inicio" component={TelaHome} />
      <Stack.Screen name="Create" component={TelaCardapioAdmin} />
      <Stack.Screen name="Update" component={TelaCardapioAdmin} />
      <Stack.Screen name="Delete" component={TelaExcluir} />
      <Stack.Screen name="Feedback" component={TelaFeedbackAdmin} />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();

export default Telas;
