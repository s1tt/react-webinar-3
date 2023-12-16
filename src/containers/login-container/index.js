import React from "react";
import LoginForm from "../../components/login-form";
import SideLayout from "../../components/side-layout";
import useTranslate from "../../hooks/use-translate";

const LoginContainer = () => {
  const { t } = useTranslate();
  return (
    <SideLayout padding="medium" flexDirectionColumn={"true"}>
      <h3 className="login-title">{t("login")}</h3>
      <LoginForm />
    </SideLayout>
  );
};

export default LoginContainer;
