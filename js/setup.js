'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var SIMILAR_WIZARDS_COUNT = 4;
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');
var submitForm = setup.querySelector('.setup-wizard-form');
var playerEye = document.querySelector('.setup-player input[name="eyes-color"]');
var playerFireball = document.querySelector('.setup-player input[name="fireball-color"]');
submitForm.action = 'https://js.dump.academy/code-and-magick';
setup.querySelector('.setup-similar').classList.remove('hidden');

var popupOpen = function () {
  setup.classList.remove('hidden');
  var locationX = setup.offsetLeft;
  var locationY = setup.offsetTop;
  setup.style.left = locationX + 'px';
  setup.style.top = locationY + 'px';
  document.addEventListener('keydown', onEscClose);
};

var popupClose = function () {
  setup.classList.add('hidden');
  setup.style.left = '';
  setup.style.top = '';
  document.removeEventListener('keydown', onEscClose);
};

var onEnterOpen = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    popupOpen();
  }
};

var onEnterClose = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    popupClose();
  }
};

var onEscClose = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    popupClose();
  }
};

var onClickChangeEyeColor = function () {
  var eye = EYE_COLORS[(getRandom(0, EYE_COLORS.length - 1))];
  setupWizardEyes.style.fill = eye;
  playerEye.value = eye;
};

var onClickChangeFireballColor = function () {
  var fireball = FIREBALL_COLORS[(getRandom(0, FIREBALL_COLORS.length - 1))];
  setupWizardFireball.style.backgroundColor = fireball;
  playerFireball.value = fireball;
};

setupOpen.addEventListener('click', popupOpen);
setupOpen.addEventListener('keydown', onEnterOpen);
setupClose.addEventListener('click', popupClose);
setupClose.addEventListener('keydown', onEscClose);
setupClose.addEventListener('keydown', onEnterClose);
setupWizardEyes.addEventListener('click', onClickChangeEyeColor);
setupWizardFireball.addEventListener('click', onClickChangeFireballColor);

setupUserName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onEscClose);
});
setupUserName.addEventListener('blur', function () {
  document.addEventListener('keydown', onEscClose);
});

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

var similarListElement = setup.querySelector('.setup-similar-list');

similarListElement.appendChild(buildFragments(wizards));

// перетаскивание элементов ---------------------------------------------------

var shopElement = document.querySelector('.setup-artifacts-shop');
var artifactElemnt = document.querySelector('.setup-artifacts-cell');
artifactElemnt.dragable = true;
var draggedItem = null;
var artifactsElementsArea = document.querySelector('.setup-artifacts');

shopElement.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  }
  artifactsElementsArea.style.outline = '2px dashed red';
});

artifactsElementsArea.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  artifactsElementsArea.style.outline = '2px dashed red';
  return false;
});

artifactsElementsArea.addEventListener('drop', function (evt) {
  evt.preventDefault();
  artifactsElementsArea.style.outline = '';
  evt.target.style.backgroundColor = '';
  evt.target.appendChild(draggedItem);
});


artifactsElementsArea.addEventListener('dragenter', function (evt) {
  evt.preventDefault();
  evt.target.style.backgroundColor = 'yellow';
});

artifactsElementsArea.addEventListener('dragleave', function (evt) {
  evt.preventDefault();
  evt.target.style.backgroundColor = '';
});

