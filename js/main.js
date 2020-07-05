"use strict";


const MAX_LIKES_COUNT = 201;
const MIN_LIKES_COUNT = 15;
const PHOTOS_COUNT = 25;
const MAX_AVATAR_COUNT = 6;
const MIN_AVATAR_COUNT = 1;
const MAX_SHOWN_COMMENTS_COUNT = 5;
const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 10;


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

//опять наверное с названием будет хуйня(вероятно с кодом тоже)
const generateRandomData = (source) =>{

  return source[generateRandomNumberFromRange(0,source.length)];

}

//20 раз думал что так не правильно но ты вроде ничего не говорил))

//-----------------------------коменты  удалю после ревью

// const generateRandomName = () =>{
//   return NAMES_LIST[generateRandomNumberFromRange(MIN_NAME_COUNT, MAX_NAME_COUNT)]
// }

// const generateRandomMessage = () =>{
//   return COMMENTS_LIST[generateRandomNumberFromRange(MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT)]
// }

// const generateRandomDescription = () =>{
//   return DESCRIPTION_LIST[generateRandomNumberFromRange(0,DESCRIPTION_LIST.length)]
// }

const generateRandomComments = () =>{
    const postedCommentsList = [];
    const maxCommentsAmount = generateRandomNumberFromRange(MIN_COMMENTS_COUNT,MAX_COMMENTS_COUNT);

    for (let i = 0; i < maxCommentsAmount; i++) {
      postedCommentsList.push({
        avatar: "img/avatar-" + generateRandomNumberFromRange(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT) + ".svg",
        message: generateRandomData(COMMENTS_LIST),
        name: generateRandomData(NAMES_LIST) 
      });
    }
    return postedCommentsList;
}
 


const renderPhotosData = () =>{

  for (let i = 0; i < PHOTOS_COUNT; i++) {

    uploadedPhotos.push({
      url: `photos/${i+1}.jpg`,
      likes: generateRandomNumberFromRange(MIN_LIKES_COUNT,MAX_LIKES_COUNT),
      comments: generateRandomComments(),
      description:generateRandomData(DESCRIPTION_LIST)
    });

  }
}

//знал  что ты скажешь исправить это, (ты скажешь почему не исправил если знал) ,я хз как лучше назвать, ну была не была
const  createPhoto = (photoNumber) =>{
  
  const photoTemplate = document.querySelector("#picture").cloneNode(true);
  const commentsAmount = photoTemplate.content.querySelector(".picture__comments");
  const picture = photoTemplate.content.querySelector(".picture__img");
  const likesAmount = photoTemplate.content.querySelector(".picture__likes");

  likesAmount.textContent = uploadedPhotos[photoNumber].likes; 
  picture.src = uploadedPhotos[photoNumber].url;
  commentsAmount.textContent = uploadedPhotos[photoNumber].comments.length; 
 
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

  const bigPhoto = bigPhotoElement.querySelector(".big-picture__img img");
  const bigPhotoLikesAmount =  bigPhotoElement.querySelector(".likes-count");
  const bigPhotoCommentAmount =  bigPhotoElement.querySelector(".comments-count");
  const bigPhotoDesription = bigPhotoElement.querySelector(".social__caption");

  bigPhoto.src = uploadedPhotos[photoNumber].url;
  bigPhotoCommentAmount.textContent = uploadedPhotos[photoNumber].comments.length;
  bigPhotoLikesAmount.textContent = uploadedPhotos[photoNumber].likes;
  bigPhotoDesription.textContent = uploadedPhotos[photoNumber].description;

  renderComments(photoNumber);
  
}

 

const createComments = (source, text) =>{

  const comment = document.createElement("li");
  comment.className ="social__comment";
  const imageAvatar = document.createElement("img");
  imageAvatar.className ="social__picture";
  imageAvatar.alt = "автатар автора комментария";
  imageAvatar.width = 35;
  imageAvatar.height = 35;
  imageAvatar.src = source;
  const commentText = document.createElement("p");
  commentText.className = "social__text";
  commentText.textContent = text;
  comment.append(imageAvatar);
  comment.append(commentText);

  return comment;
}

const renderComments = (photoNumber) =>{

  const commentsContainer = document.querySelector(".social__comments");
  const commentsContainerFragment =  new DocumentFragment();

  //здесь я думал как сделать лучше, ибо понимал что хуйня какая-то, но не придумал, спасибо
  const commentsCount = Math.min(uploadedPhotos[photoNumber].comments.length, MAX_SHOWN_COMMENTS_COUNT);

  for(let i = 0; i < commentsCount; i++){

    commentsContainerFragment.append(createComments( uploadedPhotos[photoNumber].comments[i].avatar, uploadedPhotos[photoNumber].comments[i].message));
  
  }
  commentsContainer.innerHTML="";
  commentsContainer.append(commentsContainerFragment);

}

//ты конечно умеешь объяснить (или дать пиздюлей)) )
// "Зачем тут присвоение?
//Что это делает в глобальной области видимости?"
//хер поймешь что тут исправить нужно, наверное и я и в этот раз сделаю неправильно
// хз какой из вариантов нужен, но скорее всего тот что ниже закомечен, 
//потому что я  понял, что в программировании нужно стараться писать код универсальнее

const hideDomElement = () =>{
  
  document.querySelector(".social__comment-count").classList.add("visually-hidden");
  document.querySelector(".comments-loader").classList.add("visually-hidden");

}

// const hideDomElement = (element) =>{

//   document.querySelector(element).classList.add("visually-hidden");
//   document.querySelector(element).classList.add("visually-hidden");

// }

// hideDomElement(".social__comment-count");
// hideDomElement(".comments-loader");

const showPhotos = () =>{ 
  renderPhotosData();
  renderPhotos(1);

}

hideDomElement();
showPhotos();


// const photoElements = document.querySelectorAll(".picture__img");

// for (let photoItem of photoElements) {

//   photoItem.addEventListener('click', () =>{
//     let i = 0;
//     showBigPhoto(i);
//     i++;
//   });

// } 