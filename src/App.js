import React, { Component } from 'react';
import { HashRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";

import HomePage from "./pages/HomePage";
import FourZeroFour from "./pages/FourZeroFour";

import './App.css';

class App extends Component {
  
  toastContainer = null;
  
  render() {
    return (
      <Router>
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
              </ul>
            </nav>
          </header>
          <main>
            <Switch>
              <Route exact path="/" render={router => <HomePage router={router} toastFactory={this.toastFactory} />} />
              <Route render={router => <FourZeroFour router={router} />} toastFactory={this.toastFactory} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }

  toastFactory = () => {
    return this.toastContainer;
  }
}

export default App;
