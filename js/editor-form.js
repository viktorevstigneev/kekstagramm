"use strict";

(() => {
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
  const descriptionField = uploadPhotoOverlay.querySelector(".text__description"); 
  const uploadPhotoForm = document.querySelector(".img-upload__form");

  const MAX_SLIDER_VALUE = 100;
  const MAX_HASH_TAGS_AMOUNT = 5;
  const MAX_HASH_TAG_LENGTH = 20;

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
  
  const handleUploadPhotoInputChange = () => {
    window.utils.showElement(uploadPhotoOverlay);
    window.utils.hideElement(slider);
  }

  const handleEditorCloseButtonClick = () => {
    window.utils.hideElement(uploadPhotoOverlay);
    uploadPhotoInput.value = "";
    hashTagsField.value = "";
  }

  const handleEditorCloseButtonKeyDown = (evt) => {
    const isFieldsNotActive = (hashTagsField !== document.activeElement) && (descriptionField !== document.activeElement);
    if ((evt.code ===  window.utils.Key.ESCAPE) && (isFieldsNotActive)) {
      evt.preventDefault();
      window.utils.hideElement(uploadPhotoOverlay);
      uploadPhotoInput.value = "";
      hashTagsField.value = "";
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
      window.utils.hideElement(slider);
    }else{
      window.utils.showElement(slider);
    }
      setSliderValue(MAX_SLIDER_VALUE);

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
        const pinPosition = (coord / effectLineWidth) * MAX_SLIDER_VALUE ;
        setSliderValue(pinPosition);
        previewPhoto.style.filter = `${effect.cssName}(${(effect.maxValue * sliderValue.value) / MAX_SLIDER_VALUE}${effect.unit})`;
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
  
  const handleHashTagsFieldInput = (evt) => {
    hashTagsField.setCustomValidity(getFormValidationError(evt));
  }

  const getFormValidationError = (evt) => {
    const errorMessages = {
      noHashTagSymbol: "Хэш-тег должен начинатся с символа # (решётка). ",
      hashTagFromLattice: "Хеш-тег не может состоять только из одной решётки. ",
      hashTagSeparator: "Хэш-теги должны разделятся пробелами. ",
      sameHashTagTwice: "Один и тот же хэш-тег не может быть использован дважды. ",
      maxHashTagsAmount: "Нельзя указать больше пяти хэш-тегов. ",
      maxHashTagLength: "Максимальная длина одного хэш-тега 20 символов, включая решётку. "
    }

    const hashTags = evt.target.value.toLowerCase().split(" ").filter(hashTag => !!hashTag);
  
    const getAmountOfUniqueHashTags = (hashtags) => {
        return  hashtags.filter((item, index) => hashtags.indexOf(item) != index).length;
    }

    const getErrorsMessagesForHashTags = () => {
      const errorMessage = [];
      hashTags.forEach((hashtag) =>{
        hashtag[0] != "#" && errorMessage.push(errorMessages.noHashTagSymbol);
        hashtag === "#" && errorMessage.push(errorMessages.hashTagFromLattice);
        hashtag.includes("#", 1) && errorMessage.push(errorMessages.hashTagSeparator);
        hashtag.length > MAX_HASH_TAG_LENGTH && errorMessage.push( errorMessages.maxHashTagLength);
      });

      getAmountOfUniqueHashTags(hashTags) > 0  && errorMessage.push(errorMessages.sameHashTagTwice);
      hashTags.length > MAX_HASH_TAGS_AMOUNT && errorMessage.push(errorMessages.maxHashTagsAmount);
      const result = errorMessage.filter((item, index) => errorMessage.indexOf(item) === index).join("");
    
      return result;
    }

    return getErrorsMessagesForHashTags();
  }

  uploadPhotoInput.addEventListener("change", handleUploadPhotoInputChange);
  editorCloseButton.addEventListener("click", handleEditorCloseButtonClick);
  document.addEventListener("keydown", handleEditorCloseButtonKeyDown);
  sliderPin.addEventListener("mousedown", handleSliderPinMouseDown);
  hashTagsField.addEventListener("input", handleHashTagsFieldInput);

  photoEffectsList.forEach((effect) => {
    effect.addEventListener("focus", handleEffectFocus);
  });  
})();