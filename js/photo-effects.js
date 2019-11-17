'use strict';

(function () {
  var imagePreview = document.querySelector('.img-upload__preview');
  var innerImage = imagePreview.children[0];
  var effectLevel = document.querySelector('.effect-level');
  var effectsRadio = document.querySelectorAll('.effects__radio');
  var sliderPin = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');
  var effectDepth = document.querySelector('.effect-level__depth');
  var checkedValue;

  var PinPosition = {
    MIN: 0,
    MAX: 450
  };
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
    changeFilterValue(PinPosition.MAX);
    if (innerImage.classList.length === 2) {
      innerImage.classList.remove(innerImage.classList[1]);
    }
    toggleScale(checkedValue);
    applyFilter(checkedValue);
  };

  // Функция создает обработчик события для всех кнопок
  var addRadioEventListeners = function () {
    for (var i = 0; i < effectsRadio.length; i++) {
      effectsRadio[i].addEventListener('click', onRadioClick);
      effectsRadio[i].addEventListener('click', onRadioClickAddSliderEvent);
    }
  };

  var onRadioClickAddSliderEvent = function () {
    sliderPin.addEventListener('mousedown', onMouseDown);
  };

  var onRadioClickRemoveSliderEvent = function () {
    sliderPin.removeEventListener('mousedown', onMouseDown);
  };

  /*
  Регулирование глубины эффекта
  */
  var changeFilterValue = function (value) {
    effectDepth.style.width = value + 'px';
    sliderPin.style.left = value + 'px';
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();
    // Считывается стартовая позиция
    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoords - levelLine.getBoundingClientRect().left;
      // Проверям не выходит ли сдвиг за пределы линии
      if (shift <= PinPosition.MIN) {
        shift = PinPosition.MIN;
      } else if (shift > PinPosition.MAX) {
        shift = PinPosition.MAX;
      }
      // Пропорционально высчитываем позицию
      var position = shift / PinPosition.MAX;
      // Обновляем позицию стартовой координаты
      startCoords = moveEvt.clientX;
      // Меняем UI
      changeFilterValue(shift);
      // Меняем глубину фильтра
      applyFilterLevel(filters[checkedValue].min, filters[checkedValue].max, filters[checkedValue].style, position, filters[checkedValue].postFix);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Функция удаляет обработчик события для всех кнопок
  var removeRadioEventListeners = function () {
    for (var i = 0; i < effectsRadio.length; i++) {
      effectsRadio[i].removeEventListener('click', onRadioClick);
      effectsRadio[i].removeEventListener('click', onRadioClickRemoveSliderEvent);
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
    sliderPin: sliderPin
  };
})();

