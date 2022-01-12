import { createContext } from "react";

export type AuthContextType = {
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {

  return (
    <AuthContext.Provider value={{ isAuthenticated: false }}>
      {children}
    </AuthContext.Provider>
  )

}