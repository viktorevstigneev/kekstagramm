"use strict";

const PHOTOS_LIST = [
  "./photos/1.jpg",
  "./photos/2.jpg",
  "./photos/3.jpg",
  "./photos/4.jpg",
  "./photos/5.jpg",
  "./photos/6.jpg",
  "./photos/7.jpg",
  "./photos/8.jpg",
  "./photos/9.jpg",
  "./photos/10.jpg",
  "./photos/11.jpg",
  "./photos/12.jpg",
  "./photos/13.jpg",
  "./photos/14.jpg",
  "./photos/15.jpg",
  "./photos/16.jpg",
  "./photos/17.jpg",
  "./photos/18.jpg",
  "./photos/19.jpg",
  "./photos/20.jpg",
  "./photos/21.jpg",
  "./photos/22.jpg",
  "./photos/23.jpg",
  "./photos/24.jpg",
  "./photos/25.jpg"
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

const pictureTemplate = document.querySelector("#picture");
const uploadedPhotos = [];
const postedCommentsList = [];


const generateRandomNumber = (min, max) => {
  return Math.floor( Math.random() * (max - min)) + min;
}
 
const ganerateRandomName = () =>{
  //знаю что  здесь (0, 24) должны быть константы
  return NAMES_LIST[generateRandomNumber(0, 24)]
}

const ganerateRandomMessage = () => {
  return COMMENTS_LIST[generateRandomNumber(0, 8)]
}

const commentsAmount = generateRandomNumber(0,12);



const generateRandomComments = () =>{
    for (let i = 0; i < commentsAmount; i++) {
      postedCommentsList.push({
        avatar: './img/avatar-' + generateRandomNumber(1, 6) + '.svg',
        message: ganerateRandomMessage(),
        name: ganerateRandomName() 
      });
    }
    return postedCommentsList;
}
 


const generatePhotosArray = () => {
  for (let i = 0; i < 25; i++) {
    uploadedPhotos.push({
      url: `./photos/${i+1}.jpg`,
      likes: generateRandomNumber(15, 200),
      comments: generateRandomComments()
    });
  }
}
