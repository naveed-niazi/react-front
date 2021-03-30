import React, { Component } from 'react';
import { signup } from '../auth'
import { Link } from 'react-router-dom'


class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false

        }
    }
    handleChange = name => event => {
        this.setState({ error: "", open: false })
        this.setState({ [name]: event.target.value })
    }
    clickSubmit = event => {
        event.preventDefault()
        const { name, email, password } = this.state;
        const user = { username: name, email: email, password: password }
        // console.log(user);
        signup(user)
            .then(data => {
                if (data.error)
                    this.setState({ error: data.error })
                else {
                    this.setState({
                        open: true,
                        name: "",
                        email: "",
                        password: "",
                        error: ""
                    })
                }
            })
    }
    signupForm = (name, email, password) => (
        <form>

            <div className="form-group">
                <label className="text-muted">Profile Picture</label>
                <input onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange("name")} type="text" className="form-control"
                    value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control"
                    value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control"
                    value={password} />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary ">Submit</button>
        </form>
    )
    render() {
        const { name, email, password, open, error } = this.state;
        return (
            <div className="container">

                <h2 className="mt-5 mb-5">Sign Up</h2>
                <div className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}>{error}</div>
                <div className="alert alert-success"
                    style={{ display: open ? "" : "none" }}>
                    New account is successfully created. Please
                    <Link to="/signin"> Sign In</Link></div>
                {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default Signup;