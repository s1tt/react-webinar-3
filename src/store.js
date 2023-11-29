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
    const cart = this.state.cart || [];

    const existingItem = cart.find((product) => product.code === productId);

    if (existingItem) {
      const updatedCart = cart.map((product) => {
        return product.code === productId
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product;
      });

      this.setState({
        ...this.state,
        cart: updatedCart,
      });
    } else {
      const newItem = this.state.list.find((item) => item.code === productId);

      this.setState({
        ...this.state,
        cart: [...cart, { ...newItem, quantity: 1 }],
      });
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(productId) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter((item) => item.code !== productId),
    });
  }
}

export default Store;
