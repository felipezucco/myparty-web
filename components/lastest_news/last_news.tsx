import { useContext, useEffect } from "react";
import style from "./last_news.module.scss";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { AuthContext } from "../../contexts/AuthContext";
import { EventSourcePolyfill, MessageEvent } from 'event-source-polyfill';
import { setNotification, setNotificationList } from "../../src/store/user.store";
import { getNotificationsByUserId } from "../../services/api.notification";
import LastestNewsRow from "./component/lastest_news_row";

const LastNews = () => {

  // Context
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const ctx = useContext(AuthContext);

  /* Methods */

  useEffect(() => {
    if (ctx.user.id) {
      getNotificationsByUserId(ctx.user.id!).then(res => {
        dispatch(setNotificationList(res.data))
      });
    }
  }, [ctx.user.id]);

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