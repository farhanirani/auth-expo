import { createContext, useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { AuthContext } from "./AuthContextProps";
import { API_URL, SECURE_TOKEN_KEY } from "@/constants/Constants";

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(SECURE_TOKEN_KEY);
      console.log("[TOKEN STORED] ", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      } else {
        setAuthState({
          token: null,
          authenticated: false,
        });
      }
    };
    loadToken();
  }, []);

  // LOGIN - and save the tokens
  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth`, { email, password });
      console.log("[LOGIN] ", result.data);

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      // AXIOS DEFAULT HTTP headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
      // SAVE IN SECURE STORE FROM EXPO
      await SecureStore.setItemAsync(SECURE_TOKEN_KEY, result.data.token);

      return result;
    } catch (err) {
      return { error: true, msg: (err as any).response.data.msg };
    }
  };

  // REGISTER
  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/users`, { email, password });
    } catch (err) {
      return { error: true, msg: (err as any).response.data.msg };
    }
  };

  // LOGOUT
  const logout = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync(SECURE_TOKEN_KEY);
    // AXIOS delete default header
    axios.defaults.headers.common["Authorization"] = ``;

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    authState,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
