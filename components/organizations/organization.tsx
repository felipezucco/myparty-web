import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getOrganizerRule } from "../../models/organizations";
import AddIcon from '@mui/icons-material/Add';
import style from "./organization.module.scss";
import OrganizationForm from "../Content/Form/Organization";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { setStatus, asyncOrganizations } from "../../src/store/user.store";
import { GetOrganization, GetOrganizerWithOrganization } from "../../src/dto/organization.dto";
import { asyncSetOrganization } from "../../src/store/controller.store";

const Organization = () => {

  // Context
  const ctx = useContext(AuthContext);
  const user = useAppSelector((state) => state.user);
  const controller = useAppSelector((state) => state.controller);
  const dispatch = useAppDispatch();
  // State
  const [organizations, setOrganizations] = useState<GetOrganizerWithOrganization[]>([] as GetOrganizerWithOrganization[]);

  /* Methods */

  useEffect(() => {
    dispatch(asyncOrganizations(ctx.user.id!));
  }, [])

  useEffect(() => {
    if (user.organizations && user.organizations.length > 0) {
      let organizationSorted = [...user.organizations];
      organizationSorted.sort(a => a.organization?.id === controller.selected_organization.id ? -1 : 1);
      setOrganizations(organizationSorted);
    }
  }, [user.organizations, controller.selected_organization.id])

  const HeaderComponent = () => {
    return (
      <div className={style["card-header-component"]}>
        <span className={style["title"]}>Organization</span>
        <span className={style["icon"]} onClick={() => dispatch(setStatus(true))}>
          <AddIcon />
        </span>
      </div>
    )
  }

  const OrganizationListComponent = () => {

    const isSelectedOrganization = (id: number) => controller.selected_organization.id === id;
    const getSelectedOrganizationClass = (id: number) => isSelectedOrganization(id) ? "organization-selected" : "organization";

    return (
      <ul className={style["organization-list-component"]}>
        {organizations.map(userOrganization => {
          return (
            <li key={userOrganization.organization?.id}
              className={style[getSelectedOrganizationClass(userOrganization.organization?.id!)]}
              onClick={() => dispatch(asyncSetOrganization(userOrganization.organization?.id!))}>
              <div className={style["info-content"]}>
                <span className={style["info-content-name"]}>{userOrganization.organization?.id!} - {userOrganization.organization?.name}</span>
                <span className={style["info-content-qualifier"]}>{getOrganizerRule(userOrganization.role!)}</span>
                <span className={style["info-content-information"]}>{userOrganization.organization?.organizers?.length} organizers </span>
              </div>
              <img className={style["img"]} src={"/cute-monkey-sitting-banana_138676-3305.webp"} width={50} height={50} />
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className={style["organization-section"]}>
      <HeaderComponent />
      <OrganizationListComponent />
      <OrganizationForm />
    </div>
  )
}

export default Organization;