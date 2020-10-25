"use strict";

const MIN_MESSAGE_COUNT = 0;
const MIN_NAME_COUNT = 0;
const MAX_LIKE_COUNT = 201;
const MIN_LIKE_COUNT = 15;
const PHOTO_COUNT = 25;
const MAX_AVATAR_COUNT = 6;
const MIN_AVATAR_COUNT = 1;
const MAX_SHOWN_COMMENT_COUNT = 5;
const MIN_COMMENT_COUNT = 0;
const MAX_COMMENT_COUNT = 10;
const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;
const AVATAR_ALTERNATIVE_TEXT = "Аватар автора комментария";
const MAX_HASH_TAGS_AMOUNT = 5;
const MAX_HASH_TAG_LENGTH = 20;

const Key = {
  ENTER: "Enter",
  ESCAPE: "Escape"
}

const COMMENTS_LIST = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
  "Моя кошка фоткает лучше.",
  "Зачетное фото.",
  "Хорошую камеру плохими руками не испортишь."
];

const NAMES_LIST = [
  "Максим",
  "Даша",
  "Настя",
  "Кирилл",
  "Руслан",
  "Виктор",
  "Саша",
  "Егор",
  "Маша",
  "Александра",
  "Юля",
  "Вася",
  "Елена",
  "Захар",
  "Карина",
  "Дима",
  "Илья",
  "Арина",
  "Эльвира",
  "Лиза",
  "Катя",
  "Зоя",
  "Надя",
  "Милана"
];

const DESCRIPTIONS_LIST = [
  "Купил новый обьектив.", 
  "Сломалась кнопка на фотоаппарате, сам фоткает.",
  "Младший брат взял побаловаться.",
  "Уронил фотик.",
  "Поехал в америку.",
  "Девушка прислала фотографию из отпуска.",
  "Новая идея пришла, решил опробовать."
];

const Effect = {
  NONE: {
    className: "effects__preview--none",
    cssName: "none",
    name: "none",
    maxValue: null,
    minValue: null,
    unit: ""
  },
  CHROME: {
    className: "effects__preview--chrome",
    cssName: "grayscale",
    name: "chrome",
    maxValue: 1,
    minValue: 0,
    unit: ""
  },
  SEPIA: {
    className: "effects__preview--sepia",
    cssName: "sepia",
    name: "sepia",
    maxValue: 1,
    minValue: 0,
    unit: ""
  },
  MARVIN: {
    className: "effects__preview--marvin",
    cssName: "invert",
    name: "marvin",
    maxValue: 100,
    minValue: 0,
    unit: "%"
  },
  PHOBOS: {
    className: "effects__preview--phobos",
    cssName: "blur",
    name: "phobos",
    maxValue: 3,
    minValue: 0,
    unit: "px"
  },
  HEAT: {
    className: "effects__preview--heat",
    cssName: "brightness",
    name: "heat",
    maxValue: 3,
    minValue: 1,
    unit: ""
  } 
}

const uploadedPhotos = [];

const showElement = (element) => {
  element.classList.remove("hidden");
}

const hideElement = (element) => {
  element.classList.add("hidden");
}

const generateRandomNumberFromRange = (minValue, maxValue) => {
  return Math.floor( Math.random() * (maxValue - minValue)) + minValue;
}

