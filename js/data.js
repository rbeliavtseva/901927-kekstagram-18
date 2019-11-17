'use strict';

(function () {
  var MAX_NUMBER_OF_OBJECTS = 25;
  var FILTERED_NUMBER_OF_OBJECTS = 10;
  var currentTargetId = 'filter-popular';
  var currentFilter = 'filter-popular';
  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  var errorTemplate = document.querySelector('#error').content.querySelector('section');
  var errorPopup = errorTemplate.cloneNode(true);
  var picturesContainer = document.querySelector('.pictures');
  var main = document.querySelector('main');
  var filtersSection = document.querySelector('.img-filters');
  var filters = document.querySelectorAll('.img-filters__button');
  var photoCards = [];

  // Функция генерирует массив объектов
  var shufflePhotos = function (photoPosts, length) {
    var objects = [];
    var numberOfObjects = photoPosts.length;
    var photoIndex = window.util.getRandomNumbers(numberOfObjects, 0, photoPosts.length - 1);
    for (var i = 0; i < length; i++) {
      objects.push(photoPosts[photoIndex[i]]);
    }
    return objects;
  };

  // Функция генерации DOM-элемента
  var createPhotoPost = function (data) {
    var photoPost = pictureTemplate.cloneNode(true);
    photoPost.querySelector('.picture__img').src = data.url;
    photoPost.querySelector('.picture__comments').textContent = data.comments.length;
    photoPost.querySelector('.picture__likes').textContent = data.likes;
    return photoPost;
  };

  // Функция для заполнения фрагмента
  var createPictureItems = function (data) {
    var pictureFragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      pictureFragment.appendChild(createPhotoPost(data[i]));
    }
    picturesContainer.appendChild(pictureFragment);
    return pictureFragment;
  };

  var onSuccessRequest = function (response) {
    photoCards = shufflePhotos(response, MAX_NUMBER_OF_OBJECTS);
    createPictureItems(photoCards);

    window.data = {
      photoCards: photoCards
    };

    window.showBigPicture.init();
    filtersSection.classList.remove('img-filters--inactive');
  };

  var onErrorRequest = function (errorMessage) {
    window.uploadPicture.closePopup();
    main.appendChild(errorPopup);
    var errorTitle = document.querySelector('.error__title');
    errorTitle.textContent = errorMessage;
    document.addEventListener('keydown', onErrorPopupEscPress);
    var errorOverlay = document.querySelector('.error');
    var errorButtons = document.querySelectorAll('.error__button');
    for (var i = 0; i < errorButtons.length; i++) {
      errorButtons[i].addEventListener('click', function () {
        errorPopup.remove();
        document.removeEventListener('keydown', errorPopup);
      });
    }
    var onErrorOverlayClick = function (evt) {
      if (evt.target === errorPopup.children[0] || evt.target === errorPopup.children[0].children[0]) {
        evt.stopPropagation();
        return;
      } else {
        errorPopup.remove();
        errorOverlay.addEventListener('click', onErrorOverlayClick);
      }
    };

    errorOverlay.addEventListener('click', onErrorOverlayClick);
  };

  var onErrorPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      main.removeChild(errorPopup);
    }
  };

  window.load.sendGetRequest(window.load.URL_GET, onSuccessRequest, onErrorRequest);

  /*
  Фильтрация фото
  */
  var idToSort = {
    'filter-popular': function (photos) {
      return photos;
    },
    'filter-random': function (photos) {
      return shufflePhotos(photos, FILTERED_NUMBER_OF_OBJECTS);
    },
    'filter-discussed': function (photos) {
      return photos.sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
    }
  };

  var onSortButtonClick = function (evt) {
    if (evt.target.id !== currentTargetId) {
      debouncedRenderFunction.call(null, evt);
      disableButton(evt);
      currentTargetId = evt.target.id;
    }
  };

  var renderFunction = function (evt) {
    if (currentFilter !== evt.target.id) {
      var photoCardsCopy = photoCards.slice();
      var sorted = idToSort[evt.target.id](photoCardsCopy);
      clearPhotoCards();
      createPictureItems(sorted);
      window.showBigPicture.init();
      currentFilter = evt.target.id;
    }
  };

  var debouncedRenderFunction = window.debounce(renderFunction);

  var clearPhotoCards = function () {
    var photosList = document.querySelectorAll('.picture');
    photosList.forEach(function (photo) {
      photo.parentElement.removeChild(photo);
    });
  };

  var disableButton = function (evt) {
    filters.forEach(function (filter) {
      filter.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
  };

  filters.forEach(function (filter) {
    filter.addEventListener('click', onSortButtonClick);
  });

  /*
  Загрузка на сервер
  */
  var successSubmitTemplate = document.querySelector('#success').content.querySelector('section');
  var successSubmitPopup = successSubmitTemplate.cloneNode(true);

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
        successSubmitPopup.remove();
        removeEventListeners();
      }
    };

    var onSuccessPopupEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        successSubmitPopup.remove();
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
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.load.sendPostRequest(window.load.URL_POST, new FormData(form), onSuccesSubmitRequest, onErrorRequest);
    evt.preventDefault();
  });
})();
