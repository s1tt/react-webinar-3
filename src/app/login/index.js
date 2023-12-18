import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Head from "../../components/head";
import LoginPanel from "../../components/login-panel";
import PageLayout from "../../components/page-layout";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import LoginContainer from "../../containers/login-container";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

const Login = () => {
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    waiting: state.article.waiting,
    isAuthorized: state.login.authorized,
    userData: state.login.userData,
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.login.logOut();
      navigate("/");
    }, [store]),
  };

  useEffect(() => {
    store.actions.login.clearErrors();
  }, []);

  const { t } = useTranslate();
  return (
    <PageLayout>
      <LoginPanel
        isAuthorized={select.isAuthorized}
        userData={select.userData}
        onLogout={callbacks.onLogout}
        navigate={navigate}
        t={t}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginContainer />
      </Spinner>
    </PageLayout>
  );
};

export default Login;
