import { NavigationContainer } from "@react-navigation/native";
import ProtectedRoutes from "./protected.routes";
import PublicRoutes from "./public.routes";
import { useAuth } from "../hooks/useAuth";
import React from "react";
import { Loading } from "../components/Loading";
import { FormProvider, useForm } from "react-hook-form";

export default function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();
  const methods = useForm();
  console.log(user);

  if (isLoadingUserStorageData) return <Loading />;

  return (
    <NavigationContainer>
      <FormProvider {...methods}>
        {user.id ? <ProtectedRoutes /> : <PublicRoutes />}
      </FormProvider>
    </NavigationContainer>
  );
}
