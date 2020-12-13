"use strict";

(() => {
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
  
    window.uploadedPhotos.forEach((image, photoNumber) => {
      photosContainerFragment.append(createPhoto(image, photoNumber));
    });
    
    photosContainer.append(photosContainerFragment);
  
    const showBigPhoto = (evt) => {
      window.renderBigPhoto(window.uploadedPhotos[evt.currentTarget.querySelector(".picture__img").dataset.index]);
    }

    const handlePhotoClick = (evt) => {
      window.renderBigPhoto(window.uploadedPhotos[evt.target.dataset.index]);
    }
  
    const handlePhotoKeyDown = (evt) => {
      evt.preventDefault();
      window.utils.isEnterEvent(evt, showBigPhoto);
    }
    
    photosContainer.querySelectorAll(".picture").forEach((photo) => {
      photo.addEventListener("click", handlePhotoClick);
      photo.addEventListener("keydown", handlePhotoKeyDown);
    });
  
    return  photosContainer;
})();