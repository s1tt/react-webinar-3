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
      this.listeners = this.listeners.filter(item => item !== listener);
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
  addItem() {
    const newCode = this.generateUniqueCode();
    const newNote = { code: newCode, title: 'Новая запись' };

    this.setState({
      ...this.state,
      list: this.state.list ? [...this.state.list, newNote] : [newNote]
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const deletedCodes = this.state.deletedCodes || [];

    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
      deletedCodes: [...deletedCodes, code] // Добавляем код в список удаленных
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    const updatedList = this.state.list.map(item => {
      if (item.code === code) {
        if (!item.selected) {
          item.selectionCount = (item.selectionCount || 0) + 1; // Увеличиваем счетчик выделений
        }
        item.selected = !item.selected;
      } else {
        item.selected = false; // Сбрасываем выделение у других записей
      }
      return item;
    });

    this.setState({
      ...this.state,
      list: updatedList
    });
  }

  /**
   * Генерация уникального кода, учитывая удаленные записи
   * @returns {number}
   */
  generateUniqueCode() {
    const existingCodes = this.state.list?.map(item => item.code) || [];
    const deletedCodes = this.state.deletedCodes || [];

    // Объединяем существующие и удаленные коды
    const allCodes = [...existingCodes, ...deletedCodes];

    let newCode = 1;

    while (allCodes.includes(newCode)) {
      newCode++;
    }

    return newCode;
  }
}

export default Store;
