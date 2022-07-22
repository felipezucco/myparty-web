import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { parseCookies } from 'nookies'
import getMenu, { MenuEnum } from "../../../components/default";
import { useForm } from "react-hook-form";
import { persistPromotion } from "../../../services/api.promotion";
import { PersistPromotion } from "../../../src/dto/promotion.dto";
import { useAppSelector, useAppDispatch } from "../../../src/store/hooks";
import { PersistVisual } from "../../../src/dto/visual.dto";
import { persistVisual } from "../../../services/api.visual";
import { asyncSetVisuals } from "../../../src/store/event.store";
import Router from "next/router";

const VisualPage = () => {

  // Context
  const controller = useAppSelector(state => state.controller);
  const dispatch = useAppDispatch();
  // Hook-Form
  const { register, setValue, getValues, handleSubmit } = useForm<PersistVisual>();

  /* Methods */

  useEffect(() => {
    loadVisuals();
  }, [controller.selected_event.id]);

  const loadVisuals = () => {
    dispatch(asyncSetVisuals(controller.selected_event.id));
  }

  const visualHandleSubmit = async () => {
    setValue("eventId", controller.selected_event.id);
    await persistVisual(getValues())
      .then(res => {
        alert("Visual Created");
        Router.push("/event/visual")
      }).catch(err => {
        console.error(err);
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(visualHandleSubmit)}>
        <label htmlFor={"visual_name"}>Name:</label>
        <input id={"visual_name"} {...register("name")} /><br />
        <label htmlFor={"visual_description"}>Description:</label>
        <input id={"visual_description"} {...register("description")} /><br />
        <label htmlFor="visual_release_date" >Release Date:</label>
        <input id="visual_release_date" type={"datetime-local"} {...register("releaseDate")} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"></input><br />
        <label htmlFor={"visual_channel"}>Channel:</label>
        <input id={"visual_channel"} {...register("channel")} /><br />
        <label htmlFor={"visual_type"}>Type:</label>
        <input id={"visual_type"} {...register("type")} /><br />
        <label htmlFor={"visual_value"}>Cost:</label>
        <input type={"number"} id={"visual_value"} {...register("financial.value")} /><br />
        <button type={"submit"} >Create</button>
      </form>
    </div>
  );
}

VisualPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Visual", MenuEnum.EVENT_MENU)}>
      {page}
    </LayoutComponent>
  )
}

export default VisualPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { 'eventweb.token': token } = parseCookies(context);

  if (token) return { props: {} }
  else return {
    redirect: {
      destination: '/auth/invalid_auth',
      permanent: false
    }
  }
}