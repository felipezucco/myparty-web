import { useEffect, ReactElement } from "react";
import LayoutComponent from "../../../components/layout/layout";
import getMenu from "../../../components/default";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { asyncSetHouses } from "../../../src/store/organization_ctx.store";
import HousesView from "../../../components/house/houses_view/houses_view";


const HousePage = () => {

  // Contexts
  const organization_ctx = useAppSelector(state => state.organization_ctx);
  const dispatch = useAppDispatch();
  // States
  // Hook-Form

  /* Methods */

  useEffect(() => {
    dispatch(asyncSetHouses(organization_ctx.selected_organization.id!));
  }, [organization_ctx.selected_organization])

  return (
    <div>
      <HousesView houses={organization_ctx.houses} />
    </div>
  )
}
export default HousePage;

HousePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Houses")}>
      {page}
    </LayoutComponent>
  )
}