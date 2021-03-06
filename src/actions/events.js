import axios from "axios";
const databaseUrl =
  "https://ticketget-server.herokuapp.com" || "http://localhost:4000";

export const FETCH_EVENT = "FETCH_EVENT";
export const FETCH_EVENTS = "FETCH_EVENTS";
export const CREATE_EVENT = "CREATE_EVENT";

function fetchEventsSuccess(events) {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
}

export function fetchEvents(page) {
  return async function(dispatch, getState) {
    const response = await axios.post(`${databaseUrl}/events`, {
      page: page
    });
    // console.log("what is the response", response);
    dispatch(fetchEventsSuccess(response.data));
  };
}

function fetchEventSuccess(event) {
  return {
    type: FETCH_EVENT,
    payload: event
  };
}

export function fetchEvent(eventId) {
  // console.log("IS THE EVENT ID GETTING HERE?", eventId);
  return async function(dispatch, getState) {
    const response = await axios.post(`${databaseUrl}/eventName`, {
      eventId: eventId
    });
    // console.log("what is the response", response);
    dispatch(fetchEventSuccess(response.data));
  };
}

export function createEvent(event, page) {
  // console.log(event);

  return async function(dispatch, getState) {
    const token = getState().user.token;
    const response = await axios({
      method: "POST",
      url: `${databaseUrl}/event`,
      headers: {
        authorization: `Bearer ${token}`
      },
      data: {
        name: event.name,
        description: event.description,
        eventPicture: event.picture,
        startDate: event.startDate,
        endDate: event.endDate,
        page: page
      }
    });

    dispatch(fetchEventsSuccess(response.data));
  };
}
