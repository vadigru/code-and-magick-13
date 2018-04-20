'use strict';

(function () {


  // wizards generating  ------------------------------------------------------

  var generateWizard = function (wizardCount) {
    for (var i = 0; i < wizardCount; i++) {
      window.const.wizards[i] = {
        name: window.const.WIZARD_NAMES[window.util.getRandom(0, window.const.WIZARD_NAMES.length - 1)] + ' ' + window.const.WIZARD_SURNAMES[window.util.getRandom(0, window.const.WIZARD_NAMES.length - 1)],
        coatColor: window.const.COAT_COLORS[window.util.getRandom(0, window.const.COAT_COLORS.length)],
        eyeColor: window.const.EYE_COLORS[window.util.getRandom(0, window.const.EYE_COLORS.length)]
      };
    }
    return window.const.wizards;
  };

  generateWizard(window.const.SIMILAR_WIZARDS_COUNT);

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

    return wizardElement;
  };

  var buildFragments = function (wizard) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizard.length; i++) {
      fragment.appendChild(renderWizard(window.const.wizards[i]));
    }
    return fragment;
  };

  var similarListElement = window.const.setupElement.querySelector('.setup-similar-list');

  similarListElement.appendChild(buildFragments(window.const.wizards));

  // wizard setup -------------------------------------------------------------

  var setupWizardEyes = window.const.setupElement.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireball = window.const.setupElement.querySelector('.setup-fireball-wrap');
  var setupWizardCoat = window.const.setupElement.querySelector('.wizard-coat');
  var playerEye = document.querySelector('.setup-player input[name="eyes-color"]');
  var playerFireball = document.querySelector('.setup-player input[name="fireball-color"]');
  var playerCoat = document.querySelector('.setup-player input[name="coat-color"]');

  var onClickChangeEyeColor = function () {
    var eye = window.const.EYE_COLORS[window.util.getRandom(0, window.const.EYE_COLORS.length - 1)];
    setupWizardEyes.style.fill = eye;
    playerEye.value = eye;
  };

  var onClickChangeFireballColor = function () {
    var fireball = window.const.FIREBALL_COLORS[window.util.getRandom(0, window.const.FIREBALL_COLORS.length - 1)];
    setupWizardFireball.style.backgroundColor = fireball;
    playerFireball.value = fireball;
  };

  var onClickChangeCoatColor = function () {
    var coat = window.const.COAT_COLORS[window.util.getRandom(0, window.const.FIREBALL_COLORS.length - 1)];
    setupWizardCoat.style.fill = coat;
    playerCoat.value = coat;
  };

  setupWizardEyes.addEventListener('click', onClickChangeEyeColor);
  setupWizardFireball.addEventListener('click', onClickChangeFireballColor);
  setupWizardCoat.addEventListener('click', onClickChangeCoatColor);
})();
