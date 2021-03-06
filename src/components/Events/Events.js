import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./events.css";
class Events extends Component {
  render() {
    return this.props.events ? (
      <div className="eventCard">
        {this.props.events.map(event => {
          return (
            <Card
              style={{ width: "18rem" }}
              key={event.id}
              className="eventCard"
            >
              <Card.Img variant="top" src={event.eventPicture} />
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text>Start Date: {event.startDate}</Card.Text>
                <Card.Text>End Date: {event.endDate}</Card.Text>
                <Link to={`/${event.id}/tickets`}>
                  <Button variant="primary">Get a Ticket!</Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    ) : (
      <h1>Loading Events...</h1>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.user.token !== null,
    currentUserId: state.user,
    events: state.events.rows
  };
};

export default connect(mapStateToProps)(Events);
