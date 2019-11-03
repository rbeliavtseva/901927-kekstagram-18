'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  var errorTemplate = document.querySelector('#error').content.querySelector('section');
  var picturesContainer = document.querySelector('.pictures');
  var main = document.querySelector('main');
  var photoCards = [];

  // Функция генерирует массив объектов
  function shufflePhotos(photoPosts) {
    var objects = [];
    var numberOfObjects = photoPosts.length;
    var photoIndex = window.util.getRandomNumbers(numberOfObjects, 0, photoPosts.length - 1);
    // Цикл для генерации 25 объектов и добавления их в массив objects
    for (var i = 0; i < photoIndex.length; i++) {
      objects.push(photoPosts[photoIndex[i]]);
    }
    return objects;
  }

  // Функция генерации DOM-элемента
  var createPhotoPost = function (data) {
    var photoPost = pictureTemplate.cloneNode(true);
    photoPost.querySelector('.picture__img').src = data.url;
    photoPost.querySelector('.picture__comments').textContent = data.comments.length;
    photoPost.querySelector('.picture__likes').textContent = data.likes;
    return photoPost;
  };

  // Функция для заполнения фрагмента
  function createPictureItems(data) {
    var pictureFragment = document.createDocumentFragment();
    for (var i = 0; i < data.length - 1; i++) {
      pictureFragment.appendChild(createPhotoPost(data[i]));
    }
    picturesContainer.appendChild(pictureFragment);
    return pictureFragment;
  }

  var onSuccessRequest = function (response) {
    photoCards = shufflePhotos(response);
    createPictureItems(photoCards);

    window.data = {
      photoCards: photoCards
    };

    window.showBigPicture.init();
  };

  var onErrorRequest = function () {
    window.uploadPicture.closePopup();
    main.appendChild(errorPopup);
    document.addEventListener('keydown', onErrorPopupEscPress);
    var errorButtons = document.querySelectorAll('.error__button');
    for (var i = 0; i < errorButtons.length; i++) {
      errorButtons[i].addEventListener('click', function () {
        main.removeChild(errorPopup);
        document.removeEventListener('keydown', errorPopup);
      });
    }
  };

  var onErrorPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      main.removeChild(errorPopup);
    }
  };

  window.load.sendGetRequest(window.load.URL_GET, onSuccessRequest, onErrorRequest);

  /*
  Загрузка на сервер
  */
  var successSubmitTemplate = document.querySelector('#success').content.querySelector('section');
  var imgUploadControl = document.querySelector('.img-upload__label');
  var successSubmitPopup = successSubmitTemplate.cloneNode(true);
  var errorPopup = errorTemplate.cloneNode(true);

  var onSuccesSubmitRequest = function () {
    window.uploadPicture.closePopup();
    main.appendChild(successSubmitPopup);
    var successOverlay = document.querySelector('.success');
    var successButton = document.querySelector('.success__button');

    var onOverlayClick = function (evt) {
      if (evt.target === successSubmitPopup.children[0] || evt.target === successSubmitPopup.children[0].children[0]) {
        evt.stopPropagation();
        return;
      } else {
        main.removeChild(successSubmitPopup);
        removeEventListeners();
      }
    };

    var onSuccessPopupEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        main.removeChild(successSubmitPopup);
        removeEventListeners();
      }
    };

    var removeEventListeners = function () {
      successOverlay.removeEventListener('click', onOverlayClick);
      successButton.removeEventListener('click', onSuccessButtonClick);
      document.removeEventListener('keydown', onSuccessPopupEscPress);
    };

    var onSuccessButtonClick = function (evt) {
      main.removeChild(successSubmitPopup);
      evt.stopPropagation();
      removeEventListeners();
    };

    document.addEventListener('keydown', onSuccessPopupEscPress);
    successOverlay.addEventListener('click', onOverlayClick);
    successButton.addEventListener('click', onSuccessButtonClick);
    imgUploadControl.style.backgroundImage = 'none';
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.load.sendPostRequest(window.load.URL_POST, new FormData(form), onSuccesSubmitRequest, onErrorRequest);
    evt.preventDefault();
  });
})();
