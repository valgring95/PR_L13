import React, {Component} from "react";
const axios = require('axios');

class SignUpForm extends Component {

    state = {
        account: {
            username: "",
            email: "",
            password: ""
        },
        errors: {}
    };

    handleChangeRoute = () => {
        this.props.history.push('/');
        window.location.reload();
    };

    validate = () => {
        const errors = {};

        const {account} = this.state;
        if (account.username.trim() === '') {
            errors.username = 'Username is required!';
        }
        if (account.email.trim() === '') {
            errors.password = 'Email is required!';
        }
        if (account.password.trim() === '') {
            errors.password = 'Password is required!';
        }

        return Object.keys(errors).length === 0 ? null : errors;
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        console.log(this.state)

        axios({
            method: 'post',
            url: 'http://localhost:3001/api/user/create',
            data: {
                name: this.state.account.username,
                email: this.state.account.email,
                password: this.state.account.password
            }
        }).then((response) => {
            this.handleChangeRoute();
        }).catch((error) => {
            const errors = {};
            errors.password = 'Given username does\'t exists or password is wrong!';
            this.setState({errors: errors || {}});
            console.log(error);
        });
    };

    handleChange = (event) => {
        const account = {...this.state.account};
        account[event.currentTarget.name] = event.currentTarget.value;
        this.setState({account});
    };

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <input value={this.state.account.username}
                               name="username"
                               onChange={this.handleChange}
                               type="text"
                               className="form-control"
                               id="username"
                               aria-describedby="emailHelp"
                               placeholder="Username"/>
                        {this.state.errors.username &&
                        <div className="alert alert-danger">{this.state.errors.username}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input value={this.state.account.email}
                               name="email"
                               onChange={this.handleChange}
                               type="email"
                               className="form-control"
                               id="email"
                               aria-describedby="emailHelp"
                               placeholder="Email"/>
                        {this.state.errors.email &&
                        <div className="alert alert-danger">{this.state.errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input value={this.state.account.password}
                               name="password"
                               onChange={this.handleChange}
                               type="password"
                               className="form-control"
                               id="password"
                               placeholder="Password"/>
                        {this.state.errors.password &&
                        <div className="alert alert-danger">{this.state.errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">SignUp</button>
                </form>

            </div>
        );
    }
}

export default SignUpForm;
