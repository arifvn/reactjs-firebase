import React from "react";

const Button = ({ title, onClick, loading }) => {
  let buttonColor = title === "Register" ? "" : "login";

  if (loading) {
    return (
      <button className={"btn disable " + buttonColor} onClick={onClick}>
        Loading ...
      </button>
    );
  } else
    return (
      <button className={"btn " + buttonColor} onClick={onClick}>
        {title}
      </button>
    );
};

export default Button;
