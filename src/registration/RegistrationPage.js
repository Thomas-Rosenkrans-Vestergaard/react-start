import React, { Component } from "react";
import RegistrationForm from "./RegistrationForm";
import { Link } from "react-router-dom";
import './RegistrationPage.css';

export default (props) => {

    return (
        <div className="row" id="registration-page">
            <h2>Registration</h2>
            <p>If you already have an account, you can click <Link to="/authentication">here</Link> to login.</p>
            <RegistrationForm onRegistration={props.onRegistration} />
        </div>
    );
}