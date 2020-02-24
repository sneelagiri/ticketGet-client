import React, { Component } from "react";
import { connect } from "react-redux";
import Events from "./Events";
import EventForm from "./EventForm";

const url = "http://localhost:4000";
export default class EventContainer extends Component {
  state = {
    events: [],
    event: {
      name: "",
      description: ""
    }
  };

  componentDidMount() {}
  render() {
    return (
      <div>
        <h1>Events</h1>
        <Events />
        <EventForm />
      </div>
    );
  }
}
