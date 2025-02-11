import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "../components/Input";
import { api } from "../services/api";
import Colors from "../contantes/Colors";

export function AddParticipants({ route }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { eventId } = route.params;

  async function handleSearchUser() {
    if (!searchTerm.trim()) {
      return Alert.alert("Erro", "Digite um nome para pesquisar");
    }
    try {
      const response = await api.get(`usuarios?termo=${searchTerm}`);
      setUsers(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar os usuários");
    }
  }

  async function handleAddParticipant(userId) {
    try {
      console.log({ userId });
      const response = await api.post(`eventos/${eventId}/participantes`, {
        usuario_id: userId,
      });
      Alert.alert("Sucesso", response.data.mensagem);
    } catch (error) {
      if (error.response?.status === 401) {
        Alert.alert("Erro", error.response.data.erro);
      } else {
        Alert.alert("Erro", "Não foi possível adicionar o participante");
      }
    }
  }

  return (
    <View style={styles.container}>
      <Input
        icon={"search"}
        formProps={{
          name: "search",
          rules: undefined,
          shouldUnregister: undefined,
          defaultValue: undefined,
          control: undefined,
          disabled: undefined,
        }}
        inputProps={{
          placeholder: "Digite um nome",
          value: searchTerm,
          onChangeText: setSearchTerm,
          onSubmitEditing: handleSearchUser,
          returnKeyType: "search",
        }}
      />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.userName}>{item.nome}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAddParticipant(item.id)}
            >
              <Text style={styles.buttonText}>Adicionar participante</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  card: {
    backgroundColor: Colors.gray,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.Textgray,
    marginBottom: 8,
  },
  button: {
    backgroundColor: Colors.green,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
