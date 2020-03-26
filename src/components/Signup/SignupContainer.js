import React, { Component } from "react";
import SignupForm from "./SignupForm";
import { connect } from "react-redux";
import { signUp } from "../../actions/users";

class SignupContainer extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    this.props.dispatch(
      signUp(
        this.state.firstName,
        this.state.lastName,
        this.state.username,
        this.state.email,
        this.state.password
      )
    );
    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <h1>Sign up here!</h1>
        {this.props.userCreated ? (
          <h1>Account created {this.props.history.push("/login")}</h1>
        ) : null}
        <SignupForm
          text={"Signup"}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          values={this.state}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("testing git");
  // console.log("STATE IN MSTP", state);
  return {
    userCreated: state.user.userCreated
  };
};

export default connect(mapStateToProps)(SignupContainer);
