import React from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import LoginContainer from "../../containers/login-container";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";
import "./style.css";

const Login = () => {
  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));
  return (
    <PageLayout>
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginContainer />
        {/* <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/> */}
      </Spinner>
    </PageLayout>
  );
};

export default Login;
