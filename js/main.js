'use strict';

var commentsArray = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var namesArray = ['Артем', 'Борис', 'Афанасий', 'Кекс', 'Георгий', 'Саша'];

// Функция генерации объекта комментария
function getPhotoComment() {
  var photoCommentObject = {
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: commentsArray[getRandomNumber(0, commentsArray.length - 1)],
    name: namesArray[getRandomNumber(0, namesArray.length - 1)]
  };
  return photoCommentObject;
}

// Функция получения рандомного числа в заданном диапазоне
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция получения рандомного массива чисел в заданном диапазоне
function getRandomNumberArray(numberOfGeneratedNumbers, startNumberRange, endNumberRange) {
  var intArray = [];
  // Заполняем массив
  while (intArray.length < numberOfGeneratedNumbers) {
    // Получение рандомного числа в заданном диапазоне из предыдущей функции
    var randomNumber = getRandomNumber(startNumberRange, endNumberRange);
    // Проверяем есть ли число в массиве. Если уже есть - переходим к следующей итерации цикла
    if (!intArray.includes(randomNumber)) {
      intArray.push(randomNumber);
    }
  }
  return intArray;
}

// Функция получения массива случайных комментариев
function getCommentArray(numberOfComments) {
  var comments = [];
  // Заполняем массив
  for (var i = 0; i < numberOfComments; i++) {
    comments.push(getPhotoComment());
  }
  return comments;
}

// Функция генерации карточки фото
function createPhotoCard(photoIndexArray, i) {
  return {
    url: 'photos/' + photoIndexArray[i] + '.jpg',
    description: '',
    likes: getRandomNumber(15, 200),
    comments: getCommentArray(getRandomNumber(1, 2))
  };
}

// Функция генерирует массив объектов
function getPhotoCardsArray() {
  var objects = [];
  var numberOfObjects = 25;
  var photoIndexArray = getRandomNumberArray(numberOfObjects, 1, 25);
  // Цикл для генерации 25 объектов и добавления их в массив objects
  for (var i = 0; i < numberOfObjects; i++) {
    objects.push(createPhotoCard(photoIndexArray, i));
  }
  return objects;
}

// Получаем шаблон
var pictureTemplate = document.querySelector('#picture').content.querySelector('a');

// Функция генерации DOM-элемента
function createPictureItem(item) {
  // Клонируем структуру из шаблона
  var element = pictureTemplate.cloneNode(true);
  // Выбираем элементы и заполняем их элементами массива
  var image = element.querySelector('.picture__img');
  image.src = item.url;
  var comments = element.querySelector('.picture__comments');
  comments.textContent = item.comments.join('\n');
  var likes = element.querySelector('.picture__likes');
  likes.textContent = item.likes;
  return element;
}

// Функция для заполнения фрагмента
function createPictureItemArray(array) {
  // Создаем фрагмент
  var pictureFragment = document.createDocumentFragment();
  // Заполняем фрагмент сгенерированными элементами
  for (var i = 0; i < array.length - 1; i++) {
    pictureFragment.appendChild(createPictureItem(array[i]));
  }
  return pictureFragment;
}

// Получаем контейнер для фото
var picturesContainer = document.querySelector('.pictures');

var arrayOfObjects;

// Функция для вставки фрагмента в разметку
function setPictures() {
  picturesContainer.appendChild(createPictureItemArray(arrayOfObjects));
}

// Функция инициализации
function init() {
  arrayOfObjects = getPhotoCardsArray();
  setPictures();
}

// Показываем большое изображение
var bigPicture = document.querySelector('.big-picture');

function showPicture() {
  bigPicture.classList.remove('hidden');
}

// Функция заполнения увеличенной карточки фотографии
function fillBigCard(arrayItem) {
  // Отображаем большую фотографию
  var bigImage = bigPicture.querySelector('.big-picture__img').children[0];
  bigImage.src = arrayItem.url;
  // Отображаем количество лайков
  var likesCount = bigPicture.querySelector('.likes-count');
  likesCount.textContent = arrayItem.likes;
  // Отображаем количество комментариев
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  commentsCount.textContent = arrayItem.comments.length;
  // Создаем фрагмент
  var bigPictureFragment = document.createDocumentFragment();
  // Отображаем комментарии
  var socialComments = bigPicture.querySelector('.social__comments');
  socialComments.innerHTML = '';
  for (var i = 0; i < arrayItem.comments.length; i++) {
    bigPictureFragment.appendChild(generateSocialComment(arrayItem.comments[i]));
  }
  // Вставляем фрагмент в разметку
  socialComments.appendChild(bigPictureFragment);
}

