import React from "react";
import { Text, View } from "react-native";

import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";

import Events from "../pages/Events";
import CreateEvent from "../pages/CreateEvent";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

type AppRoutes = {
  dashboard: undefined;
  events: undefined;
  createEvent: undefined;
  profile: undefined;width: 200
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export default function ProtectedRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 15
        },
      }}
    >
      <Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: "center", width: 200 }}>
              <Feather
                name="home"
                color={focused ? "#F0534F" : "gray"} // Cor do ícone com base no foco
                size={30}
              />
              <Text
                style={{
                  color: focused ? "#F0534F" : "gray",
                  fontSize: 12,
                  fontWeight: "bold",
                  marginTop: 5,
                  textAlign: "center", // Garante que o texto não quebre
                }}
              >
                Inicio
              </Text>
            </View>
          ),
        }}
      />
      <Screen
        name="events"
        component={Events}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: "center", width: 200  }}>
              <Feather
                name="calendar"
                color={focused ? "#F0534F" : "gray"} // Cor do ícone com base no foco
                size={30}
              />
              <Text
                style={{
                  color: focused ? "#F0534F" : "gray",
                  fontSize: 12,
                  fontWeight: "bold",
                  marginTop: 5,
                  textAlign: "center", // Garante que o texto não quebre
                }}
              >
                Eventos
              </Text>
            </View>
          ),
        }}
      />
      <Screen
        name="createEvent"
        component={CreateEvent}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: "center", width: 200 }}>
              <Feather
                name="plus-circle"
                color={focused ? "#F0534F" : "gray"} // Cor do ícone com base no foco
                size={30}
              />
              <Text
                style={{
                  color: focused ? "#F0534F" : "gray",
                  fontSize: 12,
                  fontWeight: "bold",
                  marginTop: 5,
                  textAlign: "center", // Garante que o texto não quebre
                }}
              >
                Criar eventos
              </Text>
            </View>
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: "center", width: 200 }}>
              <Feather
                name="user"
                color={focused ? "#F0534F" : "gray"} // Cor do ícone com base no foco
                size={30}
              />
              <Text
                style={{
                  color: focused ? "#F0534F" : "gray",
                  fontSize: 12,
                  fontWeight: "bold",
                  marginTop: 5,
                  textAlign: "center", // Garante que o texto não quebre
                }}
              >
                Perfil
              </Text>
            </View>
          ),
        }}
      />
    </Navigator>
  );
}
