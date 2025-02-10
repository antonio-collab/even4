import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../contantes/Colors";

type Props = TouchableOpacityProps & {
  title: string;
  icon: keyof typeof Feather.glyphMap;
};

export function Button({ title, icon, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
      <Feather name={icon} color={"#fff"} size={18} />
    </TouchableOpacity>
  );
}

import { StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    width: "100%",
    backgroundColor: Colors.salmon,
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
});
