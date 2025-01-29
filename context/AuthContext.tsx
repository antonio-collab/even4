import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { api } from "../services/api";
import { storageUserSave, storageUserGet, storageUserRemove } from "../storage/storageUser";
import { UserDTO } from "../dtos/UserDTO";
import { storageAuthTokenGet, storageAuthTokenRemove } from "../storage/storageAuthToken";
import React from "react";
type User = {
  token: string;
};

type AuthContextProps = {
  user: UserDTO
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
  isLoadingUserStorageData: boolean;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setLoadingUserStorageData] = useState(true);

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(userData);
  }


  async function login(email: string, password: string) {
    try {
      const { data } = await api.post("usuarios/login", {
        email,
        password,
      });

      if (data.user && data.token) {
        await storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function LoadUserData() {
    try {
      setLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (userLogged) {
        userAndTokenUpdate(userLogged, token);
      }

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingUserStorageData(false);
    }
  }

  async function logout() {
    try {
      setLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    LoadUserData();
  }, []);


  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserProfile, isLoadingUserStorageData }}>
      {children}
    </AuthContext.Provider>
  );
};
