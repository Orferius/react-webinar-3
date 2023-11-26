import { codeGenerator } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.generatedCode = codeGenerator(this.state.list);
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
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.generatedCode(), title: 'Новая запись'}]
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
        // Добавление поля count в элементы массива list в случае отсутствия такого поля
        !item.count ? item.count = 0 : item.count;
        if (item.code === code) {
          item.selected = !item.selected;
          // Убрала уменьшение счетчика при снятии выделения с задачи, чтобы было видно
          // что задача выделялась даже 1 раз (ранее при двух кликах подряд на задачу нажатие обнулялось)
          item.selected ? item.count++ : item.count;
				} else {
					item.selected = false;
        }
        return item;
      })
    })
  }

  // Добавила массив в параметры
  getWordForm(num, arr){
    const lastDigit = num % 100; 
    const lastTwoDigits = num % 10;
    if (lastDigit > 10 && lastDigit < 20) { return arr[2] }
    if (lastTwoDigits > 1 && lastTwoDigits < 5) { return arr[1] }
    // Добавила проверку числа, заканчивающегося на единицу, для случая, когда у слова 3 варианта окончаний
    if (lastTwoDigits === 1) { return arr[0] }
    return arr[2];
  }
}

export default Store;
