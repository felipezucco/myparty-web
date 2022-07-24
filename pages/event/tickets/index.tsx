import { ReactElement, useEffect, useState } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { GetServerSideProps } from 'next'
import { parseCookies } from "nookies";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { useForm } from "react-hook-form";
import { GetTicketBatch, GetTicket, PersistTicket, PersistTicketBatch } from "../../../src/dto/ticket.dto";
import { removeTicketBatchById, removeTicketById, persistTicket } from "../../../services/api.ticket";
import { AxiosError } from "axios";
import getMenu from "../../../components/default";
import { asyncSetTickets } from "../../../src/store/event.store";

const TicketPage = () => {

  // Context  
  const controller = useAppSelector(state => state.controller);
  const event = useAppSelector(state => state.event);
  const dispatch = useAppDispatch();
  // Hook-Form
  const { register, getValues, handleSubmit, setValue } = useForm<PersistTicket>();
  const { register: ticketBatchRegister, getValues: ticketBatchGetValues, handleSubmit: ticketBatchHandleSubmit } = useForm<PersistTicketBatch>();
  // States
  const [firstTicket, setFirstTicket] = useState<number>(0);
  const [ticketQuantity, setTicketQuantity] = useState<number>(0);
  const [ticketBatchList, setTicketBatchList] = useState<PersistTicketBatch[]>([]);

  /* Methods */

  useEffect(() => {
    dispatch(asyncSetTickets(controller.selected_event.id));
  }, [controller.selected_event.id])

  const handleSubmitTicketBatchForm = () => {
    setTicketBatchList([...ticketBatchList, ticketBatchGetValues()]);
  }

  const handleSubmitTicketForm = async () => {
    setValue("batchs", ticketBatchList);
    await persistTicket(getValues()).then(res => {
      dispatch(asyncSetTickets(controller.selected_event.id!));
    })
  }

  const TicketBatchListComponent = () => {
    return (
      <ul>
        {ticketBatchList.map((tb, idx) => {
          return <li key={idx}>{tb.name} | R${tb.price} | {tb.quantity} un. | 1°: {tb.firstNumber}</li>
        })}
      </ul>
    )
  }

  const TicketListComponent = () => {
    return (
      <ul>
        {event.tickets.map(ticket => {
          return (
            <li key={ticket.id}>{ticket.name} - {ticket.event?.name} -
              {ticket.batchs!.map(batch => {
                return (
                  <span key={batch.id}>
                    n: {batch.name} | price: {batch.price} | qntd: {batch.quantity} | n°: {batch.firstNumber}
                    <a onClick={() => {
                      removeTicketBatchById(batch.id!).then(res =>
                        dispatch(asyncSetTickets(controller.selected_event.id!))
                      ).catch((err: AxiosError) => console.error(err))
                    }}>Deletar</a>
                  </span>
                )
              })}
              <a onClick={() => {
                removeTicketById(ticket.id!).then(res =>
                  dispatch(asyncSetTickets(controller.selected_event.id!))
                ).catch((err: AxiosError) => console.error(err))
              }}>/Deletar Ticket</a>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div>
      <h1>Ticket</h1>
      <form onSubmit={handleSubmit(handleSubmitTicketForm)}>
        <label htmlFor={"ticket_name"}>Name:</label>
        <input id={"ticket_name"} {...register("name")} /><br />
        <label>Event: {controller.selected_event.name}</label><br />
        <input type={"hidden"} {...register("eventId")} value={controller.selected_event.id!} />
        <button type={"submit"}>Submit</button>
      </form>
      <h3>Ticket Batchs</h3>
      <form onSubmit={ticketBatchHandleSubmit(handleSubmitTicketBatchForm)}>
        <label htmlFor={"ticket_batch_name"}>Name:</label>
        <input id={"ticket_batch_name"} {...ticketBatchRegister("name")} /><br />
        <label htmlFor={"ticket_batch_quantity"}>Quantity:</label>
        <input id={"ticket_batch_quantity"} {...ticketBatchRegister("quantity")} type={"number"}
          onChange={e => setTicketQuantity(Number.parseInt(e.target.value))} /><br />
        <label htmlFor={"ticket_batch_price"}>Price:</label>
        <input id={"ticket_batch_price"} {...ticketBatchRegister("price")} type={"number"} /><br />
        <label htmlFor={"ticket_batch_first"}>First number:</label>
        <input id={"ticket_batch_first"} {...ticketBatchRegister("firstNumber")}
          type={"number"} onChange={e => setFirstTicket(Number.parseInt(e.target.value))} /><br />
        <label htmlFor={"ticket_batch_name"}>Last number: {firstTicket + ticketQuantity - 1}</label><br />
        <button type={"submit"}>Criar</button>
      </form>
      <TicketBatchListComponent />
      <h1>Tickets</h1>
      <TicketListComponent />
    </div>
  );
}

TicketPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Events")}>
      {page}
    </LayoutComponent>
  )
}

export default TicketPage;

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