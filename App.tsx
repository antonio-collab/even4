import Routes from "./src/routes/index";
import "@/global.css";
import { AuthProvider } from "./src/context/AuthContext";
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
