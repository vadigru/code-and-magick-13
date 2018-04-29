'use strict';

(function () {

  // wizard setup change colors -----------------------------------------------

  var setupWizardEyes = window.const.setupElement.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireball = window.const.setupElement.querySelector('.setup-fireball-wrap');
  var setupWizardCoat = window.const.setupElement.querySelector('.wizard-coat');
  var playerEye = document.querySelector('.setup-player input[name="eyes-color"]');
  var playerFireball = document.querySelector('.setup-player input[name="fireball-color"]');
  var playerCoat = document.querySelector('.setup-player input[name="coat-color"]');

  var onClickChangeCoatColor = function () {
    var newColor = window.const.COAT_COLORS[window.util.getRandom(0, window.const.COAT_COLORS.length - 1)];
    setupWizardCoat.style.fill = newColor;
    playerCoat.value = newColor;
    window.wizard.onCoatChange(newColor);
  };

  var onClickChangeEyeColor = function () {
    var newColor = window.const.EYE_COLORS[window.util.getRandom(0, window.const.EYE_COLORS.length - 1)];
    setupWizardEyes.style.fill = newColor;
    playerEye.value = newColor;
    window.wizard.onEyesChange(newColor);
  };

  var onClickChangeFireballColor = function () {
    var newColor = window.const.FIREBALL_COLORS[window.util.getRandom(0, window.const.FIREBALL_COLORS.length - 1)];
    setupWizardFireball.style.backgroundColor = newColor;
    playerFireball.value = newColor;
  };

  setupWizardEyes.addEventListener('click', onClickChangeEyeColor);
  setupWizardFireball.addEventListener('click', onClickChangeFireballColor);
  setupWizardCoat.addEventListener('click', onClickChangeCoatColor);
})();
