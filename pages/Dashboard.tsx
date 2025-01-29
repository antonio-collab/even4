import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import Colors from "../contantes/Colors";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/protected.routes";

export default function Dashboard() {
  const { user } = useAuth();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <View style={styles.container}>
      <Text style={styles.TextUser}>Olá, {user.nome}!</Text>

      <View style={styles.card}>
        <Text style={styles.TextP}>
          Agora que está tudo pronto. Vamos tornar seus eventos extraordinários,
          começando aqui!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("createEvent")}
        >
          <Text style={styles.buttonText}>Planeje seu Evento</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.TextC}>Próximos eventos</Text>

      <View style={styles.cardCalender}>
        <Image
          source={require("../assets/Calendar Icon.png")}
          style={styles.image}
        />
        <Text style={styles.TextCalen}>
          Seu calendário de eventos é uma tela em branco. Use Event4 para
          encontrar momentos memoráveis.
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  TextUser: {
    position: "relative",
    paddingTop: 100,
    marginRight: 180,
    fontSize: 30,
    fontWeight: "bold",
  },
  card: {
    width: 380,
    height: 185,
    backgroundColor: Colors.salmonWhite,
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 25,
  },
  TextP: {
    fontSize: 20,
    padding: 15,
  },
  button: {
    width: 190,
    height: 50,
    backgroundColor: Colors.salmon,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "bold",
  },
  TextC: {
    paddingTop: 100,
    marginRight: 130,
    fontSize: 25,
    fontWeight: "bold",
  },
  cardCalender: {
    flexDirection: "row",
    width: 400,
    height: 185,
    marginHorizontal: 30,
  },
  image: {
    width: 130,
    height: 90,
    marginVertical: 45,
  },
  TextCalen: {
    fontSize: 20,
    padding: 15,
    marginRight: 100,
    marginVertical: 25,
    color: Colors.Textgray,
    textAlign: "justify",
  },
});
