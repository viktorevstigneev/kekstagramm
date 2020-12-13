"use strict";

(() => {
  const Key = {
    ENTER: "Enter",
    ESCAPE: "Escape"
  }

  const showElement = (element) => {
    element.classList.remove("hidden");
  }
  
  const hideElement = (element) => {
    element.classList.add("hidden");
  }
  
  const generateRandomNumberFromRange = (minValue, maxValue) => {
    return Math.floor( Math.random() * (maxValue - minValue)) + minValue;
  }
  const isEscapeEvent = (evt, callback) => {
    if (evt.code === Key.ESCAPE) {
      callback();
    }
  } 
  
  const isEnterEvent = (evt, callback) => {
    if (evt.code === Key.ENTER) {
      callback(evt);
    }
  }

  window.utils = {
    isEscapeEvent,
    isEnterEvent,
    showElement,
    hideElement,
    generateRandomNumberFromRange
  };
})();