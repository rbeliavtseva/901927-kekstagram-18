'use strict';

(function () {
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var MIN = 25;
  var STEP = 25;
  var MAX = 100;

  var addScaleControlsEventListeners = function () {
    // Отслеживает клик по кнопке "-"
    scaleControlSmaller.addEventListener('click', changeScaleSmaller);
    // Отслеживает клик по кнопке "+"
    scaleControlBigger.addEventListener('click', changeScaleBigger);
  };

  var removeScaleControlsEventListeners = function () {
    scaleControlSmaller.removeEventListener('click', changeScaleSmaller);
    scaleControlBigger.removeEventListener('click', changeScaleBigger);
  };

  // Функция уменьшает картинку
  var changeScaleSmaller = function () {
    var currentValue = parseInt(scaleControlValue.value.substr(0, scaleControlValue.value.length - 1), 10);
    if (currentValue > MIN) {
      var newValue = currentValue - STEP;
      scaleControlValue.value = newValue + '%';
      window.photoEffects.innerImage.style.transform = 'scale(' + newValue / 100 + ')';
    }
  };

  // Функция увеличивает картинку
  var changeScaleBigger = function () {
    var currentValue = parseInt(scaleControlValue.value.substr(0, scaleControlValue.value.length - 1), 10);
    if (currentValue < MAX) {
      var newValue = currentValue + STEP;
      scaleControlValue.value = newValue + '%';
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
    addScaleControlsEventListeners: addScaleControlsEventListeners,
    removeScaleControlsEventListeners: removeScaleControlsEventListeners,
    clearDefault: clearDefault,
    scaleControlValue: scaleControlValue
  };
})();

