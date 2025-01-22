import { NavigationContainer } from "@react-navigation/native";
import ProtectedRoutes from "./protected.routes";
import PublicRoutes from "./public.routes";
import { useAuth } from "../context/hooks/useAuth";

export default function Routes(){
const {user} = useAuth()
    
    return(
        <NavigationContainer>
            {
                user?.token?<ProtectedRoutes/>:<PublicRoutes/>
            }
        </NavigationContainer>
    )
}