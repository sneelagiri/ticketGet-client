import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createComment, fetchComments } from "../../actions/comments";

class Comments extends Component {
  state = {
    comment: ""
  };

  componentDidMount() {
    // console.log(this.props.match.params);
    this.props.dispatch(fetchComments());
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const userId = this.props.currentUser.currentUserId;
    // const eventId = this.props.match.params.eventId;
    this.props.dispatch(
      createComment(this.state.comment, userId, this.props.ticketId)
    );
    this.setState({
      comment: ""
    });
  };
  render() {
    return (
      <div>
        <h2>Comments</h2>
        {this.props.comments.map(user => {
          return user.comments.map(comment => {
            if (comment.ticketId === parseInt(this.props.ticketId)) {
              return (
                <section class="comment">
                  <h4>
                    {user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName} said:`
                      : `${user.username} said`}
                  </h4>
                  <p>{comment.comment}</p>
                </section>
              );
            } else {
              return null;
            }
          });
        })}
        {this.props.userLoggedIn ? (
          <Form className="form" onSubmit={this.handleSubmit}>
            <h3>Add a comment</h3>
            <Form.Group controlId="formComment">
              <Form.Control
                onChange={this.handleChange}
                as="textarea"
                name="comment"
                value={this.state.comment}
                placeholder="Comment"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        ) : (
          <p>Login to post comments</p>
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
    tickets: state.ticket,
    comments: state.comments
  };
};

export default connect(mapStateToProps)(Comments);
