import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import SideLayout from "../../components/side-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

const Profile = () => {
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    isAuthorized: state.login.authorized,
    userData: state.login.userData,
    article: state.article.data,
  }));

  // if (!select.isAuthorized) return null;

  useEffect(() => {
    if (!select.isAuthorized) {
      navigate("/login");
    }
  }, [select.isAuthorized]);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SideLayout padding="medium" flexDirectionColumn={"true"}>
        <h3>{t("profile")}</h3>
        <p>
          {t("name")}: <strong>{select.userData.profile.name}</strong>
        </p>
        <p>
          {t("phone")}: <strong>{select.userData.profile.phone}</strong>
        </p>
        <p>
          {t("email")}: <strong>{select.userData.email}</strong>
        </p>
      </SideLayout>
    </PageLayout>
  );
};

export default Profile;
