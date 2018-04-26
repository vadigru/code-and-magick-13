'use strict';

(function () {
  var saveURL = 'https://js.dump.academy/code-and-magick';
  var loadURL = 'https://js.dump.academy/code-and-magick/data';
  var serverTime = 20000;
  var statusOk = 200;

  // success/error handling function ------------------------------------------

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusOk) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = serverTime;

    return xhr;
  };

  // data load from server ----------------------------------------------------

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', loadURL);
    xhr.send();
  };

  // data send to server ------------------------------------------------------

  var save = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', saveURL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
