import { createContext, useContext } from "react";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin?: (email: string, password: string) => Promise<any>;
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};
