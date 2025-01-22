import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { api } from "../services/api";


type User = {
    token: string
}

type AuthContextProps = {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null)

    async function login(email: string, password: string) {

        const response = await api.post("admin/login", {
            email,
            password,
        })

        console.log(response.data.token)
    }

    async function logout() { }

    return (

        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}