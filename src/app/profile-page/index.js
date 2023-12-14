import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import LoginBtn from "../../components/login-btn";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Profile from "../../components/profile";

const LoginPage = () => {
  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginBtn />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Profile/>
    </PageLayout>
  );
};

export default memo(LoginPage);