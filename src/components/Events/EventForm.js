import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class EventForm extends Component {
  render() {
    const props = this.props;
    return (
      <div className="eventForm">
        <Form className="form" onSubmit={props.handleSubmit}>
          <h2>Add a new event</h2>
          <Form.Group controlId="formEventName">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              type="text"
              name="name"
              value={props.values.name}
              placeholder="Enter event name"
            />
          </Form.Group>

          <Form.Group controlId="formEventDesc">
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              as="textarea"
              name="description"
              value={props.values.description}
              placeholder="Event Description"
            />
          </Form.Group>
          <Form.Group controlId="formEventPicture">
            <Form.Label>Event Picture/Logo</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              type="text"
              name="picture"
              value={props.values.picture}
              placeholder="Picture/Logo URL"
            />
          </Form.Group>
          <Form.Group controlId="formStartDate">
            <Form.Label>Event Start Date</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              type="date"
              name="startDate"
              value={props.values.startDate}
            />
          </Form.Group>
          <Form.Group controlId="formEndDate">
            <Form.Label>Event End Date</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              type="date"
              name="endDate"
              min={props.values.startDate}
              value={props.values.endDate}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
