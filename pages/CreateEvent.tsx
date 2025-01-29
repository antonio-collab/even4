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
import { Platform } from "react-native";

import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/protected.routes";

export default function CreateEvent() {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({
    nome: "",
    data: "",
    hora: "",
    descricao: "",
    endereco: "",
    local_id: 1,
  });

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleChange(key, value) {
    setEvent({ ...event, [key]: value });
  }

  async function handleCreateEvent() {
    try {
      setLoading(true);
      await api.post("eventos", {
        nome: event.nome,
        data: event.data,
        hora: event.hora,
        descricao: event.descricao,
        local_id: 1,
      });
      Alert.alert("Evento criado com sucesso!");
      setEvent({
        nome: "",
        data: "",
        hora: "",
        descricao: "",
        endereco: "",
        local_id: 1,
      });
      navigation.navigate("events");
    } catch (error) {
      Alert.alert("Erro ao criar evento! Tente novamente mais tarde!");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleDateChange(event, selectedDate) {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      handleChange("data", selectedDate.toISOString().split("T")[0]);
    }
  }

  function handleTimeChange(event, selectedTime) {
    setShowTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      handleChange("hora", `${hours}:${minutes}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Evento"
        placeholderTextColor={Colors.gray}
        value={event.nome}
        onChangeText={(text) => handleChange("nome", text)}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: event.data ? Colors.black : Colors.gray }}>
          {event.data
            ? `${event.data.split("-")[2]}/${event.data.split("-")[1]}/${
                event.data.split("-")[0]
              }`
            : "Selecionar Data"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={{ color: event.hora ? Colors.black : Colors.gray }}>
          {event.hora || "Selecionar Hora"}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleTimeChange}
        />
      )}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Endereço"
        placeholderTextColor={Colors.gray}
        value={event.endereco}
        onChangeText={(text) => handleChange("endereco", text)}
        multiline
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição do Evento"
        placeholderTextColor={Colors.gray}
        value={event.descricao}
        onChangeText={(text) => handleChange("descricao", text)}
        multiline
      />
      <TouchableOpacity
        style={loading ? styles.buttonDisabled : styles.button}
        onPress={handleCreateEvent}
      >
        <Text style={styles.buttonText} disabled={loading}>
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
    backgroundColor: Colors.salmonWhite,
    paddingTop: 14,
    paddingBottom: 14,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
