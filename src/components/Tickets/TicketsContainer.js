import React, { Component } from "react";
import Tickets from "./Tickets";
import TicketForm from "./TicketForm";
export default class TicketsContainer extends Component {
  state = {
    price: 0,
    picture: "",
    description: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    // this.props.dispatch(createEvent(newEvent));
    this.setState({
      price: 0,
      picture: "",
      description: ""
    });
  };

  render() {
    return (
      <div>
        Here are all the tickets for the selected event:
        <Tickets />
        <TicketForm
          values={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
