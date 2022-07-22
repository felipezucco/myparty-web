import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { parseCookies } from 'nookies'
import getMenu, { EVENT_MENU, MenuEnum } from "../../../components/default";
import { useForm } from "react-hook-form";
import { PersistPromotion } from "../../../src/dto/promotion.dto";
import { persistPromotion } from "../../../services/api.promotion";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { useDispatch } from "react-redux";
import { asyncSetPromotions } from "../../../src/store/event.store";
import React from "react";

const NewPromotionPage = () => {

  // Context
  const controller = useAppSelector(state => state.controller);
  const event = useAppSelector(state => state.event);
  const dispatch = useAppDispatch();
  // Hook-Form
  const { register, setValue, getValues, handleSubmit } = useForm<PersistPromotion>();

  /* Methods */

  useEffect(() => {
    loadPromotions();
  }, [controller.selected_event.id]);

  const loadPromotions = () => {
    dispatch(asyncSetPromotions(controller.selected_event.id));
  }

  const promotionHandleSubmit = async () => {
    setValue("eventId", controller.selected_event.id);
    await persistPromotion(getValues())
      .then(res => {
        alert("Promotion Created");
        console.log("promotion", res.data);
        loadPromotions();
      }).catch(err => {
        console.error(err);
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(promotionHandleSubmit)}>
        <label htmlFor={"promotion_name"}>Name:</label>
        <input id={"promotion_name"} {...register("name")} /><br />
        <label htmlFor={"promotion_description"}>Description:</label>
        <input id={"promotion_description"} {...register("description")} /><br />
        <label htmlFor="startDate" >Start Date:</label>
        <input id="startDate" type={"datetime-local"} {...register("startDate")} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"></input><br />
        <label htmlFor="startDate" >End Date:</label>
        <input id="endDate" type={"datetime-local"} {...register("endDate")} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"></input><br />
        <button type={"submit"} >Create</button>
      </form>
    </div>
  );
}

NewPromotionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Promotions", MenuEnum.EVENT_MENU)}>
      {page}
    </LayoutComponent>
  )
}

export default NewPromotionPage;

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