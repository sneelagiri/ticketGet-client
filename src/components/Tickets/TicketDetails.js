import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import "./tickets.css";
import Comments from "./Comments";
class TicketDetails extends Component {
  render() {
    function round_to_precision(x, precision) {
      var y = +x + (precision === undefined ? 0.5 : precision / 2);
      return y - (y % (precision === undefined ? 1 : +precision));
    }
    // Risk analysis logic stars
    let numComments = 0;
    this.props.comments.map(user => {
      return user.comments.map(comment => {
        if (comment.ticketId == this.props.match.params.ticketId) {
          numComments++;
          // console.log("Number of Comments", numComments);
        }
      });
    });
    let numTickets = 0;
    let sumPrice = 0;
    this.props.tickets.map(user => {
      return user.tickets.map(ticket => {
        if (ticket.eventId == this.props.match.params.eventId) {
          numTickets++;
          sumPrice = sumPrice + ticket.price;
          return ticket;
        } else {
          return ticket;
        }
      });
    });
    const minRisk = 5;
    const maxRisk = 95;
    let risk = 0;
    const averagePrice = sumPrice / numTickets;
    this.props.tickets.map(user => {
      return user.tickets.map(ticket => {
        if (
          ticket.id == this.props.match.params.ticketId &&
          user.tickets.length === 1
        ) {
          risk = risk + 10;
          if (numComments > 3) {
            risk = risk + 5;
          }
          const time = parseInt(ticket.updatedAt.slice(11, 13));
          if (time > 9 && time < 17) {
            risk = risk - 10;
          } else {
            risk = risk + 10;
          }
          const priceDifference = ticket.price - averagePrice;
          if ((priceDifference > 0) & (priceDifference < 10)) {
            risk = risk - priceDifference;
          } else if (priceDifference > 10) {
            risk = risk - 10;
          } else {
            risk = risk - priceDifference;
          }
          return ticket;
        } else if (ticket.id == this.props.match.params.ticketId) {
          if (numComments > 3) {
            risk = risk + 5;
          }
          const time = parseInt(ticket.updatedAt.slice(11, 13));
          if (time > 9 && time < 17) {
            risk = risk - 10;
          } else {
            risk = risk + 10;
          }

          const priceDifference = ticket.price - averagePrice;
          if ((priceDifference > 0) & (priceDifference < 10)) {
            risk = risk - priceDifference;
          } else if (priceDifference > 10) {
            risk = risk - 10;
          } else {
            risk = risk - priceDifference;
          }
          return ticket;
        } else {
          return null;
        }
      });
    });
    risk = round_to_precision(risk, 0.01);
    // Based on number of comments:

    // console.log(averagePrice);
    // Risk analysis logic ends here
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
        {/* {console.log(risk)} */}
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

        {/* {console.log(this.props)} */}
        {this.props.tickets.map(user => {
          return user.tickets.map(ticket => {
            // console.log("GET THIS FAR?");
            if (ticket.id == this.props.match.params.ticketId) {
              // console.log("DID I GET THIS FAR?");
              return (
                <div className="ticketDiv">
                  <h2>
                    <b>Price: €{ticket.price}</b>
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
    tickets: state.ticket,
    comments: state.comments
  };
};

export default connect(mapStateToProps)(TicketDetails);
