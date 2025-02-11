import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Colors from "../contantes/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { AppNavigatorRoutesProps } from "../routes/protected.routes";
import Map from "../components/Map";

interface Local {
  endereco: string;
  latitude: number;
  longitude: number;
}

export default function CreateEvent() {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [event, setEvent] = useState({
    nome: "",
    data: "",
    hora: "",
    descricao: "",
    endereco: "",
    latitude: null as number | null,
    longitude: null as number | null,
  });

  const handleChange = (key: string, value: any) => {
    console.log(`✏ Atualizando campo: ${key} ->`, value);
    setEvent((prev) => ({ ...prev, [key]: value }));
  };

  const handleLocationSelected = (local: Local) => {
    console.log("📍 Localização selecionada:", local);
    setEvent((prev) => ({
      ...prev,
      endereco: local.endereco,
      latitude: local.latitude ?? null,
      longitude: local.longitude ?? null,
    }));
  };

  const handleCreateEvent = async () => {
    if (!event.nome || !event.data || !event.hora || !event.descricao) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    console.log("📌 Dados do evento antes do envio:", event);

    try {
      setLoading(true);
      const response = await api.post("eventos", event);
      console.log("✅ Resposta da API:", response.data);

      Alert.alert("Evento criado com sucesso!");
      navigation.navigate("events");
    } catch (error) {
      console.log(
        "❌ Erro ao criar evento:",
        error.response?.data || error.message
      );
      Alert.alert("Erro ao criar evento! Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Evento"
        value={event.nome}
        onChangeText={(text) => handleChange("nome", text)}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{event.data || "Selecionar Data"}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, d) => {
            setShowDatePicker(false);
            if (d) handleChange("data", d.toISOString().split("T")[0]);
          }}
        />
      )}

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>{event.hora || "Selecionar Hora"}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={(e, t) => {
            setShowTimePicker(false);
            if (t) {
              const formattedTime = t.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
              handleChange("hora", formattedTime);
            }
          }}
        />
      )}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição do Evento"
        value={event.descricao}
        onChangeText={(text) => handleChange("descricao", text)}
        multiline
      />

      <Map onLocationSelected={handleLocationSelected} />

      <TouchableOpacity
        style={loading ? styles.buttonDisabled : styles.button}
        onPress={handleCreateEvent}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? <Loading /> : "Criar Evento"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.salmon,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.salmonWhite,
    color: Colors.black,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: Colors.salmon,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: Colors.gray,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
