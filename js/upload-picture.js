'use strict';

(function () {
  /*
  Открытие и закрытие формы
  */
  var imageUploadWindow = document.querySelector('.img-upload');
  var uploadField = imageUploadWindow.querySelector('#upload-file');
  var imageUpload = imageUploadWindow.querySelector('.img-upload__overlay');
  var imageUploadCancel = imageUpload.querySelector('#upload-cancel');

  // Отслеживаем событие изменения значения поля и открываем окно загрузки фото
  uploadField.addEventListener('change', function () {
    imageUpload.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.photoEffects.effectLevel.classList.add('hidden');
    window.scalePicture.controlValue.value = '100%';
    // window.photoEffects.sliderPin.addEventListener('mousedown', window.photoEffects.getPosition);
    window.scalePicture.addControlsEventListeners();
    window.validation.textHashtags.addEventListener('input', window.validation.checkHashtagValidity);
    window.photoEffects.addRadioEventListeners();
  });

  // Функция закрытия по клавише Esc, не срабатывает, когда фокус на поле хэштегов
  var onPopupEscPress = function (evt) {
    if (evt.target === window.validation.textHashtags) {
      return;
    } else if (evt.target === window.validation.userCommentField) {
      return;
    }

    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  var clearValues = function () {
    uploadField.value = '';
    window.validation.textHashtags.value = '';
    window.validation.userCommentField.value = '';
  };

  // Функция закрытия окна загрузки фото
  var closePopup = function () {
    imageUpload.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    window.photoEffects.sliderPin.removeEventListener('mousedown', window.photoEffects.getPosition);
    window.scalePicture.removeControlsEventListeners();
    window.validation.textHashtags.removeEventListener('input', window.validation.checkHashtagValidity);
    window.photoEffects.removeRadioEventListeners();
    clearValues();
    window.validation.clearFormValidation();
    window.scalePicture.clearDefault();
    if (window.photoEffects.imagePreview.classList.length === 2) {
      window.photoEffects.imagePreview.classList.remove(window.photoEffects.imagePreview.classList[1]);
    }
  };

  imageUploadCancel.addEventListener('click', closePopup);

  window.uploadPicture = {
    closePopup: closePopup
  };
})();
