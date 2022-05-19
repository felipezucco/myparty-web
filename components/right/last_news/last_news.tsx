import style from "./last_news.module.css";

const LastNews = () => {

  const HeaderComponent = () => {
    return (
      <div className={"title-component"}>
        <span>Last News</span>
      </div>
    )
  }

  const MessageComponent = () => {
    return (
      <>
        {data.map(msg => {
          return (
            <li className={style["row"]} key={msg.id}>
              <img src={"./cute-monkey-sitting-banana_138676-3305.webp"} className={style["avatar"]} />
              <span className={style["message"]}>{msg.msg}</span>
              <span className={style["organization"]}>{msg.organization}</span>
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