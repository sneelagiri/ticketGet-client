import React, { Component } from "react";
import { connect } from "react-redux";
import Events from "./Events";
import EventForm from "./EventForm";
import { createEvent, fetchEvents } from "../../actions/events";
import Button from "react-bootstrap/Button";

class EventContainer extends Component {
  state = {
    name: "",
    description: "",
    picture: "",
    startDate: "",
    endDate: "",
    page: 0,
    endReached: false
  };
  componentDidMount() {
    this.props.dispatch(fetchEvents(this.state.page));
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log("This is the date format", this.state.endDate);
  };

  handleSubmit = event => {
    event.preventDefault();
    const newEvent = {
      name: this.state.name,
      description: this.state.description,
      picture: this.state.picture,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    // console.log(this.state);
    // console.log("WHAT IS THIS PROPS DISPATCH", this.props.dispatch);
    // console.log(this.props.currentUserId);
    this.props.dispatch(createEvent(newEvent, this.state.page));
    this.setState({
      name: "",
      description: "",
      picture: "",
      startDate: "",
      endDate: ""
    });
  };

  nextPage = () => {
    const newPage = this.state.page + 1;
    this.props.dispatch(fetchEvents(newPage));
    this.setState({ page: newPage });
  };

  previousPage = () => {
    const newPage = this.state.page - 1;
    this.props.dispatch(fetchEvents(newPage));
    this.setState({ page: newPage });
  };

  render() {
    return (
      <div>
        <h1>Events</h1>
        <Events />
        {this.props.userLoggedIn ? (
          <EventForm
            values={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <p>Login to create an event</p>
        )}
        {this.state.page !== 0 ? (
          <Button
            variant="secondary"
            className="previousButton"
            onClick={this.previousPage}
          >
            Previous
          </Button>
        ) : null}
        {this.state.page * 9 + 9 < this.props.eventCount ? (
          <Button
            variant="primary"
            className="nextButton"
            onClick={this.nextPage}
          >
            Next
          </Button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.user.token !== null,
    currentUserId: state.user,
    events: state.events.rows,
    eventCount: state.events.count
  };
};

export default connect(mapStateToProps)(EventContainer);
