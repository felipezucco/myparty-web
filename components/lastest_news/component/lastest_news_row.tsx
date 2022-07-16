import { FC, useState } from "react";
import { setNotificationSeen } from "../../../services/api.notification";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { setNotification, updateNotification } from "../../../src/store/profile_ctx.store";
import { GetNotification } from "../last_news";
import style from "./lastest_news_row.module.scss";

interface Props {
  notification: GetNotification
}

const LastestNewsRow: FC<Props> = ({ notification }) => {

  // context
  const profile_ctx = useAppSelector(status => status.profile_ctx);
  const dispatch = useAppDispatch();

  // style
  const getStyle = () => {
    return notification?.visualized ? "row" : "row-not-viewed"
  };

  const messageFormater = () => {
    let result: string = notification.message!;
    for (let idx = 0; idx < notification.attributes?.length!; idx++) {
      let data = notification.attributes![idx];
      result = result.replace(`{${idx}}`, data)!;
    }
    return result;
  }

  const onClickHandle = async () => {
    if (!notification.visualized) {
      await setNotificationSeen(notification.id!)
        .then(res => {
          if (res.data) {
            dispatch(updateNotification({ ...notification, visualized: true }))
          }
        });
    }
  }

  return (
    <li className={style[getStyle()]} key={notification.id} onClick={onClickHandle}>
      <div className={style["avatar"]} />
      <div className={style["info-content"]}>
        <span className={style["info-content-message"]}>{messageFormater()}</span>
        <span className={style["info-content-organization"]}>{notification.organization}</span>
        <span className={style["info-content-date-time"]}>{notification.date}</span>
      </div>
    </li>
  )
}
export default LastestNewsRow;