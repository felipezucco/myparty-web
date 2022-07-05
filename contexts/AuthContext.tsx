import { createContext, useEffect, useState } from "react";
import { SignInRequestType } from "../pages/auth/signin";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from "next/router";
import { AxiosError, AxiosResponse } from "axios";
import api from "../services/api";

export type AuthContextType = {
  isAuthenticated: boolean,
  signIn: (login: SignInRequestType) => Promise<AxiosResponse<any, any>>,
  signOut: () => void,
  user: UserDTO,
  token: string
}

export type AuthResponseType = {
  user: UserDTO,
  token: string
}

export type UserDTO = {
  username?: string,
  name?: string,
  email?: string,
  id?: number
}

const DEFAULT_AUTH_RESPONSE: AuthResponseType = {
  user: {
    username: "",
    name: "",
    email: "",
    id: undefined
  },
  token: ""
};

const DEFAULT_CONTEXT: AuthContextType = {
  isAuthenticated: false,
  signIn: function (login: SignInRequestType): Promise<AxiosResponse<any, any>> {
    throw new Error("Function not implemented.");
  },
  signOut: function (): void {
    throw new Error("Function not implemented.");
  },
  user: {},
  token: ""
};

export const AuthContext = createContext(DEFAULT_CONTEXT);

export const AuthProvider = ({ children }: any) => {

  const [user, setUser] = useState<UserDTO>(DEFAULT_AUTH_RESPONSE.user);
  const [token, setToken] = useState<string>("");
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

  async function signIn(login: SignInRequestType): Promise<AxiosResponse<any, any>> {
    let result = api.post('/api/auth', login);
    result.then(data => authSuccess(data.data));
    return await result;
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
    setUser(auth.user);
    setToken(auth.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    Router.push('/organization/dashboard');
  }

  function clearAuth() {
    destroyCookie({}, 'eventweb.token', { path: '/' })
    setUser(DEFAULT_AUTH_RESPONSE.user);
    delete api.defaults.headers.common["Authorization"];
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user, token }}>
      {children}
    </AuthContext.Provider>
  )

}