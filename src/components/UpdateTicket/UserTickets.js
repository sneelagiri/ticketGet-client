import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import "./updateTickets.css";

class UserTickets extends Component {
  render() {
    let ticketCount = 0;
    let tickets = [];
    if (this.props.tickets) {
      this.props.tickets.map(user => {
        if (user.id === this.props.currentUser.currentUserId) {
          if (user.tickets.length > 0) {
            user.tickets.map(ticket => {
              ticketCount++;
              tickets.push(ticket);
            });
          } else {
            return user;
          }
        } else {
          return user;
        }
      });
    }
    // console.log(tickets);
    return (
      <div>
        <h1>Your Tickets</h1>
        {tickets.length > 0 ? (
          <Table
            striped
            bordered
            hover
            variant="dark"
            responsive
            className="ticketsTable"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Ticket Picture URL</th>
                <th>Risk</th>
                <th>Modify Ticket</th>
              </tr>
            </thead>
            <tbody>
              {this.props.tickets.map(user => {
                if (
                  parseInt(user.id) ===
                  parseInt(this.props.currentUser.currentUserId)
                ) {
                  return user.tickets.map(ticket => {
                    return (
                      <tr key={uuidv4()}>
                        <td>{ticketCount}</td>
                        <td>{ticket.title}</td>
                        <td>€{ticket.price}</td>
                        <td>{ticket.description}</td>
                        <td>{ticket.picture}</td>
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
                          <Button
                            variant="secondary"
                            onClick={() => {
                              this.props.setTicketState(ticket);
                            }}
                          >
                            Modify this ticket
                          </Button>
                        </td>
                      </tr>
                    );
                  });
                } else {
                  return null;
                }
              })}
            </tbody>
          </Table>
        ) : (
          <h2>No tickets available to modify</h2>
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

export default connect(mapStateToProps)(UserTickets);
