import { FETCH_COMMENTS } from "../actions/comments";

const initialState = [];

export default (state = initialState, action = []) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      // console.log("What is the payload", action.payload);
      return action.payload;
    default:
      return state;
  }
};
