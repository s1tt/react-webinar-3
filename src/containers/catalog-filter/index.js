import { memo, useCallback, useMemo } from "react";
import Input from "../../components/input";
import Select from "../../components/select";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

function CatalogFilter() {
  const store = useStore();
  const { t, lang } = useTranslate();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.list,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(
      (sort) => store.actions.catalog.setParams({ sort }),
      [store]
    ),
    // Поиск
    onSearch: useCallback(
      (query) => store.actions.catalog.setParams({ query, page: 1 }),
      [store]
    ),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Фильтр по категории
    onCategory: useCallback(
      (category) =>
        store.actions.catalog.setParams({
          category,
          page: 1,
        }),
      [store]
    ),
  };

  const options = {
    // Варианты сортировок
    sort: useMemo(
      () => [
        { value: "order", title: t("catalogFilter.inOrder") },
        { value: "title.ru", title: t("catalogFilter.byNaming") },
        { value: "-price", title: t("catalogFilter.dearsFirst") },
        { value: "edition", title: t("catalogFilter.ancients") },
      ],
      [lang]
    ),
    // Категории для фильтра
    categories: useMemo(
      () => [
        { value: "", title: t("catalogFilter.all") },
        ...treeToList(listToTree(select.categories), (item, level) => ({
          value: item._id,
          title: "- ".repeat(level) + item.title,
        })),
      ],
      [select.categories]
    ),
  };

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategory}
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={t("catalogFilter.searchPlaceholder")}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
