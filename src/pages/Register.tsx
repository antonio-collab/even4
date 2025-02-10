import React, { useRef } from "react";

import { useState } from "react";
import Colors from "../contantes/Colors";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { Loading } from "../components/Loading";

import { useFormContext } from "react-hook-form";

import {
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text } from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function Register() {
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext<RegisterDataProps>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passwordConfirmationRef = useRef<TextInput>(null);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  async function onSubmitEditing() {
    try {
      setLoading(true);
      const { nome, email, password, phone } = getValues();

      await api.post("usuarios/registro", {
        nome,
        email,
        senha: password,
        telefone: phone,
      });
      Alert.alert("Cadastro realizado com sucesso!");
      if (email && password) {
        await login(email, password);
      }
    } catch (error) {
      Alert.alert(
        "Erro ao fazer login! Tente novamente mais tarde",
        error.message
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function validationPasswordConfirmation(passwordConfirmation: string) {
    const { password } = getValues();

    return password === passwordConfirmation || "As senhas devem ser iguais.";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Criar sua conta</Text>

      <Input
        icon="user"
        error={errors.nome?.message}
        formProps={{
          name: "nome",
          control,
          rules: {
            required: "Nome é obrigatório",
          },
        }}
        inputProps={{
          placeholder: "Nome",
          onSubmitEditing: () => emailRef.current?.focus(),
          returnKeyType: "next",
        }}
      />

      <Input
        ref={emailRef}
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
          onSubmitEditing: onSubmitEditing,
        }}
      />

      <Input
        ref={phoneRef}
        icon="phone"
        error={errors.phone?.message}
        formProps={{
          name: "phone",
          control,
          rules: {
            required: "Telefone é obrigatório",
            pattern: {
              value: /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/,
              message: "Telefone inválido",
            },
          },
        }}
        inputProps={{
          placeholder: "Telefone",
          onSubmitEditing: onSubmitEditing,
        }}
      />

      <Input
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
          onSubmitEditing: () => passwordConfirmationRef.current?.focus(),
          returnKeyType: "next",
          secureTextEntry: true,
        }}
      />

      <Input
        ref={passwordConfirmationRef}
        icon="key"
        error={errors.passwordConfirmation?.message}
        formProps={{
          name: "passwordConfirmation",
          control,
          rules: {
            required: "Confirme a senha.",
            validate: validationPasswordConfirmation,
          },
        }}
        inputProps={{
          placeholder: "Confirme a senha.",
          onSubmitEditing: onSubmitEditing,
          secureTextEntry: true,
        }}
      />

      <Button
        title="Finalizar"
        icon="check"
        onPress={handleSubmit(onSubmitEditing)}
      />

      <View style={styles.textFooter}>
        <Text>Já possui uma conta?{"  "}</Text>
        <TouchableOpacity>
          <Text style={styles.linkFooter}>Faça login</Text>
        </TouchableOpacity>
      </View>
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
    height: 56,
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
    marginBottom: 15,
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
  linkFooter: {
    color: Colors.salmon,
    fontWeight: "bold",
  },
  textFooter: {
    flex: 1,
    flexDirection: "row",
  },
});
