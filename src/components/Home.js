import React, { Component } from "react";
import EventContainer from "./Events/EventContainer";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to TicketGet!</h1>
        <EventContainer />
      </div>
    );
  }
}
