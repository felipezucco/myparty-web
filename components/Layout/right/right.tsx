import Profile from "../../profile/profile";
import Organization from "../../organizations/organization";
import style from "./right.module.scss";
import Card from "../../card/card";
import LastNews from "../../lastest_news/last_news";

const Right = () => {

  return (
    <div className={style['right-section']} >
      <div className={style["right-card-component"]}>
        <Profile />
        <Organization />
        <LastNews />
      </div>
    </div>
  )

}
export default Right;