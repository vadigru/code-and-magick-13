'use strict';

(function () {

  // dialog window drag-n-drop ------------------------------------------------

  var setupUserPic = window.const.setupElement.querySelector('.setup-user-pic');
  setupUserPic.style.zIndex = '1';

  setupUserPic.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.const.setupElement.style.top = window.const.setupElement.offsetTop - shift.y + 'px';
      window.const.setupElement.style.left = window.const.setupElement.offsetLeft - shift.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // elements drag-n-drop -----------------------------------------------------

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
})();
