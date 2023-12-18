import { memo, useCallback, useEffect } from "react";
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

  const select = useSelector((state) => ({
    user: state.profile.data,
    waiting: state.autorization.waiting,
  }));

  const callbacks = {
    logOut: useCallback(() => store.actions.autorization.logOut(), [store]),
  };

  return (
    <PageLayout>
      <AuthMenu
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