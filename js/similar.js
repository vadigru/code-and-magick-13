'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard = {
    onEyesChange: function (color) {
      eyesColor = color;
      window.debounce(updateWizards);
    },

    onCoatChange: function (color) {
      coatColor = color;
      window.debounce(updateWizards);
    }
  };

  var onLoadSuccessHandle = function (data) {
    wizards = data;
    updateWizards();
  };

  var onLoadErrorHandle = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: white; color: red; line-height: 50px; padding: 25px; box-shadow: 10px 10px 0 0 rgba(0, 0, 0, 0.8); cursor: pointer;';
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

  window.backend.load(onLoadSuccessHandle, onLoadErrorHandle);
})();
