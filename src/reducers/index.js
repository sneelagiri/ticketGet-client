import { combineReducers } from "redux";
import user from "./user";
import events from "./events";
import ticket from "./ticket";
export default combineReducers({ user, events, ticket });
