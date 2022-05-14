import Profile from "./profile/profile";
import Organization from "./organizations/organization";
import style from "./right.module.css";
import Card from "../card/card";
import LastNews from "./last_news/last_news";

const Right = () => {

  return (
    <div className={style['right-section']} >
      <Card >
        <Profile />
        <Organization />
        <LastNews />
      </Card>
    </div>
  )

}
export default Right;