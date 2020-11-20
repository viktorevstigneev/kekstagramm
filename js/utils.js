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

  window.utils = {
    Key,
    showElement,
    hideElement,
    generateRandomNumberFromRange
  };
})();