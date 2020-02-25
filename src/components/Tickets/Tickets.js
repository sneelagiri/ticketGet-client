import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
class Tickets extends Component {
  render() {
    let ticketCount = 0;
    return (
      <div>
        {this.props.tickets.length > 0 ? (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Seller Name</th>
                <th>Price</th>
                <th>Description</th>
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
                        <td>
                          {user.firstName} {user.lastName}
                        </td>
                        <td>€{ticket.price}</td>
                        <td>{ticket.description}</td>
                      </tr>
                    );
                  } else {
                    return <h2>No tickets for this event</h2>;
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
