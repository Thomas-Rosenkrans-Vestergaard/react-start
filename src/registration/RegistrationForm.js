import React, { Component } from "react";
import UserMapper from '../data/UserMapper';

class RegistrationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            passwordRepeat: "",
            errors: []
        }

        this.userMapper = new UserMapper();
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        const { name, email, password, passwordRepeat, errors } = this.state;

        return (
            <>
            <form onSubmit={this.onSubmit}>
                <div className="form-field">
                    <label htmlFor="registration-name">Name</label>
                    <input id="registration-name" type="text" name="name" minLength={0} maxLength={255} value={name} onChange={this.onChange} />
                </div>
                <div className="form-field">
                    <label htmlFor="registration-email">Email</label>
                    <input id="registration-email" type="email" name="email" minLength={0} maxLength={255} value={email} onChange={this.onChange} />
                </div>
                <div className="form-field">
                    <label htmlFor="registration-password">Password</label>
                    <input id="registration-password" type="password" name="password" minLength={0} maxLength={255} value={password} onChange={this.onChange} />
                </div>
                <div className="form-field">
                    <label htmlFor="registration-password-repeat">Password repeat</label>
                    <input id="registration-password-repeat" type="password" name="passwordRepeat" minLength={0} maxLength={255} value={passwordRepeat} onChange={this.onChange} />
                </div>
                <div className="form-field">
                    <button onClick={this.onSubmit}>Register</button>
                </div>
                {errors.length > 0 && <div className="form-errors">
                    {errors.map((error, index) =>
                        <div key={index}>
                            <p>{error}</p>
                        </div>
                    )}
                </div>}
            </form>
            </>
        );
    }

    onDefaultChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        this.setState({ [name]: value });
    }


    onSubmit = (e) => {

        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordRepeat: this.state.passwordRepeat,
        }


        if (user.password.length < 4) {
            this.setState({ errors: ["The password must be longer than 3 characters."] });
            return;
        }

        if (user.password !== user.passwordRepeat) {
            this.setState({ errors: ["The two passwords must match."] });
            return;
        }

        this.userMapper.create(user).then(response => {

            // Success
            if (response.status === 201) {
                this.props.onRegistration(response.data);
                this.setState({ errors: [] });
                return;
            }

            // Validation error
            if (response.status === 422) {
                const messages = response.data.violations.map(violation => violation.message);
                this.setState({ errors: messages });
                return;
            }

            if (response.status === 409) {
                this.setState({ errors: ["That email is already in use."] })
                return;
            }

            this.setState({ errors: ["An error occurred."] });
        });
    }
}

export default RegistrationForm;