import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/atoms/Button";
import { actionRegisterUserAPI } from "../../../config/redux/action";
import "./register.scss";

class Register extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleRegisterSubmit = async () => {
    const { email, password } = this.state;

    const response = this.props
      .registerAPI({ email, password })
      .catch((err) => err);

    if (response) {
      console.log("Register success!");
    } else {
      console.log("Register failed!");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Register Page</p>
          <input
            name="email"
            className="input"
            placeholder="Email"
            type="text"
            onChange={this.handleChangeText}
            disabled={this.props.isLoading}
          />
          <input
            name="password"
            className="input"
            placeholder="Password"
            type="password"
            onChange={this.handleChangeText}
            disabled={this.props.isLoading}
          />
          <Button
            onClick={this.handleRegisterSubmit}
            title={"Register"}
            loading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  registerAPI: (data) => dispatch(actionRegisterUserAPI(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
