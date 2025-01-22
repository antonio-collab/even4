import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Register from "../pages/Register";

type AuthRoutes = {
    login: undefined
    register: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const {Navigator, Screen} = createNativeStackNavigator<AuthRoutes>()

export default function PublicRoutes() {

    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="login" component={Login} />
            <Screen name="register" component={Register} />
      </Navigator>

    )
}