const generatePhotosData = () => {
  const generateRandomComments = () => {
    const comments = [];
    const maxCommentsAmount = generateRandomNumberFromRange(MIN_COMMENT_COUNT,MAX_COMMENT_COUNT);

    for (let i = 0; i < maxCommentsAmount; i++) {
      comments.push({
        avatar: `img/avatar-${generateRandomNumberFromRange(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT)}.svg`,
        message: COMMENTS_LIST[generateRandomNumberFromRange(MIN_MESSAGE_COUNT, COMMENTS_LIST.length)],
        name: NAMES_LIST[generateRandomNumberFromRange(MIN_NAME_COUNT, NAMES_LIST.length)] 
      });
    }
    
    return comments;
  }

  for (let i = 0; i < PHOTO_COUNT; i++) {
    uploadedPhotos.push({
      url: `photos/${i+1}.jpg`,
      likes: generateRandomNumberFromRange(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
      comments: generateRandomComments(),
      description: DESCRIPTIONS_LIST[generateRandomNumberFromRange(0, DESCRIPTIONS_LIST.length)]
    });
  }
}

const renderPhotos = () => {
  const photosContainer = document.querySelector(".pictures");
  const photosContainerFragment = new DocumentFragment();
  const photoTemplate = document.querySelector("#picture").content.querySelector(".picture");

  const createPhoto = (image, photoNumber) => {
    const photoTemplateClone = photoTemplate.cloneNode(true);
    const photo = photoTemplateClone.querySelector(".picture__img");
   
    photo.src = image.url;
    photoTemplateClone.querySelector(".picture__comments").textContent = image.comments.length;
    photoTemplateClone.querySelector(".picture__likes").textContent = image.likes;
    photo.setAttribute("data-index", photoNumber);  

    return photoTemplateClone;
  }

  uploadedPhotos.forEach((image, photoNumber) => {
    photosContainerFragment.append(createPhoto(image, photoNumber));
  });
  
  photosContainer.append(photosContainerFragment);

  const handlePhotoClick = (evt) => {
    renderBigPhoto(uploadedPhotos[evt.target.dataset.index]);
  }

  const handlePhotoKeyDown = (evt) => {
    if (evt.code === Key.ENTER) {
      evt.preventDefault();
      renderBigPhoto(uploadedPhotos[evt.target.querySelector(".picture__img").dataset.index]);
    }
  }
  
  photosContainer.querySelectorAll(".picture").forEach((photo) => {
    photo.addEventListener("click", handlePhotoClick);
    photo.addEventListener("keydown", handlePhotoKeyDown);
  });

  return  photosContainer;
}

const renderBigPhoto = (currentPhotoData) => {
  const bigPhotoWrapper = document.querySelector(".big-picture");
  const bigPhoto = bigPhotoWrapper.querySelector(".big-picture__img img");
  
  bigPhoto.src = currentPhotoData.url;
  bigPhotoWrapper.querySelector(".comments-count").textContent = currentPhotoData.comments.length;
  bigPhotoWrapper.querySelector(".likes-count").textContent = currentPhotoData.likes;
  bigPhotoWrapper.querySelector(".social__caption").textContent = currentPhotoData.description;
  bigPhotoWrapper.classList.remove("hidden");
  document.body.classList.add("modal-open");

  const renderComments = () => {
    const commentsContainer = bigPhotoWrapper.querySelector(".social__comments");
    const commentsContainerFragment = new DocumentFragment();
    const commentsCount = Math.min(currentPhotoData.comments.length, MAX_SHOWN_COMMENT_COUNT);
  
    const createAvatar = (commentAvatar) => {
      const avatar = document.createElement("img");
      avatar.className ="social__picture";
      avatar.alt = AVATAR_ALTERNATIVE_TEXT;
      avatar.width = AVATAR_WIDTH;
      avatar.height = AVATAR_HEIGHT;
      avatar.src = commentAvatar;
      
      return avatar;
    }

    const createCommentText = (commentMessage) => {
      const commentText = document.createElement("p");
      commentText.className = "social__text";
      commentText.textContent = commentMessage;

      return commentText;
    }

    const renderSingleComment = (commentNumber) => {
      const currentComment = currentPhotoData.comments[commentNumber]
      const comment = document.createElement("li");
      comment.className ="social__comment";
      comment.append(createAvatar(currentComment.avatar), createCommentText(currentComment.message));
  
      return comment;
    }

    for (let i = 0; i < commentsCount; i++) {
      commentsContainerFragment.append(renderSingleComment(i));
    }

    commentsContainer.innerHTML = "";
    commentsContainer.append(commentsContainerFragment);
  }

  const hideCommentsLoader = () => {
    bigPhotoWrapper.querySelector(".social__comment-count").classList.add("visually-hidden");
    bigPhotoWrapper.querySelector(".comments-loader").classList.add("visually-hidden");
  }

  renderComments();
  hideCommentsLoader();
}

generatePhotosData();
renderPhotos();

const initFileUpload = () => {
  const uploadPhotoOverlay = document.querySelector(".img-upload__overlay");
  const uploadPhotoInput = document.querySelector(".img-upload__input");
  const editorCloseButton = uploadPhotoOverlay.querySelector(".img-upload__cancel");
  const slider = uploadPhotoOverlay.querySelector(".img-upload__effect-level");
  const sliderPin = slider.querySelector(".effect-level__pin");
  const sliderDepth = slider.querySelector(".effect-level__depth");
  const sliderValue = slider.querySelector(".effect-level__value");
  const photoEffectsList = document.querySelectorAll(".effects__radio");
  const previewPhoto = document.querySelector(".img-upload__preview img");
  const hashTagsField = uploadPhotoOverlay.querySelector(".text__hashtags");
  const uploadPhotoForm = document.querySelector(".img-upload__form");
  
  const handleUploadPhotoInputChange = () => {
    showElement(uploadPhotoOverlay);
    hideElement(slider);
  }

  const handleEditorCloseButtonClick = () => {
    hideElement(uploadPhotoOverlay);
  }

  const handleEditorCloseButtonKeyDown = (evt) => {
    if (evt.code === Key.ESCAPE) {
      evt.preventDefault();
      hideElement(uploadPhotoOverlay);
      uploadPhotoInput.value = "";
    }
  }

  const setSliderValue = (value) => {
    sliderPin.style.left = `${value}%`;
    sliderDepth.style.width = `${value}%`;
    sliderValue.setAttribute("value", value);
  }

  const applyEffect = (currentEffect) => {
    if (currentEffect === Effect.NONE.name) {
      previewPhoto.style.filter =  "";
      hideElement(slider);
    }else{
      showElement(slider);
    }
     setSliderValue(100);

    const effect = Effect[currentEffect.toUpperCase()];
    previewPhoto.style.filter = ` ${effect.cssName}(${effect.maxValue}${effect.unit})`;
    previewPhoto.className = effect.className;
  }

  const handleSliderPinMouseDown = (evt) => {
    evt.preventDefault();
    const effectLineWidth = slider.querySelector(".effect-level__line").clientWidth;
    const effect = Effect[previewPhoto.className.substr(18, previewPhoto.className.length).toUpperCase()];
    
    const handleSliderPinMouseMove = (moveEvt) => {
      evt.preventDefault();
      let coord = moveEvt.clientX - effectLineWidth;

			if ((coord < effectLineWidth) && (coord > 0)) {
        const pinPosition = (coord / effectLineWidth) * 100 ;
        setSliderValue(pinPosition);
        previewPhoto.style.filter = `${effect.cssName}(${(effect.maxValue * sliderValue.value) / 100}${effect.unit})`;
			}
    }

    const handleSliderPinMouseUp = () => {
      document.removeEventListener("mouseup", handleSliderPinMouseUp);
      document.removeEventListener("mousemove", handleSliderPinMouseMove);
    }
    document.addEventListener("mousemove", handleSliderPinMouseMove);
    document.addEventListener("mouseup", handleSliderPinMouseUp);
  }

  const handleEffectFocus = (evt) => {
    applyEffect(evt.target.value);
  }
  
  const handleHashTagsFieldInput = () =>{
    hashTagsField.setCustomValidity(getFormValidationError());
  }
 
  const getFormValidationError = () => {
    const errorMessages = {
      noHashTagSymbol: "Хэш-тег должен начинатся с символа # (решётка).",
      hashTagFromLattice: "Хеш-тег не может состоять только из одной решётки.",
      hashTagSeparator: "Хэш-теги должны разделятся пробелами.",
      sameHashTagTwice: "Один и тот же хэш-тег не может быть использован дважды.",
      maxHashTagsAmount: "Нельзя указать больше пяти хэш-тегов.",
      maxHashTagLength: "Максимальная длина одного хэш-тега 20 символов, включая решётку."
    }

    let errorMessage = "";
    const hashTags = hashTagsField.value.toLowerCase().split(" ");
  
    const getAmountOfUniqueHashTags = (array) => {
      return  array.filter((item, index) => array.indexOf(item) != index).length;
    }

    const getFistSymbolOfHashTag = (array) => {
      let result = "";
      array.forEach((item) => { result = item[0] });

      return result;
    }

    const getSingleHashTag = (array) => {
      let result = "";
      array.forEach((item) => { result = item });

      return result;
    }
    
    const error = {  
      noHashTagSymbol: getFistSymbolOfHashTag(hashTags) != "#", // нет символа #
      hashTagFromLattice: getSingleHashTag(hashTags) === "#", // хеш-тег только из решетки
      hashTagSeparator: getSingleHashTag(hashTags).includes("#", 1),  // хеш-тег не разделяется пробелами
      sameHashTagTwice: getAmountOfUniqueHashTags(hashTags) > 0, // одинаковый хеш-тег
      maxHashTagsAmount: hashTags.length > MAX_HASH_TAGS_AMOUNT, // количество хеш-тегов больше 5
      maxHashTagLength: getSingleHashTag(hashTags).length > MAX_HASH_TAG_LENGTH, // хеш-тег превышет длину 20 символов
    };

    const getErrorMessage = () => {
      error.noHashTagSymbol ? errorMessage += errorMessages.noHashTagSymbol : "";
      error.hashTagFromLattice ? errorMessage += errorMessages.hashTagFromLattice : "";
      error.hashTagSeparator ? errorMessage += errorMessages.hashTagSeparator : "";
      error.sameHashTagTwice ? errorMessage += errorMessages.sameHashTagTwice : "";
      error.maxHashTagsAmount ? errorMessage += errorMessages.maxHashTagsAmount : "";
      error.maxHashTagLength ? errorMessage += errorMessages.maxHashTagLength : "";

      return errorMessage;
    }

   return getErrorMessage();
  }

  uploadPhotoInput.addEventListener("change", handleUploadPhotoInputChange);
  editorCloseButton.addEventListener("click", handleEditorCloseButtonClick);
  document.addEventListener("keydown", handleEditorCloseButtonKeyDown);
  sliderPin.addEventListener("mousedown", handleSliderPinMouseDown);
  hashTagsField.addEventListener("input", handleHashTagsFieldInput);

  photoEffectsList.forEach((effect) => {
    effect.addEventListener("focus", handleEffectFocus);
  });  

  hashTagsField.onfocus = () => {document.removeEventListener("keydown", handleEditorCloseButtonKeyDown)};
  hashTagsField.onblur = () => {document.addEventListener("keydown", handleEditorCloseButtonKeyDown)}  ;

}
initFileUpload();