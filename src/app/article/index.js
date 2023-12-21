import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { useParams } from "react-router-dom";
import shallowequal from "shallowequal";
import ArticleCard from "../../components/article-card";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import Spinner from "../../components/spinner";
import Comments from "../../containers/comments";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import TopHead from "../../containers/top-head";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import articleActions from "../../store-redux/article/actions";
import commentsActions from "../../store-redux/comments/actions";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(commentsActions.load(params.id));
    dispatch(articleActions.load(params.id));
  }, [params.id]);

  const selectRedux = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data.items || [],
      commentsWaiting: state.comments.waiting,
      commentsCount: state.comments.data.count || 0,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const select = useSelector((state) => ({
    isAuth: state.session.exists,
    currentUsername: state.session.user.profile?.name || "",
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  const sortedComments = useMemo(() => {
    return treeToList(listToTree(selectRedux.comments), (comment, level) => ({
      _id: comment._id,
      author: comment.author,
      text: comment.text,
      dateCreate: comment.dateCreate,
      level: level - 1,
    })).slice(1);
  }, [selectRedux.comments]);

  return (
    <PageLayout>
      <TopHead />
      <Head title={selectRedux.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={selectRedux.waiting}>
        <ArticleCard
          article={selectRedux.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <Spinner active={selectRedux.commentsWaiting}>
        <Comments
          sortedComments={sortedComments}
          commentsCount={selectRedux.commentsCount}
          isAuth={select.isAuth}
          dispatch={dispatch}
          currentUsername={select.currentUsername}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
