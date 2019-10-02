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

init();
showPicture();
