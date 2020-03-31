import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import "./tickets.css";
import Comments from "./Comments";
import { updateTicket } from "../../actions/tickets";
import { v4 as uuidv4 } from "uuid";

class TicketDetails extends Component {
  render() {
    const minRisk = 5;
    const maxRisk = 95;
    return (
      <div>
        {this.props.tickets.map(user => {
          if (
            user.username === parseInt(this.props.match.params.username) &&
            user.firstName &&
            user.lastName
          ) {
            return (
              <h1>
                Ticket from {user.firstName} {user.lastName}
              </h1>
            );
          } else if (
            user.username === parseInt(this.props.match.params.username)
          ) {
            return <h1>Ticket from {user.username}</h1>;
          } else {
            return null;
          }
        })}

        {this.props.tickets.map(user => {
          return user.tickets.map(ticket => {
            if (ticket.id === parseInt(this.props.match.params.ticketId)) {
              const risk = ticket.risk;
              return (
                <div className="ticketDiv" key={uuidv4()}>
                  {risk <= 5 ? (
                    <h2 className="safe">Risk: {minRisk}%</h2>
                  ) : risk >= 95 ? (
                    <h2 className="danger">Risk: {maxRisk}%</h2>
                  ) : risk > 5 && risk <= 35 ? (
                    <h2 className="safe">Risk: {risk}%</h2>
                  ) : risk > 35 && risk <= 75 ? (
                    <h2 className="moderate">Risk: {risk}%</h2>
                  ) : (
                    <h2 className="danger">Risk: {risk}%</h2>
                  )}
                  <h2>
                    <b>Price: €{ticket.price}</b>
                  </h2>
                  <div>
                    <Image
                      src={ticket.picture}
                      className="ticketImage"
                      alt="ticket"
                    />
                    <p className="ticketDesc">{ticket.description}</p>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          });
        })}
        <Comments ticketId={this.props.match.params.ticketId} />
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
    tickets: state.ticket,
    comments: state.comments
  };
};

export default connect(mapStateToProps)(TicketDetails);
