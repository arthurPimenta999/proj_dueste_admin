import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesPadrao } from "../styles/stylesDefault";

export default function TelaFeedbackAdmin() {
  return (
    <SafeAreaView style={stylesPadrao.safeAreaAlign}>
      <View style={stylesPadrao.titleAlign}>
        <Text style={stylesPadrao.titleStyle}>Feedbacks</Text>
      </View>
    </SafeAreaView>
  );
}
