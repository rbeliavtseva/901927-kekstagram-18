'use strict';

(function () {
  /*
  Валидация хэштегов
  */
  var textHashtags = document.querySelector('.text__hashtags');
  var userCommentField = document.querySelector('.text__description');
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

  // Валидация комментариев
  window.showBigPicture.commentField.addEventListener('invalid', function () {
    if (userCommentField.validity.tooLong) {
      window.showBigPicture.commentField.setCustomValidity('Комментарий не должен превышать 140 символов');
    } else {
      window.showBigPicture.commentField.setCustomValidity('');
    }
  });

  window.validation = {
    textHashtags: textHashtags,
    userCommentField: userCommentField,
    checkHashtagValidity: checkHashtagValidity
  };
})();
