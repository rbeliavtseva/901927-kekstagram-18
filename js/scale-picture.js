'use strict';

(function () {
  var controlSmaller = document.querySelector('.scale__control--smaller');
  var controlBigger = document.querySelector('.scale__control--bigger');
  var controlValue = document.querySelector('.scale__control--value');
  var MIN = 25;
  var STEP = 25;
  var MAX = 100;

  var addControlsEventListeners = function () {
    // Отслеживает клик по кнопке "-"
    controlSmaller.addEventListener('click', changeScaleSmaller);
    // Отслеживает клик по кнопке "+"
    controlBigger.addEventListener('click', changeScaleBigger);
  };

  var removeControlsEventListeners = function () {
    controlSmaller.removeEventListener('click', changeScaleSmaller);
    controlBigger.removeEventListener('click', changeScaleBigger);
  };

  // Функция уменьшает картинку
  var changeScaleSmaller = function () {
    var currentValue = parseInt(controlValue.value.substr(0, controlValue.value.length - 1), 10);
    if (currentValue > MIN) {
      var newValue = currentValue - STEP;
      controlValue.value = newValue + '%';
      window.photoEffects.innerImage.style.transform = 'scale(' + newValue / 100 + ')';
    }
  };

  // Функция увеличивает картинку
  var changeScaleBigger = function () {
    var currentValue = parseInt(controlValue.value.substr(0, controlValue.value.length - 1), 10);
    if (currentValue < MAX) {
      var newValue = currentValue + STEP;
      controlValue.value = newValue + '%';
      window.photoEffects.innerImage.style.transform = 'scale(' + newValue / 100 + ')';
    }
  };

  // Сбрасывает вид изображения до исходного состояния
  var clearDefault = function () {
    window.photoEffects.innerImage.style.transform = 'scale(1)';
    if (window.photoEffects.innerImage.classList.length === 1) {
      window.photoEffects.innerImage.classList.remove(window.photoEffects.innerImage.classList[0]);
    }
    window.photoEffects.innerImage.style.filter = 'none';
  };

  window.scalePicture = {
    addControlsEventListeners: addControlsEventListeners,
    removeControlsEventListeners: removeControlsEventListeners,
    clearDefault: clearDefault,
    controlValue: controlValue
  };
})();

