"use strict";

(() => {
  const AVATAR_WIDTH = 35;
  const AVATAR_HEIGHT = 35;
  const AVATAR_ALTERNATIVE_TEXT = "Аватар автора комментария";
  const MAX_SHOWN_COMMENT_COUNT = 5;
  const bigPhotoCloseButton = document.querySelector(".big-picture__cancel");

  const renderBigPhoto = (currentPhotoData) => {
    const bigPhotoWrapper = document.querySelector(".big-picture");
    const bigPhoto = bigPhotoWrapper.querySelector(".big-picture__img img");

    bigPhoto.src = currentPhotoData.url;
    bigPhotoWrapper.querySelector(".comments-count").textContent = currentPhotoData.comments.length;
    bigPhotoWrapper.querySelector(".likes-count").textContent = currentPhotoData.likes;
    bigPhotoWrapper.querySelector(".social__caption").textContent = currentPhotoData.description;
    window.utils.showElement(bigPhotoWrapper);
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
    const handleEditorCloseButtonClick = () => {
      window.utils.hideElement(bigPhotoWrapper);
    }
    bigPhotoCloseButton.addEventListener("click",handleEditorCloseButtonClick);
    renderComments();
    hideCommentsLoader();
  }
  window.renderBigPhoto = renderBigPhoto;
})();