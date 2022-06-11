import Profile from "../../profile/profile";
import Organization from "../../organizations/organization";
import style from "./left.module.scss";
import OrganizationProfile from "../../organization_profile/organization_profile";
import EventProfile from "../../event_profile/event_profile";
import Card from "../../card/card";

const Left = () => {

  return (
    <section className={style['left-section']}>
      <EventProfile />
      <Card>
        <OrganizationProfile />
      </Card>
    </section>
  )

}
export default Left;