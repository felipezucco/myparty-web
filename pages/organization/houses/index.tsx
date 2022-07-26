import { useEffect, ReactElement } from "react";
import LayoutComponent from "../../../components/layout/layout";
import getMenu from "../../../components/default";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { asyncSetHouses } from "../../../src/store/organization.store";
import HousesView from "../../../components/house/houses_view/houses_view";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";


const HousePage = () => {

  // Contexts
  const controller = useAppSelector(state => state.controller);
  const organization = useAppSelector(state => state.organization);
  const dispatch = useAppDispatch();

  /* Methods */

  useEffect(() => {
    dispatch(asyncSetHouses(controller.selected_organization.id!));
  }, [controller.selected_organization])

  return (
    <div>
      <HousesView houses={organization.houses} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { 'eventweb.token': token } = parseCookies(context);

  if (token) return { props: {} }
  else return {
    redirect: {
      destination: '',
      permanent: false
    }
  }
}