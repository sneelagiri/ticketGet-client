import axios from "axios";
const databaseUrl = "http://localhost:4000";

export const FETCH_TICKETS = "FETCH_TICKETS";
export const CREATE_TICKET = "CREATE_TICKET";

function fetchTicketsSuccess(tickets) {
  return {
    type: FETCH_TICKETS,
    payload: tickets
  };
}

export function fetchTickets() {
  return async function(dispatch, getState) {
    const response = await axios.get(`${databaseUrl}/ticket`);
    // console.log("what is the response", response);
    dispatch(fetchTicketsSuccess(response.data));
  };
}

function createTicketSuccess(ticket) {
  return {
    type: CREATE_TICKET,
    payload: ticket
  };
}

export function createTicket(ticket, userId, eventId) {
  // console.log(event);
  return async function(dispatch, getState) {
    const response = await axios.post(`${databaseUrl}/ticket`, {
      price: ticket.price,
      description: ticket.description,
      picture: ticket.picture,
      userId: userId,
      eventId: eventId
    });
    // console.log(response);
    dispatch(createTicketSuccess(response.data));
  };
}
