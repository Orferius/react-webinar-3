import {memo, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import AuthMenu from '../../components/auth-menu';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();
  const navigate = useNavigate();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.category.loadCategories();
  }, [], true);

  const callbacks = {
    logOut: useCallback(() => store.actions.autorization.logOut(), [store]),
    navigateToLogin: useCallback(() => navigate('/login')),
  };

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthMenu
        logOut={callbacks.logOut}
        navigateToLogin={callbacks.navigateToLogin}
      />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
