'use strict';

(function () {

  // dialog window management ---------------------------------------------------

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.const.setupElement.querySelector('.setup-close');
  var setupUserName = window.const.setupElement.querySelector('.setup-user-name');

  window.const.setupElement.querySelector('.setup-similar').classList.remove('hidden');

  var popupOpen = function () {
    window.const.setupElement.classList.remove('hidden');
    var locationX = window.const.setupElement.offsetLeft;
    var locationY = window.const.setupElement.offsetTop;
    window.const.setupElement.style.left = locationX + 'px';
    window.const.setupElement.style.top = locationY + 'px';
    document.addEventListener('keydown', onEscClose);
  };

  var popupClose = function () {
    window.const.setupElement.classList.add('hidden');
    window.const.setupElement.style.left = '';
    window.const.setupElement.style.top = '';
    document.removeEventListener('keydown', onEscClose);
  };

  var onEnterOpen = function (evt) {
    window.util.isEnterEvent(evt, popupOpen);
  };

  var onEnterClose = function (evt) {
    window.util.isEnterEvent(evt, popupClose);
  };

  var onEscClose = function (evt) {
    window.util.isEscEvent(evt, popupClose);
  };

  setupOpen.addEventListener('click', popupOpen);
  setupOpen.addEventListener('keydown', onEnterOpen);
  setupClose.addEventListener('click', popupClose);
  setupClose.addEventListener('keydown', onEscClose);
  setupClose.addEventListener('keydown', onEnterClose);
  setupUserName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscClose);
  });
  setupUserName.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscClose);
  });

  // send formdata and success error handler ----------------------------------

  var form = window.const.setupElement.querySelector('.setup-wizard-form');

  var onSubmitSuccessHandle = function () {
    window.const.setupElement.classList.add('hidden');
  };

  var onSubmitErrorHandle = function () {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: white; color: red; line-height: 50px; padding: 25px; box-shadow: 10px 10px 0 0 rgba(0, 0, 0, 0.8); cursor: pointer;';
    node.style.position = 'absolute';
    node.style.left = '30%';
    node.style.right = '30%';
    node.style.top = '30%';
    node.style.fontSize = '30px';
    node.classList.add('errorDialog');

    node.textContent = 'При отправке данных произошла ошибка.';
    document.body.insertAdjacentElement('afterbegin', node);

    var nodeIn = document.createElement('div');
    nodeIn.style = 'z-index: 101; color: black; cursor: pointer;';
    nodeIn.style.position = 'absolute';
    nodeIn.style.right = '10px';
    nodeIn.style.top = '0';
    nodeIn.style.fontSize = '16px';
    nodeIn.classList.add('closeErrorDialog');
    nodeIn.textContent = 'закрыть';
    node.insertAdjacentElement('afterbegin', nodeIn);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSubmitSuccessHandle, onSubmitErrorHandle);
    evt.preventDefault();
  });

  // close error dialog window ------------------------------------------------

  document.addEventListener('click', function (evt) {
    var target = evt.target;
    var div = document.querySelector('.errorDialog');
    if (target.className === 'errorDialog' || target.className === 'closeErrorDialog') {
      document.body.removeChild(div);
    }
  });
})();
