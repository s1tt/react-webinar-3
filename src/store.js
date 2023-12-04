import { getFinalPrice } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem(productId) {
    const cart = this.state.cart?.goods || [];

    const existingItem = cart.find((product) => product.code === productId);

    let updatedGoods;
    if (existingItem) {
      updatedGoods = cart.map((product) =>
        product.code === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    } else {
      const newItem = this.state.list.find((item) => item.code === productId);
      updatedGoods = [...cart, { ...newItem, quantity: 1 }];
    }

    const updatedCart = {
      goods: updatedGoods,
      cartSummary: {
        finalPrice: getFinalPrice(updatedGoods),
        quantityOfGoods: updatedGoods.length,
      },
    };

    this.setState({
      ...this.state,
      cart: updatedCart,
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(productId) {
    const updatedGoods =
      this.state.cart?.goods.filter((item) => item.code !== productId) || [];

    const updatedCart = {
      goods: updatedGoods,
      cartSummary: {
        finalPrice: getFinalPrice(updatedGoods),
        quantityOfGoods: updatedGoods.length,
      },
    };

    this.setState({
      ...this.state,
      cart: updatedCart,
    });
  }
}

export default Store;
