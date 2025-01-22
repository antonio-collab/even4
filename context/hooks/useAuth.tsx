import { AuthContext } from "../AuthContext";
import { useContext } from "react";
export const useAuth = () =>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("Erro at AuthProvider")
    }
    return context
}