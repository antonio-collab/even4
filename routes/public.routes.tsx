import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import React from "react";

type AuthRoutes = {
  login: undefined;
  register: undefined;
  home: undefined;
};


export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export default function PublicRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: true }}>
      <Screen name="home" component={Home} options={{headerShown: false}}/>
      <Screen name="login" component={Login} options={{
          headerTitle: "", 
        }}/>
      <Screen
        name="register"
        component={Register}
        options={{
          headerTitle: "", 
        }}
      />
    </Navigator>
  );
}