function generateSocialComment(comment) {
  // Создание элемента списка
  var newListElement = document.createElement('li');
  newListElement.className = 'social__comment';
  // Создание элемента img и добавление атрибутов
  var newImageElement = document.createElement('img');
  newImageElement.className = 'social__picture';
  newImageElement.src = comment.avatar;
  newImageElement.alt = comment.name;
  newImageElement.width = 35;
  newImageElement.height = 35;
  // Создание элемента p и запись текста комментария
  var newCommentElement = document.createElement('p');
  newCommentElement.className = 'social__text';
  newCommentElement.textContent = comment.message;
  // Добавление элементов img и p в родительский элемент li
  newListElement.appendChild(newImageElement);
  newListElement.appendChild(newCommentElement);
  return newListElement;
}

// Прячем блоки счётчика комментариев и загрузки новых комментариев
function hide() {
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  commentsCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
}

/*
Открытие и закрытие формы
*/
var imageUploadWindow = document.querySelector('.img-upload');
var uploadField = imageUploadWindow.querySelector('#upload-file');
var imageUpload = imageUploadWindow.querySelector('.img-upload__overlay');
var imageUploadCancel = imageUpload.querySelector('#upload-cancel');
var ESC_KEYCODE = 27;
var userCommentField = document.querySelector('.text__description');


// Отслеживаем событие изменения значения поля и открываем окно загрузки фото
uploadField.addEventListener('change', function () {
  imageUpload.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  effectLevel.classList.add('hidden');
  scaleControlValue.value = '100%';
  addAllEventListeners();
  addRadioEventListeners();
});

