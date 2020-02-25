import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

export default function TicketForm(props) {
  return (
    <div>
      <Form className="form" onSubmit={props.handleSubmit}>
        <h2>Sell your ticket</h2>
        <Form.Group controlId="formTicketPrice">
          <Form.Label>Ticket Price</Form.Label>
          <InputGroup.Prepend>
            <InputGroup.Text>€</InputGroup.Text>
            <Form.Control
              onChange={props.handleChange}
              type="number"
              min="0.00"
              step=".01"
              name="price"
              value={props.values.price}
              placeholder="Enter ticket price"
              required
            />
          </InputGroup.Prepend>
        </Form.Group>
        <Form.Group controlId="formTicketDesc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={props.handleChange}
            as="textarea"
            name="description"
            value={props.values.description}
            placeholder="Ticket Description"
            required
          />
        </Form.Group>
        <Form.Group controlId="formTicketPicture">
          <Form.Label>Ticket Picture</Form.Label>
          <Form.Control
            onChange={props.handleChange}
            type="text"
            name="picture"
            value={props.values.picture}
            placeholder="Picture/Logo URL"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
