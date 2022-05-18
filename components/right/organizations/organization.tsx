import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AuthContext, UserDTO } from "../../../contexts/AuthContext";
import { getOrganizerRule } from "../../../models/organizations";
import { OrganizerView } from "../../../src/dto/organization.dto";
import AddIcon from '@mui/icons-material/Add';
import style from "./organization.module.css";
import OrganizationForm from "../../Content/Form/Organization";
import { DialogInterface } from "../../../src/interface/DialogInterface";
import { RootState } from "../../../src/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { setStatus, asyncOrganizations } from "../../../src/store/profile_ctx.store";
import { asyncSetOrganization } from "../../../src/store/organization_ctx.store";

const Organization = () => {

  const ctx = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const organization = useAppSelector((state) => state.profile_ctx);
  const global = useAppSelector((state) => state.organization_ctx);

  useEffect(() => {
    if (ctx.user)
      dispatch(asyncOrganizations(ctx.user));
  }, [])

  const HeaderComponent = () => {
    return (
      <div className={"title-component"}>
        <span>Organization</span>
        <span onClick={() => dispatch(setStatus(true))}>
          <AddIcon />
        </span>
      </div>
    )
  }

  const OrganizationListComponent = () => {
    return (
      <ul className={style["organization-list-component"]}>
        {organization.organizations.map(userOrganization => {
          return (
            <li key={userOrganization.id} className={style["organization"]} onClick={() => dispatch(asyncSetOrganization(userOrganization.organization?.id))}>
              <span className={style["name"]}>{userOrganization.organization?.name}</span>
              <span className={style["qualifier"]}>{getOrganizerRule(userOrganization.role)}</span>
              <span className={style["information"]}>{userOrganization.organization?.organizers?.length} organizers </span>
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