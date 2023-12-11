import { plural } from "../../utils";

export const en = {
  addToBasket: "Add",
  removeFromBasket: "Remove",
  modalName: "Basket",
  pageName: "Store",
  closeModal: "Close",
  mainLink: "Main",
  inBasket: "Basket:",
  good: function (amount) {
    return plural(amount, {
      one: "good",
      few: "goods",
      many: "goods",
    });
  },
  empty: "Empty",
  openModal: "Open",
  basketTotal: "Total",
  pieces: "pcs",
  manufacturerCountry: "Manufacturer Country:",
  category: "Category: ",
  yearOfProduction: "Year of production: ",
  price: "Price:",
  changeLanguage: "Русский",
  productNotFound: "Product not found",
};
