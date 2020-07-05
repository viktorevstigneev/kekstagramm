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
const PHOTOS_AVATAR_WIDTH = 35;
const PHOTOS_AVATAR_HEIGHT = 35;
const PHOTOS_AVATAR_ALTERNATIVE_TEXT = "автатар автора комментария";

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

const  createPhoto = (photoNumber) =>{
  const photoTemplate = document.querySelector("#picture").cloneNode(true);
  const commentsAmount = photoTemplate.content.querySelector(".picture__comments");
  const photo = photoTemplate.content.querySelector(".picture__img");
  const likesAmount = photoTemplate.content.querySelector(".picture__likes");
  const currentPhoto = uploadedPhotos[photoNumber];

  likesAmount.textContent = currentPhoto.likes; 
  photo.src = currentPhoto.url;
  commentsAmount.textContent = currentPhoto.comments.length; 
 
  return photoTemplate.content;
}

const renderPhotos = () =>{
  const photosContainer = document.querySelector(".pictures");
  const photosContainerFragment =  new DocumentFragment();

  for (let i = 0; i < uploadedPhotos.length; i++) {
    photosContainerFragment.append(createPhoto(i));
  }
  photosContainer.append(photosContainerFragment);
  return  photosContainer;
}

const showBigPhoto = (photoNumber) =>{
  const bigPhotoElement = document.querySelector(".big-picture");
  bigPhotoElement.classList.remove("hidden");
  
  const currentPhoto =  uploadedPhotos[photoNumber];// я хз, название же норм вроде
  const bigPhoto = bigPhotoElement.querySelector(".big-picture__img img");
  const bigPhotoLikesAmount =  bigPhotoElement.querySelector(".likes-count");
  const bigPhotoCommentAmount =  bigPhotoElement.querySelector(".comments-count");
  const bigPhotoDesription = bigPhotoElement.querySelector(".social__caption");

  bigPhoto.src = currentPhoto.url;
  bigPhotoCommentAmount.textContent = currentPhoto.comments.length;
  bigPhotoLikesAmount.textContent = currentPhoto.likes;
  bigPhotoDesription.textContent = currentPhoto.description;

  renderComments(photoNumber);
}

const renderSingleComment = (source, text) =>{
  const comment = document.createElement("li");
  comment.className ="social__comment";

  const avatar = document.createElement("img");
  avatar.className ="social__picture";
  avatar.alt = PHOTOS_AVATAR_ALTERNATIVE_TEXT;
  avatar.width = PHOTOS_AVATAR_WIDTH;
  avatar.height = PHOTOS_AVATAR_HEIGHT;
  avatar.src = source;

  const commentText = document.createElement("p");
  commentText.className = "social__text";
  commentText.textContent = text;

  comment.append(avatar);
  comment.append(commentText);

  return comment;
}

const renderComments = (photoNumber) =>{
  const commentsContainer = document.querySelector(".social__comments");
  const commentsContainerFragment =  new DocumentFragment();
  const currentPhoto = uploadedPhotos[photoNumber];
  const commentsCount = Math.min(currentPhoto.comments.length, MAX_SHOWN_COMMENTS_COUNT);

  for(let i = 0; i < commentsCount; i++){
    commentsContainerFragment.append(renderSingleComment( currentPhoto.comments[i].avatar, currentPhoto.comments[i].message));
  }

  commentsContainer.innerHTML="";
  commentsContainer.append(commentsContainerFragment);
}

  document.querySelector(".social__comment-count").classList.add("visually-hidden");
  document.querySelector(".comments-loader").classList.add("visually-hidden");

  generatePhotosData();
  renderPhotos(1);
  
const photoElements = document.querySelectorAll(".picture__img");

for (let photoItem of photoElements) {
  photoItem.addEventListener('click', () =>{
    let i = 0;
    showBigPhoto(i);
    i++;
  });
} 