import { memo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import AuthMenu from "../../components/auth-menu";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Login from "../../components/login";

const LoginPage = () => {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  useEffect(() => {
    store.actions.autorization.resetError();
  }, []);

  const select = useSelector((state) => ({
    error: state.autorization.error,
  }));

  const callbacks = {
    logIn: useCallback(
      (login, password) => {
        store.actions.autorization.logIn(login, password).then(() => {
          if (localStorage.getItem("token")) navigate("/");
        });
      },
      [store]
    ),
    logOut: useCallback(() => store.actions.autorization.logOut(), [store]),
    navigateToLogin: useCallback(() => navigate('/login')),
  };

  return (
    <PageLayout>
      <AuthMenu
        logOut={callbacks.logOut}
        navigateToLogin={callbacks.navigateToLogin}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Login logIn={callbacks.logIn} error={select.error}/>
    </PageLayout>
  );
};

export default memo(LoginPage);