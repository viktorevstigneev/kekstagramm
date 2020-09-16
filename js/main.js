"use strict";

const MIN_MESSAGE_COUNT = 0;
const MIN_NAME_COUNT = 0;
const MAX_LIKES_COUNT = 201;
const MIN_LIKES_COUNT = 15;
const PHOTOS_COUNT = 25;
const MAX_AVATAR_COUNT = 6;
const MIN_AVATAR_COUNT = 1;
const MAX_SHOWN_COMMENTS_COUNT = 5;
const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 10;
const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;
const AVATAR_ALTERNATIVE_TEXT = "Аватар автора комментария";
const ENTER = "Enter";
const ESCAPE = "Escape";

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

const DESCRIPTION_LIST = [
  "Купил новый обьектив.", 
  "Сломалась кнопка на фотоаппарате, сам фоткает.",
  "Младший брат взял побаловаться.",
  "Уронил фотик.",
  "Поехал в америку.",
  "Девушка прислала фотографию из отпуска.",
  "Новая идея пришла, решил опробовать."
];

const EFFECT_LIST = {
  none: "none",
  chrome: "grayscale",
  sepia: "sepia",
  marvin: "invert",
  phobos: "blur",
  heat: "brightness"
};

const uploadedPhotos = [];

const generateRandomNumberFromRange = (minValue, maxValue) =>{
  return Math.floor( Math.random() * (maxValue - minValue)) + minValue;
}

const generatePhotosData = () =>{
  const generateRandomComments = () =>{
    const comments = [];
    const maxCommentsAmount = generateRandomNumberFromRange(MIN_COMMENTS_COUNT,MAX_COMMENTS_COUNT);

    for (let i = 0; i < maxCommentsAmount; i++) {
      comments.push({
        avatar: "img/avatar-" + generateRandomNumberFromRange(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT) + ".svg",
        message: COMMENTS_LIST[generateRandomNumberFromRange(MIN_MESSAGE_COUNT, COMMENTS_LIST.length)],
        name: NAMES_LIST[generateRandomNumberFromRange(MIN_NAME_COUNT, NAMES_LIST.length)] 
      });
    }
    
    return comments;
  }

  for (let i = 0; i < PHOTOS_COUNT; i++) {
    uploadedPhotos.push({
      url: `photos/${i+1}.jpg`,
      likes: generateRandomNumberFromRange(MIN_LIKES_COUNT,MAX_LIKES_COUNT),
      comments: generateRandomComments(),
      description: DESCRIPTION_LIST[generateRandomNumberFromRange(0,DESCRIPTION_LIST.length)]
    });
  }
}

const renderPhotos = () =>{
  const photosContainer = document.querySelector(".pictures");
  const photosContainerFragment = new DocumentFragment();
  const photoTemplate = document.querySelector("#picture").content.querySelector(".picture");

  const createPhoto = (image, photoNumber) =>{
    const photoTemplateClone = photoTemplate.cloneNode(true);
    const photo = photoTemplateClone.querySelector(".picture__img");
    const photoCommentsAmount = photoTemplateClone.querySelector(".picture__comments");
    const photoLikesAmount = photoTemplateClone.querySelector(".picture__likes");

    photo.src = image.url;
    photoCommentsAmount.textContent = image.comments.length;
    photoLikesAmount.textContent = image.likes;
    photo.setAttribute("data-index", photoNumber);  

    return photoTemplateClone;
  }

  uploadedPhotos.forEach((image, photoNumber) =>{
    photosContainerFragment.append(createPhoto(image, photoNumber));
  });
  
  photosContainer.append(photosContainerFragment);

  const handlePhotoClick = (evt) =>{
    renderBigPhoto(uploadedPhotos[evt.target.dataset.index]);
  }

  const handlePhotoKeyDown = (evt) =>{
    if (evt.code === ENTER) {
      evt.preventDefault();
      renderBigPhoto(uploadedPhotos[evt.target.querySelector(".picture__img").dataset.index]);
    }
  }
  
  photosContainer.querySelectorAll(".picture").forEach((photo) =>{
    photo.addEventListener("click", handlePhotoClick);
    photo.addEventListener("keydown", handlePhotoKeyDown);
  });

  return  photosContainer;
}