// Функция закрытия по клавише Esc, не срабатывает, когда фокус на поле хэштегов
var onPopupEscPress = function (evt) {
  if (evt.target === textHashtags) {
    return;
  } else if (evt.target === userCommentField) {
    return;
  }

  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// Функция закрытия окна загрузки фото
var closePopup = function () {
  imageUpload.classList.add('hidden');
  uploadField.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
  removeAllEventListeners();
  removeRadioEventListeners();
  clearDefault();
  if (imagePreview.classList.length === 2) {
    imagePreview.classList.remove(imagePreview.classList[1]);
  }
};

imageUploadCancel.addEventListener('click', closePopup);

/*
Применение эффекта на изображении.
*/
var imagePreview = imageUploadWindow.querySelector('.img-upload__preview');
var innerImage = imagePreview.children[0];
var effectLevel = imageUploadWindow.querySelector('.effect-level');
var effectsRadio = document.querySelectorAll('.effects__radio');
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
var sliderPin = document.querySelector('.effect-level__pin');
var levelLine = document.querySelector('.effect-level__line');
var PIN_POSITION_MAX = 450;

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

/*
Изменение масштаба изображения
*/
var scaleControlSmaller = imageUploadWindow.querySelector('.scale__control--smaller');
var scaleControlBigger = imageUploadWindow.querySelector('.scale__control--bigger');
var scaleControlValue = imageUploadWindow.querySelector('.scale__control--value');
var MIN = 25;
var STEP = 25;
var MAX = 100;

// Функция уменьшает картинку
var changeScaleSmaller = function () {
  var currentValue = parseInt(scaleControlValue.value.substr(0, scaleControlValue.value.length - 1), 10);
  if (currentValue > MIN) {
    var newValue = currentValue - STEP;
    scaleControlValue.value = newValue + '%';
    innerImage.style.transform = 'scale(' + newValue / 100 + ')';
  }
};

// Функция увеличивает картинку
var changeScaleBigger = function () {
  var currentValue = parseInt(scaleControlValue.value.substr(0, scaleControlValue.value.length - 1), 10);
  if (currentValue < MAX) {
    var newValue = currentValue + STEP;
    scaleControlValue.value = newValue + '%';
    innerImage.style.transform = 'scale(' + newValue / 100 + ')';
  }
};

// Сбрасывает вид изображения до исходного состояния
var clearDefault = function () {
  innerImage.style.transform = 'scale(1)';
  if (innerImage.classList.length === 1) {
    innerImage.classList.remove(innerImage.classList[0]);
  }
  innerImage.style.filter = 'none';
};

/*
Валидация хэштегов
*/
var textHashtags = document.querySelector('.text__hashtags');
var hashtagValue = '';
var hashtagArray = [];

// Функция находит два одинаковых элемента в массиве хэштегов
var findDuplicateHashtags = function (hashtags, hashtag) {
  var count = 0;
  for (var i = 0; i < hashtags.length; i++) {
    // Поиск нечувствителен к регистру
    if (hashtags[i].toLowerCase() === hashtag.toLowerCase()) {
      count++;
    }
  }
  return count;
};

// Функция валидации хэштегов
var checkHashtagValidity = function () {
  hashtagValue = textHashtags.value;
  hashtagArray = hashtagValue.split(' ');
  textHashtags.setCustomValidity('');
  if (hashtagArray.length <= 5) {
    for (var i = 0; i < hashtagArray.length; i++) {
      if (hashtagArray[i].length < 2 && hashtagArray[i][0] === '#') {
        textHashtags.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
        return;
      } else if (hashtagArray[i][0] !== '#') {
        textHashtags.setCustomValidity('Хэш-тег должен начинаться с решётки');
        return;
      } else if (hashtagArray[i].split('#').length < 1) {
        textHashtags.setCustomValidity('Хэш-теги должны разделяться пробелами');
        return;
      } else if (findDuplicateHashtags(hashtagArray, hashtagArray[i]) > 1) {
        textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        return;
      } else if (hashtagArray[i].length > 20) {
        textHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
        return;
      }
    }
  } else {
    textHashtags.setCustomValidity('Нельзя использовать больше пяти хэш-тегов');
  }
};

// Функция добавляет все обработчики событий
var addAllEventListeners = function () {
  // Отслеживает событие 'mouseup' на ползунке слайдера
  sliderPin.addEventListener('mouseup', getPosition);
  // Отслеживает клик по кнопке "-"
  scaleControlSmaller.addEventListener('click', changeScaleSmaller);
  // Отслеживает клик по кнопке "+"
  scaleControlBigger.addEventListener('click', changeScaleBigger);
  // Отслеживаем событие ввода хэштегов
  textHashtags.addEventListener('input', checkHashtagValidity);
};

// Функция удаляет все обработчики событий
var removeAllEventListeners = function () {
  sliderPin.removeEventListener('mouseup', getPosition);
  scaleControlSmaller.removeEventListener('click', changeScaleSmaller);
  scaleControlBigger.removeEventListener('click', changeScaleBigger);
  textHashtags.removeEventListener('input', checkHashtagValidity);
};

init();

/*
Возможность показа полноэкранной версии для каждого фото
*/
var pictureSmall = document.querySelectorAll('.picture');
var pictureCancel = document.querySelector('.big-picture__cancel');
var commentField = document.querySelector('.social__footer-text');
var ENTER_KEYCODE = 13;

// Функция поиска, возвращает индекс объекта при совпадении текущего src со значением поля url объекта
var getPhotoIndexByUrl = function (url) {
  var index = -1;
  for (var i = 0; i < arrayOfObjects.length; i++) {
    if (arrayOfObjects[i].url === url) {
      index = i;
    }
  }
  return index;
};

// Обработчик события для клика по фото
var onPhotoClick = function (evt) {
  var photoSource = evt.target.getAttribute('src');
  var index = getPhotoIndexByUrl(photoSource);
  if (index !== -1) {
    showPicture();
    fillBigCard(arrayOfObjects[index]);
    hide();
    document.addEventListener('keydown', onBigPicturePopupEscPress);
  }
};

// Функция добавляет обработчики событий всем превью фотографий
var addPhotoEventListeners = function (picturesArray) {
  for (var i = 0; i < picturesArray.length; i++) {
    picturesArray[i].addEventListener('click', onPhotoClick);
    // Не работает, обработчики не добавляются
    picturesArray[i].addEventListener('keydown', onPreviewEnterPress);
  }
};

// Функция закрытия попапа
var closeBigPicturePopup = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPicturePopupEscPress);
};

addPhotoEventListeners(pictureSmall);
pictureCancel.addEventListener('click', closeBigPicturePopup);

// Функция открытия по клавише Enter
var onPreviewEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onPhotoClick(evt);
  }
};

// Функция закрытия по клавише Esc
var onBigPicturePopupEscPress = function (evt) {
  if (evt.target === commentField) {
    return;
  }
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicturePopup();
  }
};

// Валидация комментариев
commentField.addEventListener('invalid', function () {
  if (userCommentField.validity.tooLong) {
    commentField.setCustomValidity('Комментарий не должен превышать 140 символов');
  } else {
    commentField.setCustomValidity('');
  }
});
