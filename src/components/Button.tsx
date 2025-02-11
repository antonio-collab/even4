import React, {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import clsx from "clsx";
import Colors from "../contantes/Colors";

type ButtonProps = TouchableOpacityProps & {
  title?: string;
  icon?: keyof typeof Feather.glyphMap;
  variant?: "primary" | "secondary" | "tertiary";
};

export function Button({
  title,
  icon,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], !title && styles.iconOnly]}
      {...rest}
    >
      {icon && <Feather name={icon} color={"#fff"} size={20} />}
      {title && <Text style={styles.title}>{title}</Text>}
    </TouchableOpacity>
  );
}

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: Colors.salmon,
  },
  secondary: {
    backgroundColor: Colors.green,
  },
  tertiary: {
    backgroundColor: Colors.yellow,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  iconOnly: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
  },
});
