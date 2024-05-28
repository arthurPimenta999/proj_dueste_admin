import React from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import Ionicon from "react-native-vector-icons/Ionicons";
import MI from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { useFonts } from "@expo-google-fonts/montserrat";
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import TelaFeedbackAdmin from "./telas/telaFeedbackAdmin";
import SubCardapio from "./telas/telaCardapioPrevia";
import TelaHome from "./telas/telaHome";

export default function App() {
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
      initialRouteName="Home"
      activeColor="#d69e04"
      inactiveColor="#000"
      barStyle={styles.materialTabStyle}
    >
      <Tab.Screen
        name="Prévia do Cardápio"
        component={SubCardapio}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicon
              name="eye"
              size={23}
              style={styles.icons}
              color={focused ? "black" : "#333"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={TelaHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
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
