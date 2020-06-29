import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Button from "../../../components/atoms/Button";
import { actionLoginUserAPI } from "../../../config/redux/action";
import "../Register/register.scss";
import Alert from "../../../components/atoms/Alert";

class Login extends Component {
  state = {
    email: "",
    password: "",
    popupMessage: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    const { LoginAPI } = this.props;

    try {
      const response = await LoginAPI({ email, password });

      if (response) {
        this.handleAfterSubmit("Login Success!");
      } else {
        this.handleAfterSubmit("Login Failed!");
      }
    } catch (errorFromFirebase) {
      this.handleAfterSubmit(errorFromFirebase);
    }
  };

  handleAfterSubmit = (message) => {
    this.setState({
      popupMessage: message,
    });
  };

  handleAlertClose = (isClosed) => {
    const { history } = this.props;

    if (isClosed) {
      this.setState({
        email: "",
        password: "",
        popupMessage: "",
      });
    }
    // redirect
    if (this.props.isLogin) {
      let userData = JSON.stringify(this.props.user);
      localStorage.setItem("userData", userData);
      history.push("/");
    }
  };

  render() {
    return (
      <Fragment>
        {this.state.popupMessage !== "" ? (
          <Alert
            popupMessage={this.state.popupMessage}
            isAlertClosed={(isClosed) => this.handleAlertClose(isClosed)}
          />
        ) : null}
        <div className="auth-container">
          <div className="auth-card">
            <p className="auth-title">Login Page</p>
            <input
              name="email"
              className="input"
              placeholder="Email"
              value={this.state.email}
              type="text"
              onChange={this.handleChangeText}
              disabled={this.props.isLoading}
            />
            <input
              name="password"
              className="input"
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.handleChangeText}
              disabled={this.props.isLoading}
            />
            <Button
              onClick={this.handleLoginSubmit}
              title={"Login"}
              loading={this.props.isLoading}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  isLogin: state.isLogin,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  LoginAPI: (data) => dispatch(actionLoginUserAPI(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
