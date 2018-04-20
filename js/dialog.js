'use strict';

(function () {

  // dialog window management ---------------------------------------------------

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.const.setupElement.querySelector('.setup-close');
  var setupUserName = window.const.setupElement.querySelector('.setup-user-name');
  var submitForm = window.const.setupElement.querySelector('.setup-wizard-form');
  submitForm.action = 'https://js.dump.academy/code-and-magick';
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
})();
