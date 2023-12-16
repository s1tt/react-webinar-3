import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

const initFormData = {
  login: "",
  password: "",
};

const LoginForm = () => {
  const [formData, setFormData] = useState(initFormData);
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    error: state.login.error,
  }));

  const callbacks = {
    onLogin: useCallback(
      (e, { login, password }) => {
        e.preventDefault();
        store.actions.login.login(login, password);
        setFormData(initFormData);
      },
      [store]
    ),
  };

  const onChange = (e) => {
    console.log(e.target.id);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
    callbacks.onLogin(e, formData);
  };

  const { t } = useTranslate();

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <form className="login-form" onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="login" className="login-label">
        <span>{t("login")}</span>
        <input
          type="text"
          name="login"
          id="login"
          onChange={onChange}
          value={formData.login}
        />
      </label>
      <label htmlFor="password" className="login-label">
        <span>{t("password")}</span>
        <input
          type="password"
          name="password"
          id="password"
          onChange={onChange}
          value={formData.password}
        />
      </label>
      {select.error ? (
        <p className="login-error">{select.error.message}</p>
      ) : null}
      <button type="submit" className="login-btn">
        {t("loginBtn")}
      </button>
    </form>
  );
};

export default LoginForm;
