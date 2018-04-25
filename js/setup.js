'use strict';

(function () {


  // wizards rendering  ------------------------------------------------------

  var similarListElement = window.const.setupElement.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

    return wizardElement;
  };

  var successLoadHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.const.SIMILAR_WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[window.util.getRandom(0, wizards.length - 1)]));
    }
    similarListElement.appendChild(fragment);

    window.const.setupElement.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorLoadHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: white; color: red; line-height: 50px; padding: 25px; box-shadow: 10px 10px 0 0 rgba(0, 0, 0, 0.8);';
    node.style.position = 'absolute';
    node.style.left = '30%';
    node.style.right = '30%';
    node.style.top = '15%';
    node.style.fontSize = '30px';
    node.classList.add('errorDialog');

    node.textContent = errorMessage;
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

  window.backend.load(successLoadHandler, errorLoadHandler);

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
