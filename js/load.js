'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
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

  var getXHR = function (succsessLoad, errorLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status.SUCCSESS:
          succsessLoad(xhr.response);
          break;
        case Status.ERROR:
          errorLoad(Message.BAD_REQUEST);
          break;
        case Status.NOT_FOUND:
          errorLoad(Message.NOTHING_FOUND);
          break;
        default:
          errorLoad(Message.STATUS + xhr.status + ' ' + xhr.statusText);
      }
      xhr.addEventListener('error', function () {
        errorLoad(Message.ERROR);
      });

      xhr.addEventListener('timeout', function () {
        errorLoad(Message.TIMEOUT_ERROR + xhr.timeout + 'мс');
      });
    });
    return xhr;
  };

  var sendGetRequest = function (url, onSuccess, onError) {
    var xhr = getXHR(onSuccess, onError);
    xhr.open('GET', url);
    xhr.send();
  };

  window.load = {
    sendGetRequest: sendGetRequest,
    URL_GET: URL_GET
  };
})();
