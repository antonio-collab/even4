import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import Colors from "../contantes/Colors";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/protected.routes";
import { Loading } from "../components/Loading";

import { useFormContext } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function Login() {
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext<RegisterDataProps>();

  const passwordRef = useRef<TextInput>(null);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function onSubmitEditing() {
    try {
      setLoading(true);
      const { email, password } = getValues();

      if (email && password) {
        await login(email, password);
      }
    } catch (error) {
      Alert.alert("Erro ao fazer login! Tente novamente mais tarde!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Criar sua conta</Text>

      <Input
        icon="mail"
        error={errors.email?.message}
        formProps={{
          name: "email",
          control,
          rules: {
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: "E-mail inválido",
            },
          },
        }}
        inputProps={{
          placeholder: "E-mail",
          onSubmitEditing: () => passwordRef.current?.focus(),
        }}
      />

      <Input
        ref={passwordRef}
        icon="key"
        error={errors.password?.message}
        formProps={{
          name: "password",
          control,
          rules: {
            required: "Senha é obrigatório",
            minLength: {
              value: 6,
              message: "A senha deve ter pelo menos 6 dígitos.",
            },
          },
        }}
        inputProps={{
          placeholder: "Senha",
          onSubmitEditing: onSubmitEditing,
          secureTextEntry: true,
        }}
      />

      {loading ? (
        <TouchableOpacity disabled={loading} style={styles.buttonDisabled}>
          <Text style={styles.buttonText} disabled={loading}>
            <Loading />
          </Text>
        </TouchableOpacity>
      ) : (
        <Button
          title={"Criar conta"}
          icon="check"
          onPress={handleSubmit(onSubmitEditing)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    padding: 24,
    gap: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 44,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 7,
    color: Colors.black,
  },
  icon: {
    margin: 5,
  },
  button: {
    backgroundColor: Colors.salmon,
    paddingTop: 14,
    paddingBottom: 14,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: Colors.salmonWhite,
    paddingTop: 14,
    paddingBottom: 14,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "bold",
  },
  link: {
    marginTop: 16,
    textAlign: "left",
    color: Colors.salmon,
    fontSize: 14,
    fontWeight: "500",
  },
});