const renderBigPhoto = (currentPhotoData) =>{
  const bigPhotoWrapper = document.querySelector(".big-picture");
  const bigPhoto = bigPhotoWrapper.querySelector(".big-picture__img img");
  const bigPhotoLikesAmount =  bigPhotoWrapper.querySelector(".likes-count");
  const bigPhotoCommentAmount =  bigPhotoWrapper.querySelector(".comments-count");
  const bigPhotoDesription = bigPhotoWrapper.querySelector(".social__caption");
  
  bigPhoto.src = currentPhotoData.url;
  bigPhotoCommentAmount.textContent = currentPhotoData.comments.length;
  bigPhotoLikesAmount.textContent = currentPhotoData.likes;
  bigPhotoDesription.textContent = currentPhotoData.description;
  bigPhotoWrapper.classList.remove("hidden");
  document.body.classList.add("modal-open");

  const renderComments = () =>{
    const commentsContainer = bigPhotoWrapper.querySelector(".social__comments");
    const commentsContainerFragment = new DocumentFragment();
    const commentsCount = Math.min(currentPhotoData.comments.length, MAX_SHOWN_COMMENTS_COUNT);
  
    const createAvatar = (commentAvatar) =>{
      const avatar = document.createElement("img");
      avatar.className ="social__picture";
      avatar.alt = AVATAR_ALTERNATIVE_TEXT;
      avatar.width = AVATAR_WIDTH;
      avatar.height = AVATAR_HEIGHT;
      avatar.src = commentAvatar;
      
      return avatar;
    }

    const createCommentText = (commentMessage) =>{
      const commentText = document.createElement("p");
      commentText.className = "social__text";
      commentText.textContent = commentMessage;

      return commentText;
    }

    const renderSingleComment = (commentNumber) =>{
      const currentComment = currentPhotoData.comments[commentNumber]
      const comment = document.createElement("li");
      comment.className ="social__comment";
      comment.append(createAvatar(currentComment.avatar), createCommentText(currentComment.message));
  
      return comment;
    }

    for (let i = 0; i < commentsCount; i++){
      commentsContainerFragment.append(renderSingleComment(i));
    }

    commentsContainer.innerHTML = "";
    commentsContainer.append(commentsContainerFragment);
  }

  const hideCommentsLoader = () =>{
    bigPhotoWrapper.querySelector(".social__comment-count").classList.add("visually-hidden");
    bigPhotoWrapper.querySelector(".comments-loader").classList.add("visually-hidden");
  }

  renderComments();
  hideCommentsLoader();
}

generatePhotosData();
renderPhotos();

const renderEditorForm = () =>{
  const uploadPhotoOverlay = document.querySelector(".img-upload__overlay");
  const uploadPhotoInput = document.querySelector(".img-upload__input");
  const editorCloseButton = uploadPhotoOverlay.querySelector(".img-upload__cancel");
  const slider = uploadPhotoOverlay.querySelector(".img-upload__effect-level");
  const sliderPin = slider.querySelector(".effect-level__pin");
  const sliderDepth = slider.querySelector(".effect-level__depth");
  const sliderValue = slider.querySelector(".effect-level__value");
  const photoEffectsList = document.querySelectorAll(".effects__radio");
  const previewPhoto = document.querySelector(".img-upload__preview img");
 
  const handleUploadPhotoChange = () =>{
    uploadPhotoOverlay.classList.remove("hidden");
  }

  const handleEditorCloseButtonClick = () =>{
    uploadPhotoOverlay.classList.add("hidden");
  }

  const handleEditorCloseButtonKeyDown = (evt) =>{
    if (evt.code === ESCAPE) {
      evt.preventDefault();
      uploadPhotoOverlay.classList.add("hidden");
    }
  }

  const setSliderValue = (value) =>{
    sliderPin .style.left = `${value}%`;
    sliderDepth.style.width = `${value}%`;
    sliderValue.setAttribute("value",value);
  }

  // работа со слайдером
  const handleSliderPinMouseDown = (evt) =>{
    evt.preventDefault();

    var startX = evt.clientX;
    var effectLineWidth = document.querySelector('.effect-level__line').clientWidth;

    
    const handleSliderPinMouseMove = (moveEvt) =>{
      evt.preventDefault();
      
      var shiftX = startX - moveEvt.clientX;
      var pinPositionInPercent = ((sliderPin.offsetLeft - shiftX) / effectLineWidth) * 100;
   
      startX = moveEvt.clientX;

      if (pinPositionInPercent > 100) {
        pinPositionInPercent = 100;
      } 
       if (pinPositionInPercent < 0) {
        pinPositionInPercent = 0;
      }

      setSliderValue(pinPositionInPercent);
      previewPhoto.style.filter = `${EFFECT_LIST[previewPhoto.className]}(${sliderValue.value}%)`;
      
    }

    const handleSliderPinMouseUp = () =>{
      document.removeEventListener('mouseup', handleSliderPinMouseUp);
      document.removeEventListener('mousemove', handleSliderPinMouseMove);
    }

    document.addEventListener('mousemove', handleSliderPinMouseMove);
    document.addEventListener('mouseup', handleSliderPinMouseUp);
  }

  uploadPhotoInput.addEventListener("change",handleUploadPhotoChange);
  editorCloseButton.addEventListener("click",handleEditorCloseButtonClick);
  document.addEventListener("keydown",handleEditorCloseButtonKeyDown);
  sliderPin.addEventListener("mousedown",handleSliderPinMouseDown);

  //работа с эффектами
  const applyEffect = (currentEffect) =>{
    if(currentEffect === "none"){
      previewPhoto.style.filter =  "";
    }
      setSliderValue(100);
      previewPhoto.style.filter = `${EFFECT_LIST[currentEffect]}(${sliderValue.value}%)`
      previewPhoto.className = currentEffect;
      
      
  }
   
  const handleEffectClick = (evt) =>{
    applyEffect(evt.target.value);
  }
  
  photoEffectsList.forEach((effect) =>{
    effect.addEventListener("click", handleEffectClick);
  });

}
renderEditorForm();