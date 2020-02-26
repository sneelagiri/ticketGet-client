import { combineReducers } from "redux";
import user from "./user";
import events from "./events";
import currentEvent from "./currentEvent";
import ticket from "./ticket";
import comments from "./comments";
export default combineReducers({
  user,
  events,
  currentEvent,
  ticket,
  comments
});
