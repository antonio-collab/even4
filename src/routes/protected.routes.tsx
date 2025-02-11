import React from "react";
import { Text, View } from "react-native";

import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";

import Events from "../pages/Events";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import CreateEvent from "../pages/CreateEvent";
import { AddParticipants } from "../pages/AddParticipants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type AppRoutes = {
  dashboard: undefined;
  events: undefined;
  createEvent: undefined;
  profile: undefined;
  addParticipants: { eventId: string };
};

type RootStackParamList = {
  MainTabs: undefined;
  addParticipants: { eventId: string };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<AppRoutes>();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 15,
        },
      }}
    >
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          headerTitle: "Event4",
          headerTitleAlign: "center",
          headerTintColor: "#F0534F",
          headerTitleStyle: { fontSize: 24, fontWeight: 700 },
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: "center", width: 200 }}>
              <Feather
                name="home"
                color={focused ? "#F0534F" : "gray"}
                size={30}
              />
              <Text
                style={{
                  color: focused ? "#F0534F" : "gray",
                  fontSize: 12,
                  fontWeight: "bold",
                  marginTop: 5,
                  textAlign: "center",
                }}
              >
                Inicio
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="events"
        component={Events}
        options={{
          headerTitle: "Meus eventos",
          headerTitleAlign: "center",
          headerTintColor: "#F0534F",
          headerTitleStyle: { fontSize: 24, fontWeight: 700 },
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: "center", width: 200 }}>
              <Feather
                name="calendar"
                color={focused ? "#F0534F" : "gray"}
                size={30}
              />
              <Text
                style={{
                  color: focused ? "#F0534F" : "gray",
                  fontSize: 12,
                  fontWeight: "bold",
                  marginTop: 5,
                  textAlign: "center",
                }}
              >
                Meus eventos
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="createEvent"
        component={CreateEvent}
        options={{
          headerShown: true,
          headerTitle: "Criar Evento",
          headerTitleAlign: "center",
          headerTintColor: "#F0534F",
          headerTitleStyle: { fontSize: 24, fontWeight: 700 },
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: "center", width: 200 }}>
              <Feather
                name="plus-circle"
                color={focused ? "#F0534F" : "gray"}
                size={30}
              />
              <Text
                style={{
                  color: focused ? "#F0534F" : "gray",
                  fontSize: 12,
                  fontWeight: "bold",
                  marginTop: 5,
                  textAlign: "center",
                }}
              >
                Criar evento
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerTitle: "Meu perfil",
          headerTitleAlign: "center",
          headerTintColor: "#F0534F",
          headerTitleStyle: { fontSize: 24, fontWeight: 700 },
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: "center", width: 200 }}>
              <Feather
                name="user"
                color={focused ? "#F0534F" : "gray"}
                size={30}
              />
              <Text
                style={{
                  color: focused ? "#F0534F" : "gray",
                  fontSize: 12,
                  fontWeight: "bold",
                  marginTop: 5,
                  textAlign: "center",
                }}
              >
                Perfil
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function ProtectedRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen
        name="addParticipants"
        component={AddParticipants}
        options={{
          headerShown: true,
          headerTitle: "Adicionar participantes",
          headerTitleAlign: "center",
          headerTintColor: "#F0534F",
          headerTitleStyle: { fontSize: 24, fontWeight: 700 },
        }}
      />
    </Stack.Navigator>
  );
}
