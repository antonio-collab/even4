import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../contantes/Colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PublicStackParamList } from "../routes/public.routes";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";

type NavigationProps = NativeStackNavigationProp<
  PublicStackParamList,
  "profile"
>;

export default function Profile() {
  const { logout } = useAuth();

  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>XV</Text>
        </View>
        <View>
          <Text style={styles.userName}>Xavierzera</Text>
          <Text style={styles.userEmail}>xavi1234@server.com</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Meus Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Contate-nos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <Text style={[styles.menuText, styles.logoutText]}>Fazer Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Termos e Serviços</Text>
        </TouchableOpacity>
        <Text style={styles.footerSeparator}> | </Text>
        <TouchableOpacity>
          <Text style={styles.footerText}>Política de Privacidade</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    gap: 250,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.salmon,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  avatarText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.gray,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  menuText: {
    fontSize: 16,
    color: Colors.black,
  },
  logoutText: {
    color: Colors.salmon,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: Colors.salmon,
  },
  footerSeparator: {
    fontSize: 14,
    color: Colors.gray,
    marginHorizontal: 5,
  },
});
