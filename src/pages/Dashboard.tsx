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
import { Button } from "../components/Button";

import { Ionicons } from "@expo/vector-icons";

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
    Alert.alert(
      "Confirmação",
      `Tem certeza que deseja ${
        status === "CONFIRMADO" ? "confirmar" : "recusar"
      } sua presença no evento?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            try {
              await api.put(
                `eventos/${evento_id}/participantes/${user.id}/status`,
                {
                  status,
                }
              );
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
          },
        },
      ],
      { cancelable: false }
    );
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

      <View style={styles.rowButtons}>
        <Button
          icon="check"
          title="Confirmar"
          variant="secondary"
          onPress={() => handleAttendance(item.id, "CONFIRMADO")}
        />
        <Button
          icon="x"
          title="Recusar"
          onPress={() => handleAttendance(item.id, "RECUSADO")}
        />
      </View>
      <Button
        icon="eye"
        title="Ver Participantes"
        variant="tertiary"
        onPress={() => fetchParticipants(item.id)}
      />
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
          ListEmptyComponent={() => <Text>Nenhum evento próximo!</Text>}
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
    padding: 18,
    borderRadius: 10,
    marginBottom: 14,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    gap: 10,
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
  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
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
