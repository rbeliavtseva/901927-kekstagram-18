'use strict';

var commentsArray = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

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
    var commentIndex = getRandomNumber(0, commentsArray.length - 1);
    comments.push(commentsArray[commentIndex]);
  }
  return comments;
}

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

// Функция для вставки фрагмента в разметку
function setPictures() {
  picturesContainer.appendChild(createPictureItemArray(getPhotoCardsArray()));
}

// Функция инициализации
function init() {
  setPictures();
}

init();
