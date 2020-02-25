import React, { Component } from "react";
import { connect } from "react-redux";
import Tickets from "./Tickets";
import TicketForm from "./TicketForm";
import { createTicket } from "../../actions/tickets";

class TicketsContainer extends Component {
  state = {
    price: 0,
    picture: "",
    description: ""
  };
  componentDidMount() {
    // console.log(this.props.match.params);
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

const mapStateToProps = state => {
  return {
    userLoggedIn: state.user.token !== null,
    currentUser: state.user,
    events: state.events
  };
};

export default connect(mapStateToProps)(TicketsContainer);
