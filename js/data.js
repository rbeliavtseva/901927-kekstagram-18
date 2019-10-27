'use strict';

(function () {
  var comments = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var names = ['Артем', 'Борис', 'Афанасий', 'Кекс', 'Георгий', 'Саша'];
  // Получаем шаблон
  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  // Получаем контейнер для фото
  var picturesContainer = document.querySelector('.pictures');
  var photoCards;

  // Функция генерации объекта комментария
  function getPhotoComment() {
    var photoCommentObject = {
      avatar: 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg',
      message: comments[window.util.getRandomNumber(0, comments.length - 1)],
      name: names[window.util.getRandomNumber(0, names.length - 1)]
    };
    return photoCommentObject;
  }

  // Функция получения массива случайных комментариев
  function getComments(numberOfComments) {
    var randomComments = [];
    // Заполняем массив
    for (var i = 0; i < numberOfComments; i++) {
      randomComments.push(getPhotoComment());
    }
    return randomComments;
  }

  // Функция генерации карточки фото
  function createPhotoCard(photoIndexArray, i) {
    return {
      url: 'photos/' + photoIndexArray[i] + '.jpg',
      description: '',
      likes: window.util.getRandomNumber(15, 200),
      comments: getComments(window.util.getRandomNumber(1, 2))
    };
  }

  // Функция генерирует массив объектов
  function getPhotoCards() {
    var objects = [];
    var numberOfObjects = 25;
    var photoIndexArray = window.util.getRandomNumbers(numberOfObjects, 1, 25);
    // Цикл для генерации 25 объектов и добавления их в массив objects
    for (var i = 0; i < numberOfObjects; i++) {
      objects.push(createPhotoCard(photoIndexArray, i));
    }
    return objects;
  }

  // Функция генерации DOM-элемента
  function createPictureItem(item) {
    // Клонируем структуру из шаблона
    var element = pictureTemplate.cloneNode(true);
    // Выбираем элементы и заполняем их элементами массива
    var image = element.querySelector('.picture__img');
    image.src = item.url;
    var userComments = element.querySelector('.picture__comments');
    userComments.textContent = item.comments.length;
    var likes = element.querySelector('.picture__likes');
    likes.textContent = item.likes;
    return element;
  }

  // Функция для заполнения фрагмента
  function createPictureItems(photos) {
    // Создаем фрагмент
    var pictureFragment = document.createDocumentFragment();
    // Заполняем фрагмент сгенерированными элементами
    for (var i = 0; i < photos.length - 1; i++) {
      pictureFragment.appendChild(createPictureItem(photos[i]));
    }
    return pictureFragment;
  }

  // Функция для вставки фрагмента в разметку
  function setPictures() {
    picturesContainer.appendChild(createPictureItems(photoCards));
  }

  // Функция инициализации
  function init() {
    photoCards = getPhotoCards();
    setPictures();
  }

  init();

  window.data = {
    photoCards: photoCards
  };
})();
