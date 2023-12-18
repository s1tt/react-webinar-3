import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const LoginPanel = (props) => {
  return (
    <div className="loginPanel">
      {props.isAuthorized ? (
        <>
          <Link className="loginPanel-profileLink" to={"/profile"}>
            {props.userData.profile.name}
          </Link>
          <button type="button" onClick={props.onLogout}>
            {props.t("logout")}
          </button>
        </>
      ) : (
        <button type="button" onClick={() => props.navigate("/login")}>
          {props.t("login")}
        </button>
      )}
    </div>
  );
};

export default LoginPanel;
