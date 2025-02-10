import React, { forwardRef } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  Text,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { Controller, UseControllerProps } from "react-hook-form";

import Colors from "../contantes/Colors";

import clsx from "clsx";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  error?: string;
  formProps: UseControllerProps;
  inputProps: TextInputProps;
};

const Input = forwardRef<TextInput, Props>(
  ({ icon, formProps, inputProps, error = "" }, ref) => {
    return (
      <Controller
        render={({ field }) => (
          <View style={styles.container}>
            <View style={styles.group}>
              <View style={styles.icon}>
                <Feather
                  name={icon}
                  size={24}
                  color={clsx({
                    ["#DC1637"]: error.length > 0,
                    [Colors.green]: error.length === 0 && field.value,
                    ["#999"]: !field.value && error.length === 0,
                  })}
                />
              </View>
              <TextInput
                ref={ref}
                value={field.value}
                onChangeText={field.onChange}
                style={styles.control}
                {...inputProps}
              />
            </View>
            {error.length > 0 ? (
              <Text style={styles.error}>{error}</Text>
            ) : null}
          </View>
        )}
        {...formProps}
      />
    );
  }
);
export { Input };

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  control: {
    flex: 1,
    height: 56,
    width: "100%",
    paddingLeft: 16,
    fontSize: 16,
  },
  group: {
    width: "100%",
    height: 56,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    height: 56,
    width: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 3,
    borderRightColor: "#F4F5F6",
  },
  error: {
    fontSize: 14,
    marginTop: 7,
    color: "#DC1637",
  },
});
