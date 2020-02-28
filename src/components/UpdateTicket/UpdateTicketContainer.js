import React, { Component } from "react";
import { connect } from "react-redux";
import UserTickets from "./UserTickets";
import UpdateTicketForm from "./UpdateTicketForm";
import { updateTicketDetails } from "../../actions/tickets";
class UpdateTicketContainer extends Component {
  state = {
    title: "",
    price: 0,
    picture: "",
    description: "",
    currentTicketId: undefined
  };

  setTicketState = ticket => {
    this.setState({
      title: ticket.title,
      price: ticket.price,
      picture: ticket.picture,
      description: ticket.description,
      currentTicketId: ticket.id
    });
  };

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
    this.props.dispatch(
      updateTicketDetails(this.state.currentTicketId, ticket)
    );
    this.setState({
      title: "",
      price: 0,
      picture: "",
      description: "",
      currentTicketId: undefined
    });
  };

  render() {
    return (
      <div>
        <UserTickets setTicketState={this.setTicketState} />
        {this.props.userLoggedIn ? (
          <UpdateTicketForm
            values={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <p>Login to modify your ticket</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.user.token !== null,
    currentUser: state.user,
    events: state.events.rows,
    tickets: state.tickets,
    currentEvent: state.currentEvent
  };
};

export default connect(mapStateToProps)(UpdateTicketContainer);
