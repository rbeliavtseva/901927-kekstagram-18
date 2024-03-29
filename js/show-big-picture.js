'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var picturesSmall = [];
  var pictureCancel = document.querySelector('.big-picture__cancel');
  var commentField = document.querySelector('.social__footer-text');

  var showPicture = function () {
    bigPicture.classList.remove('hidden');
  };

  // Прячем блоки счётчика комментариев и загрузки новых комментариев
  var hide = function () {
    var commentsCount = bigPicture.querySelector('.social__comment-count');
    commentsCount.classList.add('visually-hidden');
  };

  // Функция поиска, возвращает индекс объекта при совпадении текущего src со значением поля url объекта
  var getPhotoIndexByUrl = function (url) {
    for (var i = 0; i < window.data.photoCards.length; i++) {
      if (window.data.photoCards[i].url === url) {
        return i;
      }
    }
    return -1;
  };

  var generateSocialComment = function (comment, isHidden) {
    // Создание элемента списка
    var newListElement = document.createElement('li');
    newListElement.className = isHidden === true ? 'social__comment visually-hidden' : 'social__comment';
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
  };

  // Функция заполнения увеличенной карточки фотографии
  var fillBigCard = function (arrayItem) {
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
      bigPictureFragment.appendChild(generateSocialComment(arrayItem.comments[i], i > 4));
    }
    if (arrayItem.comments.length > 4) {
      commentsLoadBtn.classList.remove('visually-hidden');
    } else {
      commentsLoadBtn.classList.add('visually-hidden');
    }
    // Вставляем фрагмент в разметку
    socialComments.appendChild(bigPictureFragment);
  };

  /*
    Показ комментариев
    */
  var commentsLoadBtn = document.querySelector('.comments-loader');

  var onCommentsLoadBtnClick = function () {
    var socialCommentsHidden = document.querySelectorAll('.social__comment.visually-hidden');
    var counter = socialCommentsHidden.length - 5 >= 0 ? 5 : socialCommentsHidden.length;
    for (var i = 0; i < counter; i++) {
      socialCommentsHidden[i].classList.remove('visually-hidden');
    }
    if (counter < 5) {
      commentsLoadBtn.classList.add('visually-hidden');
    }
  };

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
      commentsLoadBtn.addEventListener('click', onCommentsLoadBtnClick);
    }
  };

  // Функция открытия по клавише Enter
  var onElementKeyDown = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      onPhotoClick(evt);
    }
  };

  // Функция добавляет обработчики событий всем превью фотографий
  var addPhotoEventListeners = function (pictures) {
    for (var i = 0; i < pictures.length; i++) {
      pictures[i].addEventListener('click', onPhotoClick);
      pictures[i].addEventListener('keydown', onElementKeyDown);
    }
  };

  // Функция закрытия попапа
  var closeBigPicturePopup = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPicturePopupEscPress);
    commentsLoadBtn.removeEventListener('click', onCommentsLoadBtnClick);
  };

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

  var init = function () {
    picturesSmall = document.querySelectorAll('.picture');
    addPhotoEventListeners(picturesSmall);
  };

  window.showBigPicture = {
    commentField: commentField,
    onPhotoClick: onPhotoClick,
    onElementKeyDown: onElementKeyDown,
    init: init
  };
})();
