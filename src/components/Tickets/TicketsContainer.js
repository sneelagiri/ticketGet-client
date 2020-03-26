import React, { Component } from "react";
import { connect } from "react-redux";
import Tickets from "./Tickets";
import TicketForm from "./TicketForm";
import { createTicket, fetchTickets } from "../../actions/tickets";
import { fetchEvent } from "../../actions/events";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
class TicketsContainer extends Component {
  state = {
    title: "",
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
      title: this.state.title,
      price: this.state.price,
      picture: this.state.picture,
      description: this.state.description
    };
    const userId = this.props.currentUser.currentUserId;

    const eventId = this.props.match.params.eventId;
    this.props.dispatch(createTicket(ticket, userId, eventId));
    this.setState({
      title: "",
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
        {this.props.tickets
          ? this.props.tickets.map(user => {
              if (user.id === this.props.currentUser.currentUserId) {
                if (user.tickets.length > 0) {
                  return (
                    <Link
                      key={uuidv4()}
                      to={`/${this.props.currentUser.currentUsername}/updateTickets`}
                    >
                      Modify your tickets
                    </Link>
                  );
                } else {
                  return null;
                }
              } else {
                return null;
              }
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.user.token !== null,
    currentUser: state.user,
    events: state.events.rows,
    tickets: state.ticket,
    currentEvent: state.currentEvent
  };
};

export default connect(mapStateToProps)(TicketsContainer);
