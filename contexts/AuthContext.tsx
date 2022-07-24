import { createContext, useEffect, useState } from "react";
import { SignInRequestType } from "../pages/auth/signin";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from "next/router";
import { AxiosError, AxiosResponse } from "axios";
import api from "../services/api";
import { GetUser } from "../src/dto/user.dto";
import LoadingState from "../components/loading_state/loading_state";
import { createConnectionSSE, disconnectSSE } from "../src/sse/sse";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useAppDispatch } from "../src/store/hooks";
import { GetNotification } from "../src/dto/notification.dto";
import { asyncOrganizations, setNotification } from "../src/store/user.store";
import { NotificationEvent } from "../src/enum/notification_event.enum";
import { asyncSetOrganization } from "../src/store/controller.store";
import { getAuthApi } from "../services/axios";

export type AuthContextType = {
  isAuthenticated: boolean,
  signIn: (login: SignInRequestType) => Promise<AxiosResponse<any, any>>,
  signOut: () => void,
  user: GetUser,
  token: string
}

export type AuthResponseType = {
  user: GetUser,
  token: string
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

  // Context
  const dispatch = useAppDispatch();
  // State
  const [user, setUser] = useState<GetUser>(DEFAULT_AUTH_RESPONSE.user);
  const [token, setToken] = useState<string>("");
  const isAuthenticated = !!user;
  const [loading, setLoading] = useState(false);
  const [sse, setSSE] = useState<EventSourcePolyfill>();

  useEffect(() => {
    console.log("chamou o effect do context")
    const { 'eventweb.token': token } = parseCookies();
    if (!!token) {
      console.log("criou token");
      setLoading(true);
      recoverAuth(token).then(data => {
        authSuccess(data.data)
      }).catch((error: AxiosError) => {
        console.error("erro ao recoverAuth", error);
        Router.push('/auth/invalid_auth').then(() => {
          setTimeout(clearAuth, 3000);
        })
      }).finally(() => setLoading(false));
    }
    if (sse) {
      disconnectSSE(sse);
    }
  }, [])

  useEffect(() => {
    if (sse) {
      sse.onmessage = e => setMessage(e.data);
      sse.onerror = e => setError();
    }
  }, [sse])

  const signIn = async (login: SignInRequestType): Promise<AxiosResponse<AuthResponseType>> => {
    return getAuthApi().post<any, AxiosResponse<AuthResponseType>>('/api/auth', login)
      .then(data => {
        authSuccess(data.data)
        return data;
      });
  }

  async function signOut() {
    await api.get('/logout')
      .then(data => console.log(data))
      .catch((error: AxiosError) => console.error(error.response));
    destroyCookie({}, 'eventweb.token', { path: '/' })
    disconnectSSE(sse!);
    Router.push('/');
  }

  async function recoverAuth(token: string) {
    return await getAuthApi().post('/api/auth/recover', {
      token: token
    })
  }

  const authSuccess = async (auth: AuthResponseType) => {
    setCookie(undefined, 'eventweb.token', auth.token, {
      maxAge: 60 * 60, //30min
      path: '/'
    });
    setUser(auth.user);
    setToken(auth.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;

    setSSE(createConnectionSSE(auth.user.username!, auth.token));

    await Router.push('/organization/dashboard');
  }

  function clearAuth() {
    destroyCookie({}, 'eventweb.token', { path: '/' })
    setUser(DEFAULT_AUTH_RESPONSE.user);
    delete api.defaults.headers.common["Authorization"];
  }

  const setMessage = (msg: string) => {
    let data: GetNotification = JSON.parse(msg);
    console.log("msg", msg, "data", data);
    dispatch(setNotification(data));
    handleNotificationEvent(data);
  }

  const setError = () => {
    disconnectSSE(sse!);
  }

  const handleNotificationEvent = (notification: GetNotification) => {
    if (notification.instructions) {
      for (let event of notification.instructions) {
        switch (NotificationEvent[event] as NotificationEvent) {
          case NotificationEvent.RELOAD_ORGANIZATIONS:
            alert("Você foi adicionado a uma nova organização");
            dispatch(asyncOrganizations(user.id!));
            break;
        }
      }
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user, token }}>
      <LoadingState loading={loading} />
      {children}
    </AuthContext.Provider>
  )

}