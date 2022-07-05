import { FC, useState } from "react";
import { NotificationType } from "../last_news";
import style from "./lastest_news_row.module.scss";

interface Props {
  data: NotificationType
}

const LastestNewsRow: FC<Props> = ({ data }) => {

  const [notification, setNotification] = useState<NotificationType>(data);

  const messageFormater = () => {
    let result: string = "";
    for (let idx = 0; idx < notification.attributes?.length!; idx++) {
      let data = notification.attributes![idx];
      result = notification.message?.replace(`{${idx}}`, data)!;
    }
    return result;
  }

  const getStyle = () => {
    return notification.visualized ? "row" : "row-not-viewed";
  }

  return (
    <li className={style[getStyle()]} key={notification.id} onClick={() => {
      setNotification({ ...notification, visualized: true })
    }}>
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