import {memo, useCallback, useMemo, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import AuthMenu from '../../components/auth-menu';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();
  const navigate = useNavigate();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  useEffect(() => {
    store.actions.autorization.checkAuth();
  }, []);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    user: state.autorization.user,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    logOut: useCallback(() => {
      store.actions.autorization.logOut();
      navigate('/login');
    }, [store]),
    navigateToLogin: useCallback(() => navigate('/login')),
  }

  return (
    <PageLayout>
      <AuthMenu 
        user={select.user}
        profileLink={"/profile"}
        logOut={callbacks.logOut}
        navigateToLogin={callbacks.navigateToLogin}
      />
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
