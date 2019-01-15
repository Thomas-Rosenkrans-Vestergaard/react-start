import React, { Component } from 'react';
import { HashRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";

import HomePage from "./pages/HomePage";
import FourZeroFour from "./pages/FourZeroFour";
import AuthenticationPage from "./authentication/AuthenticationPage";
import RegistrationPage from "./registration/RegistrationPage";

import './App.css';

class App extends Component {


  constructor(props) {
    super(props);

    const authenticationContext = localStorage.getItem("authenticationContext");
    if (authenticationContext !== null) {
      this.state = { authenticationContext: JSON.parse(authenticationContext) };
    } else this.state = {};

    this.toastContainer = null;
  }

  onAuthentication = authenticationContext => {
    console.log(authenticationContext)
    const text = JSON.stringify(authenticationContext);
    localStorage.setItem("authenticationContext", text);
    this.setState({ authenticationContext });
    this.props.router.history.push("/");
    this.toastContainer.success("You are now logged in.");
  };

  onLogout = () => {
    localStorage.removeItem("authenticationContext");
    this.setState({ authenticationContext: null });
    this.props.router.history.push("/authentication");
    this.toastContainer.success("You are now logged out.");
  };

  onRegistration = user => {
    this.props.router.history.push("/authentication");
    this.toastContainer.success("Your user account was created.")
  };

  render() {

    return (
      <div>
        <ToastContainer
          ref={ref => this.toastContainer = ref}
          className="toast-top-right"
          toastMessageFactory={React.createFactory(ToastMessageAnimated)}
        />
        <header>
          <h1>Title</h1>
          <nav>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/authentication">Authentication</NavLink></li>
              <li><NavLink to="/registration">Registration</NavLink></li>
              {this.state.authenticationContext && <li>{this.state.authenticationContext.user.name}</li>}
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" render={router => <HomePage router={router} toastFactory={this.toastFactory} />} />
            <Route path="/registration"
              render={router =>
                <RegistrationPage
                  router={router}
                  onRegistration={this.onRegistration}
                />}
            />
            <Route
              path="/authentication"
              render={router =>
                <AuthenticationPage
                  router={router}
                  onAuthentication={this.onAuthentication}
                />}
            />



            {/* 404 */}
            <Route render={router => <FourZeroFour router={router} />} toastFactory={this.toastFactory} />
          </Switch>
        </main>
      </div>
    );
  }

  toastFactory = () => {
    return this.toastContainer;
  }
}

export default App;
