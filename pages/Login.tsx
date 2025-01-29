import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import Colors from "../contantes/Colors";
import { useAuth } from "../hooks/useAuth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Importa a biblioteca de ícones
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/protected.routes";
import React from "react";
import { Loading } from "../components/Loading";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function handleSign() {
    try {
      if (!email || !password) {
        alert("Por favor, preencha todos os campos!");
        throw AxiosError;
      }
      setLoading(true);

      await login(email, password);
    } catch (error) {
      Alert.alert("Erro ao fazer login! Tente novamente mais tarde!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>E-mail</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite seu email"
            placeholderTextColor={focusedEmail ? Colors.black : Colors.gray}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocusedEmail(true)}
            onBlur={() => setFocusedEmail(false)}
          />
        </View>

        <Text>Senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor={focusedPassword ? Colors.black : Colors.gray}
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedPassword(true)}
            onBlur={() => setFocusedPassword(false)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.icon}
          >
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color={Colors.gray}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={loading ? styles.buttonDisabled : styles.button}
          onPress={handleSign}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? <Loading /> : "Login"}
          </Text>
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
  },
  form: {
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
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
