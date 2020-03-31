import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "./tickets.css";
import { v4 as uuidv4 } from "uuid";
class Tickets extends Component {
  render() {
    let ticketCount = 0;
    let tickets = [];
    if (this.props.tickets) {
      this.props.tickets.forEach(user => {
        if (user.tickets.length > 0) {
          return user.tickets.forEach(ticket => {
            if (ticket.eventId === parseInt(this.props.eventId)) {
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
          <Table
            striped
            hover
            variant="dark"
            responsive
            bordered
            className="ticketsTable"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Seller Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Risk</th>
                <th>Ticket Page</th>
              </tr>
            </thead>
            <tbody>
              {this.props.tickets.forEach(user => {
                return user.tickets.forEach(ticket => {
                  if (ticket.eventId === parseInt(this.props.eventId)) {
                    ticketCount++;
                    return (
                      <tr key={uuidv4()}>
                        <td>{ticketCount}</td>
                        <td>{ticket.title}</td>
                        {user.firstName && user.lastName ? (
                          <td>
                            {user.firstName} {user.lastName}
                          </td>
                        ) : (
                          <td>{user.username}</td>
                        )}
                        <td>€{ticket.price}</td>
                        <td>{ticket.description}</td>
                        {ticket.risk <= 5 ? (
                          <td className="safe">5%</td>
                        ) : ticket.risk >= 95 ? (
                          <td className="danger">95%</td>
                        ) : ticket.risk > 5 && ticket.risk <= 35 ? (
                          <td className="safe">{ticket.risk}%</td>
                        ) : ticket.risk > 35 && ticket.risk <= 75 ? (
                          <td className="moderate">{ticket.risk}%</td>
                        ) : (
                          <td className="danger">{ticket.risk}%</td>
                        )}

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
    events: state.events.rows,
    tickets: state.ticket
  };
};

export default connect(mapStateToProps)(Tickets);
