import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Head from "../../components/head";
import LoginPanel from "../../components/login-panel";
import PageLayout from "../../components/page-layout";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const { t } = useTranslate();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.categories.load();
    },
    [],
    true
  );

  const navigate = useNavigate();

  const select = useSelector((state) => ({
    isAuthorized: state.login.authorized,
    userData: state.login.userData,
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.login.logOut();
      navigate("/");
    }, [store]),
  };

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
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
