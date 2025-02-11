import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import Colors from "../contantes/Colors";
import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";
import { AppNavigatorRoutesProps } from "../routes/protected.routes";
import { Ionicons } from "@expo/vector-icons";

export default function Events() {
  const [todayEvents, setTodayEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [participants, setParticipants] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [showTodayEvents, setShowTodayEvents] = useState(false);
  const [showFutureEvents, setShowFutureEvents] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const fetchEvents = useCallback(async () => {
    try {
      const response = await api.get("eventos");
      const events = response.data;

      const today = new Date().toISOString().split("T")[0];
      console.log({ today });

      const eventsToday = events.filter((event) => {
        const eventDate = event.data.split("T")[0];
        return eventDate === today;
      });
      setTodayEvents(eventsToday);

      const futureEvents = events.filter((event) => {
        const eventDate = event.data.split("T")[0];
        return eventDate > today;
      });
      setFutureEvents(futureEvents);
    } catch (err) {
      setError("Erro ao carregar eventos. Tente novamente mais tarde.");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchParticipants = async (evento_id) => {
    try {
      const response = await api.get(`eventos/${evento_id}/participantes`);
      setParticipants(response.data);
      setModalVisible(true);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os participantes.");
      console.error(error.message);
    }
  };

  function handleNavigateAddParticipants(event_id: string) {
    navigation.navigate("addParticipants", { eventId: event_id });
  }

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [fetchEvents])
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchEvents();
    }, 30000);
    return () => clearInterval(intervalId);
  }, [fetchEvents]);

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Ionicons name="megaphone" size={24} color={Colors.green} />
          <Text style={styles.eventName}>{item.nome}</Text>
        </View>

        <Button icon="trash" onPress={() => handleDeleteEvent(item.id)} />
      </View>

      <View style={styles.row}>
        <Ionicons name="calendar" size={20} color={Colors.Textgray} />
        <Text style={styles.eventDate}>
          {new Date(item.data).toLocaleDateString()} - {item.hora}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="information-circle" size={20} color={Colors.Textgray} />
        <Text style={styles.eventDescription}>{item.descricao}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="location" size={20} color={Colors.salmon} />

        <Text style={styles.eventAddress}>{item.endereco}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          icon="user-plus"
          title="Adicionar participantes"
          variant="secondary"
          onPress={() => handleNavigateAddParticipants(item.id)}
        />

        <Button
          icon="eye"
          title="Ver Participantes"
          variant="tertiary"
          onPress={() => fetchParticipants(item.id)}
        />
      </View>
    </View>
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchEvents}>
          <Text style={styles.refreshText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function handleDeleteEvent(event_id: string) {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir este evento? Essa operação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await api.delete(`eventos/${event_id}`);
            } catch (error) {
              Alert.alert(
                "Erro",
                "Não foi possível deletar o evento! Tente mais tarde!"
              );
              console.error(error.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setShowTodayEvents(!showTodayEvents)}
      >
        <Text style={styles.title}>Eventos Hoje</Text>
        <Text style={styles.toggleIcon}>{showTodayEvents ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {showTodayEvents && (
        <FlatList
          data={todayEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEventItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <Text>Nenhum evento para hoje!</Text>}
        />
      )}

      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setShowFutureEvents(!showFutureEvents)}
      >
        <Text style={styles.title}>Próximos Eventos</Text>
        <Text style={styles.toggleIcon}>{showFutureEvents ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {showFutureEvents && (
        <FlatList
          data={futureEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEventItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity style={styles.refreshButton} onPress={fetchEvents}>
        <Text style={styles.refreshButtonText}>Atualizar Eventos</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Participantes</Text>
            <FlatList
              data={participants}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Text style={styles.participantName}>
                  {item.nome || `Usuário ${item.usuario_id}`}
                </Text>
              )}
            />

            <Button
              icon="x"
              title="Fechar"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
  },
  toggleIcon: {
    fontSize: 18,
    color: Colors.black,
  },
  listContainer: {
    paddingBottom: 16,
  },
  eventItem: {
    backgroundColor: Colors.salmonWhite,
    padding: 18,
    borderRadius: 10,
    marginBottom: 14,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
  },
  eventDate: {
    fontSize: 16,
    color: Colors.Textgray,
  },
  eventDescription: {
    fontSize: 16,
    textAlign: "justify",
    color: Colors.black,
    paddingRight: 18,
  },
  eventAddress: {
    fontSize: 16,
    color: Colors.salmon,
    fontWeight: "bold",
    textAlign: "justify",
    paddingRight: 18,
  },
  buttonContainer: {
    justifyContent: "space-between",
    marginTop: 15,
    gap: 15,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: Colors.green,
    marginRight: 6,
  },
  viewButton: {
    backgroundColor: Colors.zinc,
    marginLeft: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  attendanceButton: {
    flex: 1,
    backgroundColor: Colors.green,
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
  },
  declineButton: {
    backgroundColor: Colors.red,
    marginLeft: 5,
  },
  attendanceButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  participantText: {
    color: Colors.gray,
    marginTop: 10,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  participantName: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: Colors.salmon,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  errorText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  refreshText: {
    color: Colors.salmon,
    marginTop: 10,
    textAlign: "center",
  },
  refreshButton: {
    backgroundColor: Colors.salmon,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  refreshButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});
