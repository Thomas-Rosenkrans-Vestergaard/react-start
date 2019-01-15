import React, { Component } from "react";

import UserMapper from '../data/UserMapper';

class AuthenticationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: []
        }

        this.userMapper = new UserMapper();
    }

    render() {

        const { email, password, errors } = this.state;

        return (
            <form id="authentication-form">
                <div className="form-field">
                    <label htmlFor="authentication-email">Email</label>
                    <input type="email" name="email" id="authentication-email" onChange={this.onEmailChange} required />
                </div>
                <div className="form-field">
                    <label htmlFor="authentication-password">Password</label>
                    <input type="password" name="password" id="authentication-password" onChange={this.onPasswordChange} required />
                </div>
                <div className="form-field">
                    <button onClick={this.onSubmit}>Authenticate</button>
                </div>
                {errors.length > 0 && <div className="form-errors">
                    {errors.map((error, index) =>
                        <div key={index}>
                            <p>{error}</p>
                        </div>
                    )}
                </div>}
            </form>
        );
    }

    onEmailChange = (event) => {
        const value = event.target.value;
        this.setState({ email: value });
    }

    onPasswordChange = (event) => {
        const value = event.target.value;
        this.setState({ password: value });
    }

    onSubmit = (e) => {

        e.preventDefault();

        this.userMapper.authenticate(this.state.email, this.state.password).then(response => {

            if (response.status === 200) {
                this.props.onAuthentication(response.data);
                this.setState({ errors: [] });
                return;
            }

            if (response.status === 401) {
                this.setState({ errors: ["Incorrect email or password."] });
                return;
            }

            this.setState({ errors: ["An error occurred."] });
        })
    }
}

export default AuthenticationForm;