import { useContext, useEffect, useState } from "react";
import style from "./last_news.module.scss";
import Stomp from "stompjs";
import cluster from "cluster";
import useWebSocket, { ReadyState, useEventSource } from 'react-use-websocket';
import { StompSessionProvider, useSubscription } from "react-stomp-hooks";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { AuthContext } from "../../contexts/AuthContext";
import { EventSourcePolyfill, MessageEvent } from 'event-source-polyfill';
import api from "../../services/api";
import { setNotification, setNotificationList } from "../../src/store/user.store";
import { getNotificationsByUserId } from "../../services/api.notification";
import LastestNewsRow from "./component/lastest_news_row";

export interface GetNotification {
  id: number,
  message: string,
  organization: string,
  date: string,
  visualized: boolean,
  user: string,
  attributes: []
}

const LastNews = () => {

  // Context
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const ctx = useContext(AuthContext);

  /* Methods */

  useEffect(() => {
    getNotificationsByUserId(ctx.user.id!).then(res => {
      console.log(res.data)
      dispatch(setNotificationList(res.data))
    });

    const sse = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_MYPARTY_API}/api/notification/sse/${ctx.user.username}`, {
      headers: {
        'Authorization': `Bearer ${ctx.token}`
      },
      heartbeatTimeout: 60 * 60 * 1000
    });
    sse.onopen = e => console.log("conectou", e);
    sse.onmessage = (e) => getNotificationSent(e);
    sse.onerror = (e) => {
      console.error("erro no brinquedo", e)
    };
    return () => {
      console.log("terminou no return")
      sse.close();
    };
  }, []);

  const getNotificationSent = (e: MessageEvent) => {
    let data: GetNotification = JSON.parse(e.data);
    dispatch(setNotification(data));
  }

  const HeaderComponent = () => {
    return (
      <div className={style["card-header-component"]}>
        <span className={style["title"]}>Notifications</span>
      </div>
    )
  }

  const MessageComponent = () => {

    const Messages = () => {
      return (
        <ul className={style["last-news-component"]}>
          {user.notifications.map((notification) => {
            return <LastestNewsRow notification={notification} key={notification.id} />
          })}
        </ul>
      )
    }

    return (
      <Messages />
    )
  }

  return (
    <div>
      <HeaderComponent />
      <MessageComponent />
    </div>
  )
}

export default LastNews;