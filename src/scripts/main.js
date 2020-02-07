'use strict';

const slider = document.querySelector('.slider');
const handleLeft = document.querySelector('.slider__handle--left');
const handleRight = document.querySelector('.slider__handle--right');
const range = document.querySelector('.slider__range');
const input = document.querySelector('#amount');

let leftNew = -handleLeft.offsetWidth / 2;
let rightNew = slider.offsetWidth - handleRight.offsetWidth / 2;
let leftX;
let rightX;

input.value = `$${leftNew + handleLeft.offsetWidth / 2}
 - $${rightNew + handleLeft.offsetWidth / 2}`;

handleLeft.addEventListener('mousedown', (e) => {
  leftX = e.clientX - handleLeft.getBoundingClientRect().left
          + handleLeft.offsetWidth / 2;
  handleLeft.style.backgroundColor = '#007fff';
  handleLeft.style.border = '#003eff';
  handleLeft.style.zIndex = 1;
  handleRight.style.zIndex = 0;

  function onMouseMove(evt) {
    leftNew = evt.clientX - leftX;

    if (leftNew < -handleLeft.offsetWidth / 2) {
      leftNew = -handleLeft.offsetWidth / 2;
    }

    if (leftNew > rightNew) {
      leftNew = rightNew;
    }

    handleLeft.style.left = leftNew + 'px';
    range.style.left = leftNew + 'px';
    range.style.width = rightNew - leftNew + handleLeft.offsetWidth / 2 + 'px';

    input.value = `$${leftNew + handleLeft.offsetWidth / 2}
 - $${rightNew + handleLeft.offsetWidth / 2}`;
  }

  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
    handleLeft.onmouseup = null;
    handleLeft.style.backgroundColor = '#f6f6f6';
    handleLeft.style.border = '1px solid #c5c5c5';
  });
});

handleRight.addEventListener('mousedown', (e) => {
  rightX = e.clientX - handleRight.getBoundingClientRect().left
           + handleLeft.offsetWidth / 2;

  handleRight.style.backgroundColor = '#007fff';
  handleRight.style.border = '#003eff';
  handleLeft.style.zIndex = 0;
  handleRight.style.zIndex = 1;

  function onMouseMove(evt) {
    rightNew = evt.clientX - rightX;

    if (rightNew < leftNew) {
      rightNew = leftNew;
    }

    if (rightNew > slider.offsetWidth - handleRight.offsetWidth / 2) {
      rightNew = slider.offsetWidth - handleRight.offsetWidth / 2;
    }

    handleRight.style.left = rightNew + 'px';
    range.style.width = rightNew - leftNew + handleLeft.offsetWidth / 2 + 'px';

    input.value = `$${leftNew + handleLeft.offsetWidth / 2}
 - $${rightNew + handleLeft.offsetWidth / 2}`;
  }

  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
    handleRight.onmouseup = null;
    handleRight.style.backgroundColor = '#f6f6f6';
    handleRight.style.border = '1px solid #c5c5c5';
  });
});

handleLeft.ondragstart = function() {
  return false;
};

handleRight.ondragstart = function() {
  return false;
};
