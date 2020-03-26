import { FETCH_TICKETS, CREATE_TICKET } from "../actions/tickets";

const initialState = [];

export default (state = initialState, action = []) => {
  switch (action.type) {
    case FETCH_TICKETS:
      // console.log("What is the payload", action.payload);
      return action.payload;
    case CREATE_TICKET:
      return [...state, action.payload];
    default:
      return state;
  }
};
