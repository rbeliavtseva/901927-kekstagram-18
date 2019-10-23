'use strict';

(function () {
  var imagePreview = document.querySelector('.img-upload__preview');
  var innerImage = imagePreview.children[0];
  var effectLevel = document.querySelector('.effect-level');
  var effectsRadio = document.querySelectorAll('.effects__radio');
  var sliderPin = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');
  var PIN_POSITION_MAX = 450;
  var checkedValue;
  var filters = {
    none: {
      class: 'effects__preview--none',
      style: 'none'
    },
    chrome: {
      class: 'effects__preview--chrome',
      style: 'grayscale',
      max: 1,
      min: 0
    },
    sepia: {
      class: 'effects__preview--sepia',
      style: 'sepia',
      max: 1,
      min: 0
    },
    marvin: {
      class: 'effects__preview--marvin',
      style: 'invert',
      max: 100,
      min: 0,
      postFix: '%'
    },
    phobos: {
      class: 'effects__preview--phobos',
      style: 'blur',
      max: 3,
      min: 0,
      postFix: 'px'
    },
    heat: {
      class: 'effects__preview--heat',
      style: 'brightness',
      max: 3,
      min: 1
    }
  };

  // Функция проверяет количество классов на элементе и добавляет фильтры
  var onRadioClick = function (evt) {
    checkedValue = evt.target.value;
    if (innerImage.classList.length === 2) {
      innerImage.classList.remove(innerImage.classList[1]);
      toggleScale(checkedValue);
      applyFilter(checkedValue);
    } else {
      toggleScale(checkedValue);
      applyFilter(checkedValue);
    }
  };

  // Функция создает обработчик события для всех кнопок
  var addRadioEventListeners = function () {
    for (var i = 0; i < effectsRadio.length; i++) {
      effectsRadio[i].addEventListener('click', onRadioClick);
    }
  };

  // Функция удаляет обработчик события для всех кнопок
  var removeRadioEventListeners = function () {
    for (var i = 0; i < effectsRadio.length; i++) {
      effectsRadio[i].removeEventListener('click', onRadioClick);
    }
  };

  // Функция выполняет проверку: если фильтр Оригинал, то убирает ползунок
  function toggleScale(selectedValue) {
    return selectedValue !== 'none' ? effectLevel.classList.remove('hidden') : effectLevel.classList.add('hidden');
  }

  // Функция добавления фильтра на изображение
  function applyFilter(selectedValue) {
    innerImage.classList.add(filters[selectedValue].class);
    applyFilterLevel(filters[selectedValue].min, filters[selectedValue].max, filters[selectedValue].style, 1, filters[selectedValue].postFix);
  }

  /*
  Регулирование глубины эффекта
  */
  // Функция рассчитывает позицию ползунка и применяет фильтр
  var getPosition = function (evt) {
    // Считывается позиция относительно levelLine
    var pinCoords = evt.clientX;
    var shift = pinCoords - levelLine.getBoundingClientRect().left;
    // Рассчитываем пропорцию
    var position = shift / PIN_POSITION_MAX;
    // Применение глубины фильтра пропорционально позиции ползунка
    applyFilterLevel(filters[checkedValue].min, filters[checkedValue].max, filters[checkedValue].style, position, filters[checkedValue].postFix);
  };

  // Функция рассчета глубины фильтра
  var applyFilterLevel = function (minFilterValue, maxFilterValue, styleName, positionValue, postFix) {
    var filterPostfix = postFix || '';
    var filterValue = (maxFilterValue - minFilterValue) * positionValue + minFilterValue;
    var filterStyle = styleName !== 'none' ? styleName + '(' + filterValue + filterPostfix + ')' : styleName;
    innerImage.style.filter = filterStyle;
  };

  window.photoEffects = {
    imagePreview: imagePreview,
    effectLevel: effectLevel,
    addRadioEventListeners: addRadioEventListeners,
    removeRadioEventListeners: removeRadioEventListeners,
    innerImage: innerImage,
    sliderPin: sliderPin,
    getPosition: getPosition
  };
})();

