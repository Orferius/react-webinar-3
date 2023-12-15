import { memo, useCallback, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import AuthMenu from "../../components/auth-menu";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Spinner from "./../../components/spinner";
import Profile from "../../components/profile";

const ProfilePage = () => {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    user: state.autorization.user,
    waiting: state.autorization.waiting,
  }));

  useEffect(() => {
    store.actions.autorization.checkAuth();
  }, []);

  const callbacks = {
    logOut: useCallback(() => {
      store.actions.autorization.logOut();
      navigate('/login');
    }, [store])
  };

  if (!localStorage.getItem('token')) return <Navigate to={"/login"}/>;

  return (
    <PageLayout>
      <AuthMenu
        user={select.user}
        profileLink={"/profile"}
        logOut={callbacks.logOut}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <Profile user={select.user}/>
      </Spinner>
    </PageLayout>
  );
};

export default memo(ProfilePage);