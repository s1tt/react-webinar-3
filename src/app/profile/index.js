import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Head from "../../components/head";
import LoginPanel from "../../components/login-panel";
import PageLayout from "../../components/page-layout";
import ProfileLayout from "../../components/profile-layout";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

const Profile = () => {
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    isAuthorized: state.login.authorized,
    userData: state.login.userData,
    waiting: state.login.waiting,
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.login.logOut();
      navigate("/");
    }, [store]),
  };

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
        {select.userData && <ProfileLayout t={t} userData={select.userData} />}
      </Spinner>
    </PageLayout>
  );
};

export default Profile;
