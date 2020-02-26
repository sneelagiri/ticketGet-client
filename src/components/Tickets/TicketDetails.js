import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import "./tickets.css";
import Comments from "./Comments";
class TicketDetails extends Component {
  render() {
    return (
      <div>
        {this.props.tickets.map(user => {
          if (
            user.username == this.props.match.params.username &&
            user.firstName &&
            user.lastName
          ) {
            return (
              <h1>
                Ticket from {user.firstName} {user.lastName}
              </h1>
            );
          } else if (user.username == this.props.match.params.username) {
            return <h1>Ticket from {user.username}</h1>;
          } else {
            return null;
          }
        })}

        <h2>Risk: 5%</h2>
        {/* {console.log(this.props)} */}
        {this.props.tickets.map(user => {
          return user.tickets.map(ticket => {
            // console.log("GET THIS FAR?");
            if (ticket.id == this.props.match.params.ticketId) {
              // console.log("DID I GET THIS FAR?");

              return (
                <div className="ticketDiv">
                  <h2>
                    <b>€{ticket.price}</b>
                  </h2>
                  <div>
                    <img src={ticket.picture} className="ticketImage" />
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
    events: state.events,
    tickets: state.ticket
  };
};

export default connect(mapStateToProps)(TicketDetails);
