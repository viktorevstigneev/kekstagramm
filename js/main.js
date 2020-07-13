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
const AVATAR_ALTERNATIVE_TEXT = "автатар автора комментария";

const PHOTOS_LIST = [
  "photos/1.jpg",
  "photos/2.jpg",
  "photos/3.jpg",
  "photos/4.jpg",
  "photos/5.jpg",
  "photos/6.jpg",
  "photos/7.jpg",
  "photos/8.jpg",
  "photos/9.jpg",
  "photos/10.jpg",
  "photos/11.jpg",
  "photos/12.jpg",
  "photos/13.jpg",
  "photos/14.jpg",
  "photos/15.jpg",
  "photos/16.jpg",
  "photos/17.jpg",
  "photos/18.jpg",
  "photos/19.jpg",
  "photos/20.jpg",
  "photos/21.jpg",
  "photos/22.jpg",
  "photos/23.jpg",
  "photos/24.jpg",
  "photos/25.jpg"
];

const COMMENTS_LIST = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
  "Моя кошка фоткает лучше",
  "Зачетное фото",
  "Хорошую камеру плохими руками не испортишь"
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
  "купил новый обьектив", 
  "сломалась кнопка на фотоаппарате, сам фоткает",
  "младший брат взял побаловаться",
  "уронил фотик",
  "поехал в америку",
  "девушка прислала фотографию из отпуска",
  "новая идея пришла, решил опробовать"
];

const uploadedPhotos = [];

const generateRandomNumberFromRange = (minValue, maxValue) =>{
  return Math.floor( Math.random() * (maxValue - minValue)) + minValue;
}

const generateRandomComments = () =>{
    const postedCommentsList = [];
    const maxCommentsAmount = generateRandomNumberFromRange(MIN_COMMENTS_COUNT,MAX_COMMENTS_COUNT);

    for (let i = 0; i < maxCommentsAmount; i++) {
      postedCommentsList.push({
        avatar: "img/avatar-" + generateRandomNumberFromRange(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT) + ".svg",
        message: COMMENTS_LIST[generateRandomNumberFromRange(MIN_MESSAGE_COUNT, COMMENTS_LIST.length)],
        name: NAMES_LIST[generateRandomNumberFromRange(MIN_NAME_COUNT, NAMES_LIST.length)] 
      });
    }
    return postedCommentsList;
}
 
const generatePhotosData = () =>{
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
  const photosContainerFragment =  new DocumentFragment();

  const createPhoto = (photoNumber) =>{
    //сори что не сделал это,не могу уже,может ты подскажешь почему
    const photoTemplate = document.querySelector("#picture").cloneNode(true);// выносил я эту строку 25 раз минимум , оно перестает рабоать,я не смог решиить это ,может просто уже дохера сижу ,но вообще нет,я долго думал над решением,вообще не понимаю в чем может быть проблема,так пару мысле было но хз
    const commentsAmount = photoTemplate.content.querySelector(".picture__comments");
    const photo = photoTemplate.content.querySelector(".picture__img");
    const likesAmount = photoTemplate.content.querySelector(".picture__likes");
    const currentPhotoData = uploadedPhotos[photoNumber];
  
    likesAmount.textContent = currentPhotoData.likes; 
    photo.src = currentPhotoData.url;
    commentsAmount.textContent = currentPhotoData.comments.length; 
    photo.setAttribute("data-index", photoNumber);  
  
    return photoTemplate.content;
  }

  for (let i = 0; i < uploadedPhotos.length; i++) {//ты мне как-то говорил раньше что нужно использовать декларативное прогрммирование,что таким циклом делать плохо,что нужно стараться пользоваться форичем и прочими штуками,а тут ты почему ничего не говоришь?
    photosContainerFragment.append(createPhoto(i));
  }
  
  photosContainer.append(photosContainerFragment);

  //если эти обьявления функций перенести выше,чтобы не разрывать обьявления функций оно работать не будет
  const photos = document.querySelectorAll(".picture");//даже если эту строку вынести наверх оно перестанет работать,в принципе я даже понимаю почему

  const handlePhotoClick = (evt) => {
    renderBigPhoto(evt.target.getAttribute("data-index"));
  }

  const handlePhotoKeyDown = (evt) => {
    if (evt.code === "Enter") {
      evt.preventDefault();
      renderBigPhoto(evt.target.querySelector(".picture__img").getAttribute("data-index"));
    }
  }
  
  photos.forEach((photo) => {
    photo.addEventListener("click", handlePhotoClick);
    photo.addEventListener("keydown", handlePhotoKeyDown);
  });
  

  return  photosContainer;
}

const renderBigPhoto = (photoNumber) =>{
  const bigPhotoWrapper = document.querySelector(".big-picture");
  const bigPhoto = bigPhotoWrapper.querySelector(".big-picture__img img");
  const bigPhotoLikesAmount =  bigPhotoWrapper.querySelector(".likes-count");
  const bigPhotoCommentAmount =  bigPhotoWrapper.querySelector(".comments-count");
  const bigPhotoDesription = bigPhotoWrapper.querySelector(".social__caption");
  const currentPhotoData =  uploadedPhotos[photoNumber];

  bigPhoto.src = currentPhotoData.url;
  bigPhotoCommentAmount.textContent = currentPhotoData.comments.length;
  bigPhotoLikesAmount.textContent = currentPhotoData.likes;
  bigPhotoDesription.textContent = currentPhotoData.description;
  bigPhotoWrapper.classList.remove("hidden");

  const renderComments = (photoNumber) =>{

    const commentsContainer = bigPhotoWrapper.querySelector(".social__comments");
    const commentsContainerFragment =  new DocumentFragment();
    const commentsCount = Math.min(currentPhotoData.comments.length, MAX_SHOWN_COMMENTS_COUNT);
  
    const renderSingleComment = (source, text) =>{
      const comment = document.createElement("li");
      comment.className ="social__comment";
    
      const createAvatar = () =>{
        const avatar = document.createElement("img");
        avatar.className ="social__picture";
        avatar.alt = AVATAR_ALTERNATIVE_TEXT;
        avatar.width = AVATAR_WIDTH;
        avatar.height = AVATAR_HEIGHT;
        avatar.src = source;
        
        return avatar;
      }
    
      const createCommentText = () =>{
        const commentText = document.createElement("p");
        commentText.className = "social__text";
        commentText.textContent = text;

        return commentText;
      }

      comment.append(createAvatar(),createCommentText());
  
      return comment;
    }

    for(let i = 0; i < commentsCount; i++){
      commentsContainerFragment.append(renderSingleComment( currentPhotoData.comments[i].avatar, currentPhotoData.comments[i].message));
    }

    commentsContainer.innerHTML = "";
    commentsContainer.append(commentsContainerFragment);
  }

  const hideCommentsLoader = () => {
    bigPhotoWrapper.querySelector(".social__comment-count").classList.add("visually-hidden");
    bigPhotoWrapper.querySelector(".comments-loader").classList.add("visually-hidden");
  }

  renderComments(photoNumber);
  hideCommentsLoader();
}

generatePhotosData();
renderPhotos();
  
