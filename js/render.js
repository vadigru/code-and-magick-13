'use strict';

(function () {

  // wizards rendering  ------------------------------------------------------

  var similarListElement = window.const.setupElement.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.render = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.const.SIMILAR_WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }
    similarListElement.innerHTML = '';
    similarListElement.appendChild(fragment);
    window.const.setupElement.querySelector('.setup-similar').classList.remove('hidden');
  };

})();
