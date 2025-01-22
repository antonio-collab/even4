import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Feather} from "@expo/vector-icons"

type AppRoutes = {
    dashboard: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;


const {Navigator, Screen} = createBottomTabNavigator<AppRoutes>()

export default function ProtectedRoutes() {
    return (
        <Navigator screenOptions={{headerShown: false, tabBarShowLabel: false }}>
            <Screen name="dashboard" component={Dashboard} options={{
                tabBarIcon: ({color}) => (<Feather name="home" color={color} size={30}/>)
            }} />
      </Navigator>

    )
}