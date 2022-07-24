import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { parseCookies } from 'nookies'
import getMenu, { MenuEnum } from "../../../components/default";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { useForm } from "react-hook-form";
import { PersistAction, PersistActionLink } from "../../../src/dto/action.dto";
import { persistAction } from "../../../services/api.action";
import Router from "next/router";
import { asyncSetProductions, asyncSetPromotions, asyncSetVisuals } from "../../../src/store/event.store";

const NewActionPage = () => {

  // Context
  const event = useAppSelector(state => state.event);
  const controller = useAppSelector(state => state.controller);
  const dispatch = useAppDispatch();
  // Hook-Form
  const { setValue, getValues, register, handleSubmit } = useForm<PersistAction>();

  /* Methods */

  useEffect(() => {
    loadResources();
  }, [controller.selected_event.id])

  const loadResources = () => {
    dispatch(asyncSetPromotions(controller.selected_event.id));
    dispatch(asyncSetProductions(controller.selected_event.id));
    dispatch(asyncSetVisuals(controller.selected_event.id));
  }

  const actionHandleSubmit = async () => {
    setValue("eventId", controller.selected_event.id);

    await persistAction(getValues())
      .then(res => {
        alert("Action created");
        Router.push("/event/actions");
      }).catch(err => {
        console.error(err);
      })
  }

  const ProductionSelect = () => {
    return (
      <>
        <label>Production:</label><br />
        <select onChange={(e) => setValue("actionLink.productionId", Number.parseInt(e.currentTarget.value))}>
          <option selected value={-1}>Select Production</option>
          {event.productions.map(prod => {
            return <option value={prod.id} key={prod.id}>{prod.name}</option>
          })}
        </select><br />
      </>
    )
  }

  const PromotionSelect = () => {
    return (
      <>
        <label>Promotion:</label><br />
        <select onChange={(e) => setValue("actionLink.promotionId", Number.parseInt(e.currentTarget.value))}>
          <option selected value={-1}>Select Production</option>
          {event.promotions.map(promotion => {
            return <option value={promotion.id} key={promotion.id}>{promotion.name}</option>
          })}
        </select><br />
      </>
    )
  }

  const VisualSelect = () => {
    return (
      <>
        <label>Visual:</label><br />
        <select onChange={(e) => setValue("actionLink.visualId", Number.parseInt(e.currentTarget.value))}>
          <option selected value={-1}>Select Visual</option>
          {event.visuals.map(visual => {
            return <option value={visual.id} key={visual.id}>{visual.name}</option>
          })}
        </select><br />
      </>
    )
  }

  const OrganizersSelect = () => {
    return (
      <>
        <label>Organizers:</label><br />
        <select onChange={(e) => setValue("organizersId", [Number.parseInt(e.currentTarget.value)])}>
          {controller.selected_organization.organizers.map(organizer => {
            return <option value={organizer.id} key={organizer.id}>{organizer.user.username}</option>
          })}
        </select><br />
      </>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(actionHandleSubmit)}>
        <label htmlFor="action_name">Name</label>
        <input id="action_name" type={"text"} {...register("name")}></input><br />
        <label htmlFor="action_start_date">Start Date:</label>
        <input id="action_start_date" type={"datetime-local"} {...register("startDate")} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"></input><br />
        <label htmlFor="action_end_date">End Date:</label>
        <input id="action_end_date" type={"datetime-local"} {...register("endDate")} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"></input><br />
        <ProductionSelect />
        <PromotionSelect />
        <VisualSelect />
        <OrganizersSelect />
        <button type={"submit"}>Create</button>
        <button type={"reset"}>Reset</button>
      </form>
    </>
  );
}

NewActionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Actions", MenuEnum.EVENT_MENU)}>
      {page}
    </LayoutComponent>
  )
}

export default NewActionPage;

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