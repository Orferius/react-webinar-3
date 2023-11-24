/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.counter = 0;
    this.state = initState;
    this.startQuant = this.state.list[this.state.list.length - 1];
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
    }
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
    this.counter++;
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.startQuant.code + this.counter, title: 'Новая запись', count: 0}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          item.selected ? item.count++ : item.count--;
				} else {
					item.selected = false;
        }
        return item;
      })
    })
  }

  getWordForm(num){
    const lastDigit = num % 100; 
    const lastTwoDigits = num % 10;
    if (lastDigit > 10 && lastDigit < 20) { return 'раз' }
    if (lastTwoDigits > 1 && lastTwoDigits < 5) { return 'раза' }
    return 'раз';
  }
}

export default Store;
