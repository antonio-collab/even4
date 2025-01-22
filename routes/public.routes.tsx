import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function PublicRoutes() {
const {Navigator, Screen} = createNativeStackNavigator()

    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="login" component={Login} />
            <Screen name="register" component={Register} />
      </Navigator>

    )
}
