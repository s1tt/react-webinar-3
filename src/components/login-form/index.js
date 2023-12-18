import React from "react";
import "./style.css";

const LoginForm = (props) => {
  return (
    <form className="login-form" onSubmit={(e) => props.onSubmit(e)}>
      <label htmlFor="login" className="login-label">
        <span>{props.t("login2")}</span>
        <input
          className="login-input"
          type="text"
          name="login"
          id="login"
          onChange={props.onChange}
          value={props.formData.login}
        />
      </label>
      <label htmlFor="password" className="login-label">
        <span>{props.t("password")}</span>
        <input
          className="login-input"
          type="password"
          name="password"
          id="password"
          onChange={props.onChange}
          value={props.formData.password}
        />
      </label>
      {props.error
        ? props.error.data.issues.map((issue, index) => (
            <p key={index} className="login-error">
              {issue.message}
            </p>
          ))
        : null}
      <button type="submit" className="login-btn">
        {props.t("loginBtn")}
      </button>
    </form>
  );
};

export default LoginForm;
