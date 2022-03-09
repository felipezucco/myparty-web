import { createContext, useEffect, useState } from "react";
import { SignInRequestType } from "../pages/auth/signin";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from "next/router";
import { AxiosError } from "axios";
import api from "../services/api";

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
      recoverAuth(token).then(data => authSuccess(data.data)).catch((error: AxiosError) => {
        Router.push('/auth/invalid_auth').then(() => {
          setTimeout(clearAuth, 3000);
        })
      });
    }
  }, [])

  async function signIn(login: SignInRequestType): Promise<any> {
    await api.post('/api/auth', login)
      .then(data => authSuccess(data.data))
      .catch(error => { throw error });
  }

  async function signOut() {
    await api.get('/logout')
      .then(data => console.log(data))
      .catch((error: AxiosError) => console.error(error.response));
    destroyCookie({}, 'eventweb.token', { path: '/' })

    Router.push('/');
  }

  async function recoverAuth(token: string) {
    return await api.post('/auth/recover', {
      token: token
    })
  }

  function authSuccess(auth: AuthResponseType) {
    setCookie(undefined, 'eventweb.token', auth.token, {
      maxAge: 60 * 60, //30min
      path: '/'
    });
    setUser({ username: auth.username });

    api.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    Router.push('/dashboard');
  }

  function clearAuth() {
    destroyCookie({}, 'eventweb.token', { path: '/' })
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )

}