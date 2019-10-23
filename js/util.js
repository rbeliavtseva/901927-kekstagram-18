'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Функция получения рандомного числа в заданном диапазоне
  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция получения рандомного массива чисел в заданном диапазоне
  var getRandomNumberArray = function (numberOfGeneratedNumbers, startNumberRange, endNumberRange) {
    var intArray = [];
    // Заполняем массив
    while (intArray.length < numberOfGeneratedNumbers) {
      // Получение рандомного числа в заданном диапазоне из предыдущей функции
      var randomNumber = getRandomNumber(startNumberRange, endNumberRange);
      // Проверяем есть ли число в массиве. Если уже есть - переходим к следующей итерации цикла
      if (!intArray.includes(randomNumber)) {
        intArray.push(randomNumber);
      }
    }
    return intArray;
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    getRandomNumber: getRandomNumber,
    getRandomNumberArray: getRandomNumberArray
  };
})();
