import { createContext, useEffect, useState } from "react";
import { SignInRequestType } from "../pages/login";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from "next/router";
import { AxiosError } from "axios";
import apiInstance from "../services/api";
import { GetServerSideProps } from "next";
import { getAPIClient } from "../services/axios";

export type AuthContextType = {
  isAuthenticated: boolean,
  signIn: (login: SignInRequestType) => Promise<void>,
  signOut: () => Promise<void>,
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
    if (!!token) {
      console.log('eventweb.token', token)
      recoverAuth(token).then(data => authSuccess(data.data)).catch(() => clearAuth());
    }
  }, [])

  async function signIn(login: SignInRequestType) {
    console.log('login', login)
    await apiInstance.post('/auth', login).then(data => authSuccess(data.data)).catch((error: AxiosError) => console.error(error.response?.data));
  }

  async function signOut() {
    await apiInstance.get('/logout')
      .then(data => console.log(data.data))
      .catch((error: AxiosError) => console.log(error.response));
    destroyCookie(undefined, "eventweb.token");
    delete apiInstance.defaults.headers.common["Authorization"];
  }

  async function recoverAuth(token: string) {
    return await apiInstance.post('/auth/recover', token)
  }

  function authSuccess(auth: AuthResponseType) {
    setCookie(undefined, 'eventweb.token', auth.token, {
      maxAge: 60 * 1, //1min
    });
    setUser({ username: auth.username });

    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    Router.push('/dashboard');
  }

  function clearAuth() {
    destroyCookie(undefined, 'eventweb.token');
    setUser(null);
    delete apiInstance.defaults.headers.common["Authorization"];
    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )

}