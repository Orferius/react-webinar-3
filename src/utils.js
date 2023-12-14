/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function sortData(data) {
  const result = [];
  for (const obj of data) {
    const [nextEl, index, depth] = getParent(obj, result, data);
    let newIndex = index;
    for (let indCurr = 0; indCurr < nextEl.length; indCurr++) {
      const el = nextEl[nextEl.length - 1 - indCurr];
      el.depth = depth - nextEl.length + indCurr + 1;
      result.splice(newIndex, 0, el);
      newIndex++;
    };
  };
  return result;
};

function getParentEl(data, parentId) {
  for (const el of data) {
    if (el._id === parentId) {
      return el;
    };
  };
};

function getParent(obj, result, data, depth = 0, currList = null) {
  let index = 0;
  if (currList === null) {
    currList = [];
  };

  if (result.includes(obj)) {
    return [currList, result.indexOf(obj) + 1, depth + obj.depth];
  };

  currList.push(obj);

  if (obj.parent) {
    depth++;
    const [newList, newIndex, newDepth] = getParent(getParentEl(data, obj.parent._id), result, data, depth, currList);
    depth = newDepth;
    index = newIndex;
  } else {
    index = result.length;
  }
  
  return [currList, index, depth];
}
