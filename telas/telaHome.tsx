import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesPadrao } from "../styles/stylesDefault";
import { useNavigation } from "@react-navigation/native";
import styleHome from "../styles/stylesHome";
import LogoDueste from "../components/duesteLogo.png";

export default function TelaHome() {
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
              <Pressable onPress={() => {}}>
                <View style={[stylesPadrao.btn, { backgroundColor: "#eee" }]}>
                  <Text style={stylesPadrao.btnText}>Criar Cartão</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => {}}>
                <View style={[stylesPadrao.btn, { backgroundColor: "#eee" }]}>
                  <Text style={stylesPadrao.btnText}>Excluir Cartão</Text>
                </View>
              </Pressable>
            </View>
          </View>

          <View style={styleHome.alignBtn}>
            <View style={styleHome.alignBtnRow}>
              <Pressable onPress={() => {}}>
                <View style={[stylesPadrao.btn, { backgroundColor: "#eee" }]}>
                  <Text style={stylesPadrao.btnText}>Editar Cartão</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => {}}>
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
