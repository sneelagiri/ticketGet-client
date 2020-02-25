import { FETCH_EVENTS, CREATE_EVENT } from "../actions/events";

const initialState = [];

export default (state = initialState, action = []) => {
  switch (action.type) {
    case FETCH_EVENTS:
      // console.log("What is the payload", action.payload);
      return action.payload;
    case CREATE_EVENT:
      return [...state, action.payload];
    default:
      return state;
  }
};
