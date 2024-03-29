'use strict';

(function () {
  /*
  Валидация хэштегов
  */
  var textHashtags = document.querySelector('.text__hashtags');
  var userCommentField = document.querySelector('.text__description');
  var submitButton = document.querySelector('#upload-submit');
  var hashtagValue = '';
  var hashtags = [];
  var hastagIsValid = true;

  // Функция находит два одинаковых элемента в массиве хэштегов
  var findDuplicateHashtags = function (hashtagsToCheck, item) {
    var count = 0;
    for (var i = 0; i < hashtagsToCheck.length; i++) {
      // Поиск нечувствителен к регистру
      if (hashtagsToCheck[i].toLowerCase() === item.toLowerCase()) {
        count++;
      }
    }
    return count;
  };

  // Функция валидации хэштегов
  var checkHashtagValidity = function () {
    hastagIsValid = true;
    hashtagValue = textHashtags.value;
    hashtags = hashtagValue.split(' ')
      .filter(function (item) {
        return item.length !== 0;
      });
    textHashtags.setCustomValidity('');
    if (hashtags.length <= 5) {
      for (var i = 0; i < hashtags.length; i++) {
        if (hashtags[i].length < 2 && hashtags[i][0] === '#') {
          textHashtags.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
          hastagIsValid = false;
          break;
        } else if (hashtags[i][0] !== '#') {
          textHashtags.setCustomValidity('Хэш-тег должен начинаться с решётки');
          hastagIsValid = false;
          break;
        } else if (hashtags[i].split('#')
            .filter(function (item) {
              return item.length !== 0;
            }).length > 1) {
          textHashtags.setCustomValidity('Хэш-теги должны разделяться пробелами');
          hastagIsValid = false;
          break;
        } else if (findDuplicateHashtags(hashtags, hashtags[i]) > 1) {
          textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
          hastagIsValid = false;
          break;
        } else if (hashtags[i].length > 20) {
          textHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
          hastagIsValid = false;
          break;
        }
      }
    } else {
      textHashtags.setCustomValidity('Нельзя использовать больше пяти хэш-тегов');
      hastagIsValid = false;
    }
  };

  var onSubmitButtonClick = function () {
    if (!hastagIsValid) {
      textHashtags.style.outline = '3px solid red';
    }
  };

  var clearForm = function () {
    textHashtags.style.outline = 'none';
    textHashtags.setCustomValidity('');
  };

  // Валидация комментариев
  window.showBigPicture.commentField.addEventListener('invalid', function () {
    if (userCommentField.validity.tooLong) {
      window.showBigPicture.commentField.setCustomValidity('Комментарий не должен превышать 140 символов');
    } else {
      window.showBigPicture.commentField.setCustomValidity('');
    }
  });

  textHashtags.addEventListener('input', function () {
    clearForm();
  });

  submitButton.addEventListener('click', onSubmitButtonClick);

  window.validation = {
    textHashtags: textHashtags,
    userCommentField: userCommentField,
    checkHashtagValidity: checkHashtagValidity,
    clearForm: clearForm
  };
})();
