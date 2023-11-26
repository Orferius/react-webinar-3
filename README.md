1. Что делает функция addCount?
--- Изначально функция addCount в index.js служила для того, чтобы добавлять поле count в элементы исходного массива list:
const addCount = (arr) => {return [...arr].map(item => {item.count = 0; return item})}
addCount(store.state.list);

Функцию addCount заменила на: 
!item.count ? item.count = 0 : item.count (эта строка добавлена в функцию selectItem() файла store.js). Т.о. смогла добавлять поле count во все элементы массива list.

2. Хорошо было б доработать генерацию случайного кода для записи, т.к. если бы в исходном списке были бы коды больше, чем длина списка, то решение бы не работало.
--- Переписала генерацию полностью, теперь коды должны быть уникальны

3. Функция плюрализации не универсальна и работает только с 1 словом, можно исправить, чтобы она принимала кроме числа еще и массив слов и возвращала нужное.
--- Изменено в соответствии с рекомендациями