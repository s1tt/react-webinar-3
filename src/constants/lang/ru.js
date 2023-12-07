import { plural } from "../../utils";

export const ru = {
  addToBasket: "Добавить",
  removeFromBasket: "Удалить",
  modalName: "Корзина",
  pageName: "Магазин",
  closeModal: "Закрыть",
  mainLink: "Главная",
  inBasket: "В Корзине",
  good: function (amount) {
    return plural(amount, {
      one: "товар",
      few: "товара",
      many: "товаров",
    });
  },
  empty: "Пусто",
  openModal: "Перейти",
  basketTotal: "Итого",
  pieces: "шт",
  manufacturerCountry: "Страна производства:",
  category: "Категория:",
  yearOfProduction: "Год выпуска:",
  price: "Цена:",
  changeLanguage: "English",
};
