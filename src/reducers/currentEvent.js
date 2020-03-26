import { FETCH_EVENT } from "../actions/events";

const initialState = [];

export default (state = initialState, action = []) => {
  switch (action.type) {
    case FETCH_EVENT:
      // console.log("What is the payload", action.payload);
      return action.payload;
    default:
      return state;
  }
};
