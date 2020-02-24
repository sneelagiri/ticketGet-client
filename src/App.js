import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import SignupContainer from "./components/Signup/SignupContainer";
import LoginContainer from "./components/Login/LoginContainer";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/login">
              Log In
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/signup" component={SignupContainer} />
          <Route exact path="/login" component={LoginContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
