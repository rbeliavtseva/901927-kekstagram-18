'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT = 10000;

  var Status = {
    SUCCSESS: 200,
    ERROR: 400,
    NOT_FOUND: 404
  };

  var Message = {
    ERROR: 'Произошла ошибка соединения',
    TIMEOUT_ERROR: 'Запрос не успел выполниться за ',
    BAD_REQUEST: 'Неверный запрос',
    NOTHING_FOUND: 'Ничего не найдено',
    STATUS: 'Cтатус ответа: '
  };

  var onRequestLoad = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status.SUCCSESS:
          onSuccess(xhr.response);
          break;
        case Status.ERROR:
          onError(Message.BAD_REQUEST);
          break;
        case Status.NOT_FOUND:
          onError(Message.NOTHING_FOUND);
          break;

        default:
          onError(Message.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(Message.ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(Message.TIMEOUT_ERROR + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();
  };

  window.load = {
    onRequestLoad: onRequestLoad
  };
})();
