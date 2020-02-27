import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
class Tickets extends Component {
  render() {
    let ticketCount = 0;
    let tickets = [];
    if (this.props.tickets) {
      this.props.tickets.map(user => {
        if (user.tickets.length > 0) {
          return user.tickets.map(ticket => {
            if (ticket.eventId == this.props.eventId) {
              tickets.push(ticket);
              return ticket;
            } else {
              return ticket;
            }
          });
        } else {
          return user;
        }
      });
    }
    // console.log(tickets);
    return (
      <div>
        {tickets.length > 0 ? (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Seller Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Ticket Page</th>
              </tr>
            </thead>
            <tbody>
              {this.props.tickets.map(user => {
                return user.tickets.map(ticket => {
                  if (ticket.eventId == this.props.eventId) {
                    ticketCount++;
                    return (
                      <tr>
                        <td>{ticketCount}</td>
                        {user.firstName && user.lastName ? (
                          <td>
                            {user.firstName} {user.lastName}
                          </td>
                        ) : (
                          <td>{user.username}</td>
                        )}
                        <td>€{ticket.price}</td>
                        <td>{ticket.description}</td>
                        <td>
                          <Link
                            to={`/${this.props.eventId}/tickets/${user.username}/${ticket.id}`}
                          >{`Go to ticket`}</Link>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                });
              })}
            </tbody>
          </Table>
        ) : (
          <h2>No tickets available for the event</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("THIS IS THE STATE", state);
  return {
    userLoggedIn: state.user.token !== null,
    currentUser: state.user,
    events: state.events,
    tickets: state.ticket
  };
};

export default connect(mapStateToProps)(Tickets);
