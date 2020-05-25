"use strict";

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

const MAX_COMMENTS_COUNT = 15;
const MIN_COMMENTS_COUNT = 0;
const MAX_LIKES_COUNT = 201;
const MIN_LIKES_COUNT = 15;
const PHOTOS_COUNT = 25;
const MAX_AVATAR_COUNT = 8;
const MIN_AVATAR_COUNT = 0;
const MIN_NAME_COUNT = 0;
const MAX_NAME_COUNT = 24;
const MIN_MESSAGE_COUNT = 0;
const MAX_MESSAGE_COUNT = 8;
const uploadedPhotos = [];


const generateRandomNumber = (minValue, maxValue) => {
  return Math.floor( Math.random() * (maxValue - minValue)) + minValue;
}
 
const generateRandomName = () => {
  return NAMES_LIST[generateRandomNumber(MIN_NAME_COUNT, MAX_NAME_COUNT)]
}

const generateRandomMessage = () => {
  return COMMENTS_LIST[generateRandomNumber(MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT)]
}

const generateRandomComments = () => {
    const postedCommentsList = [];
    const maxCommentsAmount = generateRandomNumber(MIN_COMMENTS_COUNT,MAX_COMMENTS_COUNT);

    for (let i = 0; i < maxCommentsAmount; i++) {
      postedCommentsList.push({
        avatar: "./img/avatar-" + generateRandomNumber(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT) + ".svg",
        message: generateRandomMessage(),
        name: generateRandomName() 
      });
    }
    return postedCommentsList;
}
 


const generatePhotosArray = () => {
  for (let i = 0; i < PHOTOS_COUNT; i++) {
    uploadedPhotos.push({
      url: `./photos/${i+1}.jpg`,
      likes: generateRandomNumber(MIN_LIKES_COUNT,MAX_LIKES_COUNT),
      comments: generateRandomComments()
    });
  }
}

const  createDOMElement = (i) => {
  
  const pictureTemplate = document.querySelector("#picture");
  const pictureTemplateClone = pictureTemplate.cloneNode(true);
  const commentsAmount = pictureTemplateClone.content.querySelector(".picture__comments");
  const picture = pictureTemplateClone.content.querySelector(".picture__img");
  const likesAmount = pictureTemplateClone.content.querySelector(".picture__likes");

  likesAmount.textContent = uploadedPhotos[i].likes; 
  picture.src = uploadedPhotos[i].url;
  commentsAmount.textContent = uploadedPhotos[i].comments.length; 
 
  return pictureTemplateClone;

}

const insertPhotos = () => {

  const photosBlock = document.querySelector(".pictures");
  const photosBlockFragment = new DocumentFragment(); 

  for (let i = 0; i < uploadedPhotos.length; i++) {
    photosBlockFragment.append(createDOMElement(i).content);
  }
  
  photosBlock.append(photosBlockFragment);
  return  photosBlock;



}

function ShowPicture() {
  generatePhotosArray();
  insertPhotos();
}
ShowPicture();