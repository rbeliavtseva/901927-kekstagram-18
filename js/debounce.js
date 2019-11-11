'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;

  window.debounce = function (func) {
    // Возвращаем новую функцию
    return function () {
      // Берем аргументы этой функции для создания нового вызова с аргументами
      var args = arguments;
      // Новый вызов
      var newCall = function () {
        // Очистка таймера после успешного вызова
        lastTimeout = null;
        // Новая функция
        func.apply(null, args);
      };
      // Очищаем таймер при многократном вызове
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      // Ставим последний из вызовов на отложенное выполнение
      lastTimeout = setTimeout(newCall, DEBOUNCE_INTERVAL);
    };
  };
})();
