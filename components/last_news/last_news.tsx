import style from "./last_news.module.scss";

const LastNews = () => {

  const HeaderComponent = () => {
    return (
      <div className={style["card-header-component"]}>
        <span className={style["title"]}>Last News</span>
      </div>
    )
  }

  const MessageComponent = () => {
    return (
      <>
        {data.map(msg => {
          return (
            <li className={style["row"]} key={msg.id}>
              <img src={"/ex-download_d7a56c55fad58257615e3c7dd14c7ee2.png"} className={style["avatar"]} />
              <div className={style["info-content"]}>
                <span className={style["info-content-message"]}>{msg.msg}</span>
                <span className={style["info-content-organization"]}>{msg.organization}</span>
                <span className={style["info-content-date-time"]}>{new Date().toLocaleString()}</span>
              </div>
            </li>
          )
        })}
      </>
    )
  }

  return (
    <div>
      <HeaderComponent />
      <ul className={style["last-news-component"]}>
        <MessageComponent />
      </ul>
    </div>
  )
}

export default LastNews;

const data = [
  { id: 1, msg: "Joana criou um novo evento", organization: "Tendel FC" },
  { id: 1, msg: "Marcelo deu baixa nas finanças", organization: "Tendel FC" },
  { id: 1, msg: "Pedro criou um novo ticket", organization: "Tendel FC" },
]