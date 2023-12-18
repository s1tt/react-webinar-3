import React, { useCallback, useState } from "react";
import LoginForm from "../../components/login-form";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

const initFormData = {
  login: "",
  password: "",
};

const LoginContainer = () => {
  const { t } = useTranslate();
  const [formData, setFormData] = useState(initFormData);
  const store = useStore();

  const select = useSelector((state) => ({
    error: state.login.error,
    isAuthorized: state.login.authorized,
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
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
    callbacks.onLogin(e, formData);
  };

  return (
    <SideLayout padding="medium" flexDirectionColumn={"true"}>
      <h3 className="login-title">{t("login")}</h3>
      <LoginForm
        t={t}
        onSubmit={onSubmit}
        onChange={onChange}
        onLogin={callbacks.onLogin}
        error={select.error}
        isAuthorized={select.isAuthorized}
        formData={formData}
      />
    </SideLayout>
  );
};

export default LoginContainer;
