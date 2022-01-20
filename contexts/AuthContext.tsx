import { createContext, useEffect, useState } from "react";
import api from "../external/API";
import { SignInRequestType } from "../pages/login";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from "next/router";
import { AxiosError } from "axios";

export type AuthContextType = {
  isAuthenticated: boolean,
  signIn: (login: SignInRequestType) => Promise<void>,
  user: User | null
}

export type AuthResponseType = {
  username: string,
  token: string
}

export type User = {
  username: string
}


export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {

  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'eventweb.token': token } = parseCookies();
    recoverAuth(token).then(data => authSuccess(data.data)).catch(() => clearAuth());
  }, [])

  async function signIn(login: SignInRequestType) {
    await api.post('/auth', login).then(data => authSuccess(data.data)).catch((error: AxiosError) => alert(error.response?.data));
  }

  async function recoverAuth(token: string) {
    return await api.post('/auth/recover', token)
  }

  function authSuccess(auth: AuthResponseType) {
    setCookie(undefined, 'eventweb.token', auth.token, {
      maxAge: 60 * 30, //30min
    });
    setUser({ username: auth.username });
    Router.push('/dashboard');
  }

  function clearAuth() {
    destroyCookie(undefined, 'eventweb.token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )

}