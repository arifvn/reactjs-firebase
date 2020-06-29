import React, { Component } from "react";
import "./Alert.css";

class Alert extends Component {
  handlePopupClosed = () => {
    this.props.isAlertClosed(true);
  };

  render() {
    return (
      <div id="popup1" className="overlay">
        <div className="popup">
          <h2>Notification</h2>
          <span className="close" onClick={this.handlePopupClosed}>
            &times;
          </span>
          <div className="content">{this.props.popupMessage}</div>
        </div>
      </div>
    );
  }
}

export default Alert;
