'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;

  var Status = {
    SUCCSESS: 200,
    ERROR: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var Message = {
    ERROR: 'Произошла ошибка соединения',
    TIMEOUT_ERROR: 'Запрос не успел выполниться за ',
    BAD_REQUEST: 'Неверный запрос',
    NOTHING_FOUND: 'Ничего не найдено',
    STATUS: 'Cтатус ответа: '
  };

  var setXHRParameters = function (xhr, url, method, succsessLoad, errorLoad) {
    xhr.open(method, url);

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
        case Status.SERVER_ERROR:
          errorLoad(Message.NOTHING_FOUND);
          break;
        default:
          errorLoad(Message.STATUS + xhr.status + ' ' + xhr.statusText);
      }

      xhr.addEventListener('error', function () {
        errorLoad(Message.ERROR);
      });
    });

    xhr.addEventListener('timeout', function () {
      errorLoad(Message.TIMEOUT_ERROR + xhr.timeout + 'мс');
    });
  };

  var sendGetRequest = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    setXHRParameters(xhr, url, 'GET', onSuccess, onError);
    xhr.send();
  };

  var sendPostRequest = function (url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    setXHRParameters(xhr, url, 'POST', onSuccess, onError);
    xhr.send(data);
  };

  window.load = {
    sendGetRequest: sendGetRequest,
    sendPostRequest: sendPostRequest,
    URL_GET: URL_GET,
    URL_POST: URL_POST
  };
})();
