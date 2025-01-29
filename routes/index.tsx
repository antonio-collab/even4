import { NavigationContainer } from "@react-navigation/native";
import ProtectedRoutes from "./protected.routes";
import PublicRoutes from "./public.routes";
import { useAuth } from "../hooks/useAuth";
import { View, Text } from "react-native";
import React from "react";
import { Loading } from "../components/Loading";

export default function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  console.log(user);

  if (isLoadingUserStorageData) return <Loading />;

  return (
    <NavigationContainer>
      {user.id ? <ProtectedRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
}
