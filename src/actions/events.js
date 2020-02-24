import axios from "axios";
const databaseUrl = "http://localhost:4000";

export const FETCH_EVENTS = "FETCH_EVENTS";

function fetchEventsSuccess(events) {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
}

export function fetchEvents() {
  return async function(dispatch, getState) {
    const response = await axios.get(`${databaseUrl}/event`);
    dispatch(fetchEventsSuccess(response));
  };
}
