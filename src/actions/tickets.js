import axios from "axios";
const databaseUrl =
  "https://ticketget-server.herokuapp.com" || "http://localhost:4000";

export const FETCH_TICKETS = "FETCH_TICKETS";
export const CREATE_TICKET = "CREATE_TICKET";

export function fetchTicketsSuccess(tickets) {
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

export function createTicket(ticket, userId, eventId) {
  // console.log("What does the ticket look like?", ticket);
  return async function(dispatch, getState) {
    const token = getState().user.token;
    const response = await axios({
      method: "POST",
      url: `${databaseUrl}/ticket`,
      headers: {
        authorization: `Bearer ${token}`
      },
      data: {
        title: ticket.title,
        price: ticket.price,
        picture: ticket.picture,
        description: ticket.description,
        userId: userId,
        eventId: eventId
      }
    });
    dispatch(fetchTicketsSuccess(response.data));
  };
}

export function updateTicket(ticketId, risk) {
  // console.log("This is the Ticket ID and risk", ticketId, risk);
  return async function(dispatch, getState) {
    const token = getState().user.token;
    const response = await axios({
      method: "PUT",
      url: `${databaseUrl}/ticket/${parseInt(ticketId)}`,
      headers: {
        authorization: `Bearer ${token}`
      },
      data: {
        risk: risk
      }
    });
    dispatch(fetchTicketsSuccess(response.data));
  };
}

export function updateTicketDetails(ticketId, ticket) {
  return async function(dispatch, getState) {
    const token = getState().user.token;
    const response = await axios({
      method: "PUT",
      url: `${databaseUrl}/ticket/${parseInt(ticketId)}`,
      headers: {
        authorization: `Bearer ${token}`
      },
      data: {
        title: ticket.title,
        price: ticket.price,
        picture: ticket.picture,
        description: ticket.description
      }
    });
    dispatch(fetchTicketsSuccess(response.data));
  };
}
