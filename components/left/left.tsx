import Profile from "../right/profile/profile";
import Organization from "../right/organizations/organization";
import style from "./left.module.css";
import Card from "../card/card";
import OrganizationProfile from "./organization_profile/organization_profile";
import EventProfile from "./event_profile/event_profile";

const Left = () => {

  return (
    <section className={style['left-section']}>
      <Card>
        <EventProfile />
      </Card>
      <Card>
        <OrganizationProfile />
      </Card>
    </section>
  )

}
export default Left;