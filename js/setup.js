'use strict';

var userSetup = document.querySelector('.setup');
userSetup.classList.remove('hidden');
userSetup.querySelector('.setup-similar').classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var SIMILAR_WIZARDS_COUNT = 4;
var wizards = [];

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateWizard = function (wizardCount) {
  for (var i = 0; i < wizardCount; i++) {
    wizards[i] = {
      name: WIZARD_NAMES[getRandom(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandom(0, WIZARD_NAMES.length - 1)],
      coatColor: COAT_COLORS[getRandom(0, COAT_COLORS.length)],
      eyeColor: EYE_COLORS[getRandom(0, EYE_COLORS.length)]
    };
  }
  return wizards;
};

generateWizard(SIMILAR_WIZARDS_COUNT);

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
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

var similarListElement = userSetup.querySelector('.setup-similar-list');

similarListElement.appendChild(buildFragments(wizards));
