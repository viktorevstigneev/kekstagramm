"use strict";

(() => {
  const MIN_MESSAGE_COUNT = 0;
  const MIN_NAME_COUNT = 0;
  const MAX_LIKE_COUNT = 201;
  const MIN_LIKE_COUNT = 15;
  const PHOTO_COUNT = 25;
  const MAX_AVATAR_COUNT = 6;
  const MIN_AVATAR_COUNT = 1;
  const MIN_COMMENT_COUNT = 0;
  const MAX_COMMENT_COUNT = 10;

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

  const uploadedPhotos = [];

  const generateRandomComments = () => {
    const comments = [];
    const maxCommentsAmount =  window.utils.generateRandomNumberFromRange(MIN_COMMENT_COUNT,MAX_COMMENT_COUNT);

    for (let i = 0; i < maxCommentsAmount; i++) {
      comments.push({
        avatar: `img/avatar-${window.utils.generateRandomNumberFromRange(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT)}.svg`,
        message: COMMENTS_LIST[window.utils.generateRandomNumberFromRange(MIN_MESSAGE_COUNT, COMMENTS_LIST.length)],
        name: NAMES_LIST[window.utils.generateRandomNumberFromRange(MIN_NAME_COUNT, NAMES_LIST.length)] 
      });
    }
    
    return comments;
  }

  for (let i = 0; i < PHOTO_COUNT; i++) {
    uploadedPhotos.push({
      url: `photos/${i+1}.jpg`,
      likes: window.utils.generateRandomNumberFromRange(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
      comments: generateRandomComments(),
      description: DESCRIPTIONS_LIST[window.utils.generateRandomNumberFromRange(0, DESCRIPTIONS_LIST.length)]
    });
  }
  window.uploadedPhotos = uploadedPhotos;
})();