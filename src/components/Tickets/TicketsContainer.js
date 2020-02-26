import React, { Component } from "react";
import { connect } from "react-redux";
import Tickets from "./Tickets";
import TicketForm from "./TicketForm";
import { createTicket, fetchTickets } from "../../actions/tickets";
import { fetchEvent } from "../../actions/events";
class TicketsContainer extends Component {
  state = {
    price: 0,
    picture: "",
    description: ""
  };
  componentDidMount() {
    // console.log(this.props.match.params);
    this.props.dispatch(fetchTickets());
    this.props.dispatch(fetchEvent(this.props.match.params.eventId));
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const ticket = {
      price: this.state.price,
      picture: this.state.picture,
      description: this.state.description
    };
    const userId = this.props.currentUser.currentUserId;

    const eventId = this.props.match.params.eventId;
    this.props.dispatch(createTicket(ticket, userId, eventId));
    this.setState({
      price: 0,
      picture: "",
      description: ""
    });
  };

  render() {
    return (
      <div>
        <h1>Event: {this.props.currentEvent.name}</h1>
        <Tickets eventId={this.props.match.params.eventId} />
        {this.props.userLoggedIn ? (
          <TicketForm
            values={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <p>Login to sell your ticket</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.user.token !== null,
    currentUser: state.user,
    events: state.events,
    tickets: state.tickets,
    currentEvent: state.currentEvent
  };
};

export default connect(mapStateToProps)(TicketsContainer);
