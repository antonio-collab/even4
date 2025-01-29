import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "../services/api";
import Colors from "../contantes/Colors";
import { Loading } from "../components/Loading";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = useCallback(async () => {
    try {
      const response = await api.get("eventos");
      setEvents(response.data);
    } catch (error) {
      setError("Erro ao carregar eventos. Tente novamente mais tarde.");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [fetchEvents])
  );

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventName}>{item.nome}</Text>
      <Text style={styles.eventDate}>
        {new Date(item.data).toLocaleDateString()} - {item.hora}
      </Text>
      <Text style={styles.eventDescription}>{item.descricao}</Text>
      <Text style={styles.eventAddress}>{item.endereco}</Text>
    </View>
  );

  const EmptyEventItem = () => (
    <View style={styles.containerEmptyList}>
      <Text style={styles.titleEmptyList}>Nenhum evento cadastrado ainda!</Text>
    </View>
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEventItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyEventItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  containerEmptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.salmon,
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  titleEmptyList: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 16,
    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 16,
  },
  eventItem: {
    backgroundColor: Colors.salmonWhite,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: Colors.Textgray,
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: Colors.black,
    marginBottom: 8,
  },
  eventAddress: {
    fontSize: 14,
    color: Colors.gray,
  },
  errorText: {
    fontSize: 16,
    color: Colors.salmon,
    textAlign: "center",
  },
});
