import React, { Component } from 'react';
import { HashRouter as Router, NavLink, Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FourZeroFour from "./pages/FourZeroFour";

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <h1>Title</h1>
            <nav>
              <ul>
                <li><NavLink to="/">Home</NavLink></li>
              </ul>
            </nav>
          </header>
          <main>
            <Switch>
              <Route exact path="/" render={router => <HomePage router={router} />} />
              <Route render={router => <FourZeroFour router={router} />} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
