import { ReactElement, useEffect, useState } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { GetServerSideProps } from 'next'
import { parseCookies } from "nookies";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { asyncSetEvents, asyncSetTickets } from "../../../src/store/organization_ctx.store";
import { useForm } from "react-hook-form";
import { TicketBatchDTO, TicketDTO } from "../../../src/dto/ticket.dto";
import { deleteTicketBatchById, deleteTicketById, persistTicket } from "../../../services/api.ticket";
import { AxiosError } from "axios";
import getMenu from "../../../components/default";

const TicketComponent = () => {

  // context
  const organization_ctx = useAppSelector(state => state.organization_ctx);
  const dispatch = useAppDispatch();

  // hook-form
  const { register, getValues, handleSubmit, setValue } = useForm<TicketDTO>();
  const { register: ticketBatchRegister, getValues: ticketBatchGetValues, handleSubmit: ticketBatchHandleSubmit } = useForm<TicketBatchDTO>();

  // states
  const [firstTicket, setFirstTicket] = useState<number>(0);
  const [ticketQuantity, setTicketQuantity] = useState<number>(0);
  const [ticketBatchList, setTicketBatchList] = useState<TicketBatchDTO[]>([]);

  useEffect(() => {
    dispatch(asyncSetTickets(organization_ctx.selected_event.id!));
  }, [])

  const handleSubmitTicketBatchForm = () => {
    setTicketBatchList([...ticketBatchList, ticketBatchGetValues()]);
  }

  const handleSubmitTicketForm = async () => {
    setValue("event", organization_ctx.selected_event);
    setValue("batchs", ticketBatchList);

    await persistTicket(getValues()).then(res => {
      console.log("persistTicket", res);
      dispatch(asyncSetTickets(organization_ctx.selected_event.id!));
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
        {organization_ctx.tickets.map(ticket => {
          return (
            <li key={ticket.id}>{ticket.name} - {ticket.event?.name} -
              {ticket.batchs!.map(batch => {
                return (
                  <span key={batch.id}>
                    n: {batch.name} | price: {batch.price} | qntd: {batch.quantity} | n°: {batch.firstNumber}
                    <a onClick={() => {
                      deleteTicketBatchById(batch.id!).then(res =>
                        dispatch(asyncSetTickets(organization_ctx.selected_event.id!))
                      ).catch((err: AxiosError) => console.error(err))
                    }}>Deletar</a>
                  </span>
                )
              })}
              <a onClick={() => {
                deleteTicketById(ticket.id!).then(res =>
                  dispatch(asyncSetTickets(organization_ctx.selected_event.id!))
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
        <label>Event: {organization_ctx.selected_event.name}</label><br />
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

TicketComponent.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Events")}>
      {page}
    </LayoutComponent>
  )
}

export default TicketComponent;

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