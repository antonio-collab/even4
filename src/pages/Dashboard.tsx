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
import { useFocusEffect } from "@react-navigation/native";
import { api } from "../services/api";
import Colors from "../contantes/Colors";
import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const [todayEvents, setTodayEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [participants, setParticipants] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [showTodayEvents, setShowTodayEvents] = useState(false);
  const [showFutureEvents, setShowFutureEvents] = useState(false);

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

  const handleAttendance = async (evento_id, status) => {
    try {
      await api.put(`eventos/${evento_id}/participantes/${user.id}/status`, {
        status,
      });
      Alert.alert(
        "Sucesso",
        `Presença ${
          status === "CONFIRMADO" ? "confirmada" : "recusada"
        } no evento!`
      );
      fetchEvents();
    } catch (error) {
      try {
        await api.post(`eventos/${evento_id}/participantes`, {
          usuario_id: user.id,
        });
        await api.patch(`eventos/${evento_id}/participantes/status`, {
          usuario_id: user.id,
          status,
        });
        Alert.alert(
          "Sucesso",
          `Presença ${
            status === "CONFIRMADO" ? "confirmada" : "recusada"
          } no evento!`
        );
        fetchEvents();
      } catch (err) {
        Alert.alert(
          "Erro",
          "Não foi possível atualizar sua presença no evento."
        );
        console.error(err.message);
      }
    }
  };

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

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventName}>{item.nome}</Text>
      <Text style={styles.eventDate}>
        {new Date(item.data).toLocaleDateString()} - {item.hora}
      </Text>
      <Text style={styles.eventDescription}>{item.descricao}</Text>
      <Text style={styles.eventAddress}>{item.endereco}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.attendanceButton}
          onPress={() => handleAttendance(item.id, "CONFIRMADO")}
        >
          <Text style={styles.attendanceButtonText}>Confirmar Presença</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.attendanceButton, styles.declineButton]}
          onPress={() => handleAttendance(item.id, "RECUSADO")}
        >
          <Text style={styles.attendanceButtonText}>Recusar Presença</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => fetchParticipants(item.id)}>
        <Text style={styles.participantText}>Ver Participantes</Text>
      </TouchableOpacity>
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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export const styles = StyleSheet.create({
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
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  eventDate: {
    fontSize: 14,
    color: Colors.Textgray,
  },
  eventDescription: {
    fontSize: 14,
    color: Colors.black,
  },
  eventAddress: {
    fontSize: 14,
    color: Colors.gray,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
