'use strict';

(function () {
  // Показываем большое изображение
  var bigPicture = document.querySelector('.big-picture');

  function showPicture() {
    bigPicture.classList.remove('hidden');
  }

  // Прячем блоки счётчика комментариев и загрузки новых комментариев
  function hide() {
    var commentsLoader = bigPicture.querySelector('.comments-loader');
    var commentsCount = bigPicture.querySelector('.social__comment-count');
    commentsCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  }
  /*
  Возможность показа полноэкранной версии для каждого фото
  */
  var pictureSmall = document.querySelectorAll('.picture');
  var pictureCancel = document.querySelector('.big-picture__cancel');
  var commentField = document.querySelector('.social__footer-text');
  var ENTER_KEYCODE = 13;

  // Функция поиска, возвращает индекс объекта при совпадении текущего src со значением поля url объекта
  var getPhotoIndexByUrl = function (url) {
    for (var i = 0; i < window.data.photoCards.length; i++) {
      if (window.data.photoCards[i].url === url) {
        return i;
      }
    }
    return -1;
  };

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

  // Обработчик события для клика по фото
  var onPhotoClick = function (evt) {
    var photoSource = evt.target.getAttribute('class') === 'picture'
      ? evt.target.children[0].getAttribute('src')
      : evt.target.getAttribute('src');

    var index = getPhotoIndexByUrl(photoSource);
    if (index !== -1) {
      showPicture();
      fillBigCard(window.data.photoCards[index]);
      hide();
      document.addEventListener('keydown', onBigPicturePopupEscPress);
    }
  };

  // Функция открытия по клавише Enter
  var onElementKeyDown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onPhotoClick(evt);
    }
  };

  // Функция добавляет обработчики событий всем превью фотографий
  var addPhotoEventListeners = function (picturesArray) {
    for (var i = 0; i < picturesArray.length; i++) {
      picturesArray[i].addEventListener('click', onPhotoClick);
      picturesArray[i].addEventListener('keydown', onElementKeyDown);
    }
  };

  // Функция закрытия попапа
  var closeBigPicturePopup = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPicturePopupEscPress);
  };

  addPhotoEventListeners(pictureSmall);
  pictureCancel.addEventListener('click', closeBigPicturePopup);

  // Функция закрытия по клавише Esc
  var onBigPicturePopupEscPress = function (evt) {
    if (evt.target === commentField) {
      return;
    }
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeBigPicturePopup();
    }
  };

  window.showBigPicture = {
    commentField: commentField
  };
})();
