import React from "react";
import { View, ActivityIndicator } from "react-native";
import Colors from "../contantes/Colors";

export function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.salmon} />
    </View>
  );
}
