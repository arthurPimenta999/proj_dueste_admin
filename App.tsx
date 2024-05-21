import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import Ionicon from "react-native-vector-icons/Ionicons";
import MI from "react-native-vector-icons/MaterialIcons";

import { useFonts } from "@expo-google-fonts/montserrat";
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import TelaCardapioAdmin from "./telas/telaCardapioAdmin";
import TelaFeedbackAdmin from "./telas/telaFeedbackAdmin";

export default function App() {
  {
    /*
  useFonts pra carregar fonte externa e AppLoading pra deixar a tela carregando.
  só parar de carregar a tela quando a fonte estiver 100% pronta pra uso.
  ~Stardust
  */
  }

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
      <StatusBar style="auto" backgroundColor="transparent" />
    </SafeAreaProvider>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  icons: {
    alignItems: "center",
    justifyContent: "center",
  },
  materialTabStyle: {
    backgroundColor: "#dedede",
    borderTopWidth: 0,
    height: height * 0.1,
  },
});

function MyTabs() {
  const theme = useTheme();
  theme.colors.secondaryContainer = "#fcba03";
  return (
    <Tab.Navigator
      initialRouteName="Início"
      activeColor="#d69e04"
      inactiveColor="#000"
      barStyle={styles.materialTabStyle}
    >
      <Tab.Screen
        name="Editar Cardápio"
        component={TelaCardapioAdmin}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicon
              name="pencil"
              size={23}
              style={styles.icons}
              color={focused ? "black" : "#333"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Feedbacks"
        component={TelaFeedbackAdmin}
        options={{
          tabBarIcon: ({ focused }) => (
            <MI
              name="feedback"
              size={23}
              style={styles.icons}
              color={focused ? "black" : "#333"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const Tab = createMaterialBottomTabNavigator();
