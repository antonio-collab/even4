import { NavigationContainer } from "@react-navigation/native";
import ProtectedRoutes from "./protected.routes";
import PublicRoutes from "./public.routes";
import { useAuth } from "../hooks/useAuth";
import { View, Text } from "react-native";

export default function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  console.log(user)

  if (isLoadingUserStorageData)
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );

  return (
    <NavigationContainer>
      {user ? <PublicRoutes /> : <ProtectedRoutes /> }
    </NavigationContainer>
  );
}
