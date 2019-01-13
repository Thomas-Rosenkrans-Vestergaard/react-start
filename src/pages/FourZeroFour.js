import React, { Component } from "react";

export default class FourZeroFour extends Component {

    goBack = (e) => {
        e.preventDefault();
        this.props.router.history.goBack();
    }

    render() {
        return (
            <div id="home-page">
                <h2>404</h2>
                <p>This page does not exist, click <a href="#!" onClick={this.goBack}>here</a> to go back.</p>
            </div>
        )
    }
}