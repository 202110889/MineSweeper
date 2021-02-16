/*jshint maxerr: 5000 */
const grid = document.getElementById('field');
const squares = Array.from(grid.getElementsByTagName('div'));
const buttonGrid = document.getElementById('buttons');
const buttons = Array.from(buttonGrid.getElementsByTagName('div'));
const buttonList = Array.from(buttonGrid.getElementsByTagName('button'));

// get info from index
let indexSize = window.getComputedStyle(squares[0]).getPropertyValue('width');
indexSize = Number(indexSize.slice(0, -2)); // delete 'px'
const cellSize = indexSize;
let width = window.getComputedStyle(grid).getPropertyValue('width');
width = Number(width.slice(0, -2)); // delete 'px'
width = width / cellSize;
let height = window.getComputedStyle(grid).getPropertyValue('height');
height = Number(height.slice(0, -2)); // delete 'px'
height = height / cellSize;

// checklists for each type of indexes
const ulCheck = [1, width, width + 1]; // UL Corner
const uCheck = [-1, 1, width - 1, width, width + 1]; // U Edge
const urCheck = [-1, width - 1, width]; // UR Corner
const lCheck = [-width, -width + 1, 1, width, width + 1]; // L Edge
const mCheck = [-width - 1, -width, -width + 1, -1, 1, width - 1, width, width + 1]; // Middle
const rCheck = [-width - 1, -width, -1, width - 1, width]; // Right Edge
const dlCheck = [-width, -width + 1, 1]; // DL Corner
const dCheck = [-width - 1, -width, -width + 1, -1, 1]; // D Edge
const drCheck = [-width - 1, -width, -1]; // DR Corner
let mines = [];
let bannedNumberList = [];

// status quo of game
let gameOver = false;
let fieldGenerated = false;
const mineCountBackup = Number(document.getElementById('minecount').innerHTML);
let minecount = Number(document.getElementById('minecount').innerHTML);
const normalIndexCountBackup = (width * height) - minecount;
let normalIndexCount = (width * height) - minecount;
let clicked = false;

// return a boolean for a location of index
function getLocationAttribute(index) {
  const location = ['ULCorner', 'UEdge', 'URCorner', 'LEdge', 'Middle', 'REdge',
  'DLCorner', 'DEdge', 'DRCorner'];
  const isAtLeft = index % width === 0;
  const isAtRight = index % width === width - 1;
  const isAtTop = Math.floor(index / width) === 0;
  const isAtBottom = Math.floor(index / width) === height - 1;
  if ((isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // UL Corner
    return location[0];
  } else if ((!isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // U Edge
    return location[1];
  } else if ((!isAtLeft) && (isAtRight) && (isAtTop) && (!isAtBottom)) { // UR Corner
    return location[2];
  } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // L Edge
    return location[3];
  } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // MIddle
    return location[4];
  } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (!isAtBottom)) { // R Edge
    return location[5];
  } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // DL Corner
    return location[6];
  } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // D Edge
    return location[7];
  } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (isAtBottom)) { // DR Corner
    return location[8];
  }
}

// set timer
let time = Number(document.getElementById('timer').innerHTML);
let timerId = null;
let clickCount = 0;

// generate a mine field
function genField(index) {
  let mineNumber = 0;
  bannedNumberList.push(index)
  if (getLocationAttribute(index) === 'ULCorner') {
    for (let a = 0; a < ulCheck.length; a++) {
      bannedNumberList.push(index + ulCheck[a]);
    }
  } else if (getLocationAttribute(index) === 'UEdge') {
    for (let a = 0; a < uCheck.length; a++) {
      bannedNumberList.push(index + uCheck[a]);
    }
  } else if (getLocationAttribute(index) === 'URCorner') {
    for (let a = 0; a < urCheck.length; a++) {
      bannedNumberList.push(index + urCheck[a]);
    }
  } else if (getLocationAttribute(index) === 'LEdge') {
    for (let a = 0; a < lCheck.length; a++) {
      bannedNumberList.push(index + lCheck[a]);
    }
  } else if (getLocationAttribute(index) === 'Middle') {
    for (let a = 0; a < mCheck.length; a++) {
      bannedNumberList.push(index + mCheck[a]);
    }
  } else if (getLocationAttribute(index) === 'REdge') {
    for (let a = 0; a < rCheck.length; a++) {
      bannedNumberList.push(index + rCheck[a]);
    }
  } else if (getLocationAttribute(index) === 'DLCorner') {
    for (let a = 0; a < dlCheck.length; a++) {
      bannedNumberList.push(index + dlCheck[a]);
    }
  } else if (getLocationAttribute(index) === 'DEdge') {
    for (let a = 0; a < dCheck.length; a++) {
      bannedNumberList.push(index + dCheck[a]);
    }
  } else if (getLocationAttribute(index) === 'DRCorner') {
    for (let a = 0; a < drCheck.length; a++) {
      bannedNumberList.push(index + drCheck[a]);
    }
  }
  while (mineNumber < minecount) {
    mineNumber++;
    const random = Math.floor(Math.random() * width * height);
    if ((mines.includes(random)) || (bannedNumberList.includes(random))) {
      mineNumber--;
    } else {
      mines.push(random);
      squares[random].setAttribute('id', 'mine');
      squares[random].setAttribute('class', 'mine');
    }
  }
}

//insert Numbers
function insertNumbers() {
  for (let index = 0; index < squares.length; index++) {
    let mineQuantity = 0;
    if (!(squares[index].classList.contains('mine'))) {

      // insert a number in each type of indexes
      if (getLocationAttribute(index) === 'ULCorner') { // UL Corner
        for (let a = 0; a < ulCheck.length; a++) {
          if (squares[ulCheck[a] + index].classList.contains('mine')) {
            mineQuantity++;
          }
        }
      } else if (getLocationAttribute(index) === 'UEdge') { // U Edge
        for (let a = 0; a < uCheck.length; a++) {
          if (squares[uCheck[a] + index].classList.contains('mine')) {
            mineQuantity++;
          }
        }
      } else if (getLocationAttribute(index) === 'URCorner') { // UR Corner
        for (let a = 0; a < urCheck.length; a++) {
          if (squares[urCheck[a] + index].classList.contains('mine')) {
            mineQuantity++;
          }
        }
      } else if (getLocationAttribute(index) === 'LEdge') { // L Edge
        for (let a = 0; a < lCheck.length; a++) {
          if (squares[lCheck[a] + index].classList.contains('mine')) {
            mineQuantity++;
          }
        }
      } else if (getLocationAttribute(index) === 'Middle') { // MIddle
        for (let a = 0; a < mCheck.length; a++) {
          if (squares[mCheck[a] + index].classList.contains('mine')) {
            mineQuantity++;
          }
        }
      } else if (getLocationAttribute(index) === 'REdge') { // R Edge
        for (let a = 0; a < rCheck.length; a++) {
          if (squares[rCheck[a] + index].classList.contains('mine')) {
            mineQuantity++;
          }
        }
      } else if (getLocationAttribute(index) === 'DLCorner') { // DL Corner
        for (let a = 0; a < drCheck.length; a++) {
          if (squares[dlCheck[a] + index].classList.contains('mine')) {
            mineQuantity++;
          }
        }
      } else if (getLocationAttribute(index) === 'DEdge') { // D Edge
        for (let a = 0; a < dCheck.length; a++) {
          if (squares[dCheck[a] + index].classList.contains('mine')) {
            mineQuantity++;
          }
        }
      } else if (getLocationAttribute(index) === 'DRCorner') { // DR Corner
        for (let a = 0; a < drCheck.length; a++) {
          if (squares[drCheck[a] + index].classList.contains('mine')) {
            mineQuantity++;
          }
        }
      }

      // insert number
      if (mineQuantity !== 0) {
        squares[index].setAttribute('id', mineQuantity);
        if (mineQuantity === 1) {
          squares[index].style.backgroundImage = 'url("img1.png")';
        } else if (mineQuantity === 2) {
          squares[index].style.backgroundImage = 'url("img2.png")';
        } else if (mineQuantity === 3) {
          squares[index].style.backgroundImage = 'url("img3.png")';
        } else if (mineQuantity === 4) {
          squares[index].style.backgroundImage = 'url("img4.png")';
        } else if (mineQuantity === 5) {
          squares[index].style.backgroundImage = 'url("img5.png")';
        } else if (mineQuantity === 6) {
          squares[index].style.backgroundImage = 'url("img6.png")';
        } else if (mineQuantity === 7) {
          squares[index].style.backgroundImage = 'url("img7.png")';
        } else if (mineQuantity === 8) {
          squares[index].style.backgroundImage = 'url("img8.png")';
        }
      } else if (mineQuantity === 0) {
        squares[index].setAttribute('id', 'blank');
      }
    } else { // if mine is in this index, skip to next index
      continue;
    }
  }
}

// prevent context menu to pop up
document.addEventListener('contextmenu', e => e.preventDefault());

// functions of buttons
// remove buttons
function removeButtons(i) {
  const flagged = buttonList[i].classList.contains('field-button-flagged');
  if (!(flagged) && (buttonList[i].getAttribute('class') !== 'opened-button')) {
    normalIndexCount--;
    buttonList[i].setAttribute('class', 'opened-button');
    buttons[i].setAttribute('class', 'opened-button');
    squares[i].setAttribute('class', 'opened-field');
    if (squares[i].getAttribute('id') === 'mine') {
      clearInterval(timerId);
      mines.forEach(index => {
        if (!(flagged)) {
          squares[i].setAttribute('class', 'mine');
          buttonList[index].setAttribute('class', 'opened-button');
          squares[index].style.backgroundColor = 'red';
        }
      });
      gameOver = true;
    } else if (squares[i].getAttribute('id') === 'blank') {
      // boolean for a location of the index
      // delete buttons in each type of indexes
      if (getLocationAttribute(i) === 'ULCorner') { // UL Corner
        for (let a = 0; a < ulCheck.length; a++) {
          if (squares[ulCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue;
          } else {
            removeButtons(ulCheck[a] + i);
          }
        }
      } else if (getLocationAttribute(i) === 'UEdge') { // U Edge
        for (let a = 0; a < uCheck.length; a++) {
          if (squares[uCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue;
          } else {
            removeButtons(uCheck[a] + i);
          }
        }
      } else if (getLocationAttribute(i) === 'URCorner') { // UR Corner
        for (let a = 0; a < urCheck.length; a++) {
          if (squares[urCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue;
          } else {
            removeButtons(urCheck[a] + i);
          }
        }
      } else if (getLocationAttribute(i) === 'LEdge') { // L Edge
        for (let a = 0; a < lCheck.length; a++) {
          if (squares[lCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue;
          } else {
            removeButtons(lCheck[a] + i);
          }
        }
      } else if (getLocationAttribute(i) === 'Middle') { // MIddle
        for (let a = 0; a < mCheck.length; a++) {
          if (squares[mCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue;
          } else {
            removeButtons(mCheck[a] + i);
          }
        }
      } else if (getLocationAttribute(i) === 'REdge') { // R Edge
        for (let a = 0; a < rCheck.length; a++) {
          if (squares[rCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue;
          } else {
            removeButtons(rCheck[a] + i);
          }
        }
      } else if (getLocationAttribute(i) === 'DLCorner') { // DL Corner
        for (let a = 0; a < dlCheck.length; a++) {
          if (squares[dlCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue;
          } else {
            removeButtons(dlCheck[a] + i);
          }
        }
      } else if (getLocationAttribute(i) === 'DEdge') { // D Edge
        for (let a = 0; a < dCheck.length; a++) {
          if (squares[dCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue;
          } else {
            removeButtons(dCheck[a] + i);
          }
        }
      } else if (getLocationAttribute(i) === 'DRCorner') { // DR Corner
        for (let a = 0; a < drCheck.length; a++) {
          if (squares[drCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue;
          } else {
            removeButtons(drCheck[a] + i);
          }
        }
      }
    }
  }
}

// put/remove a flag on a button
function flag(index) {
  const flagged = buttonList[index].classList.contains('field-button-flagged');
  if (flagged) {
    buttonList[index].setAttribute('class', 'field-button');
    minecount++;
    document.getElementById('minecount').innerHTML = minecount;
  } else {
    buttonList[index].setAttribute('class', 'field-button-flagged');
    minecount--;
    document.getElementById('minecount').innerHTML = minecount;
  }
}

// autoclick(wheel click) function
function autoClick(index) {
  let flagQuantity = 0;

  // check the number of flags around an index
  if (getLocationAttribute(index) === 'ULCorner') { // UL Corner
    for (let a = 0; a < ulCheck.length; a++) {
      if (buttonList[ulCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++;
      }
    }
  } else if (getLocationAttribute(index) === 'UEdge') { // U Edge
    for (let a = 0; a < uCheck.length; a++) {
      if (buttonList[uCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++;
      }
    }
  } else if (getLocationAttribute(index) === 'URCorner') { // UR Corner
    for (let a = 0; a < urCheck.length; a++) {
      if (buttonList[urCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++;
      }
    }
  } else if (getLocationAttribute(index) === 'LEdge') { // L Edge
    for (let a = 0; a < lCheck.length; a++) {
      if (buttonList[lCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++;
      }
    }
  } else if (getLocationAttribute(index) === 'Middle') { // MIddle
    for (let a = 0; a < mCheck.length; a++) {
      if (buttonList[mCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++;
      }
    }
  } else if (getLocationAttribute(index) === 'REdge') { // R Edge
    for (let a = 0; a < rCheck.length; a++) {
      if (buttonList[rCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++;
      }
    }
  } else if (getLocationAttribute(index) === 'DLCorer') { // DL Corner
    for (let a = 0; a < drCheck.length; a++) {
      if (buttonList[dlCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++;
      }
    }
  } else if (getLocationAttribute(index) === 'DEdge') { // D Edge
    for (let a = 0; a < dCheck.length; a++) {
      if (buttonList[dCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++;
      }
    }
  } else if (getLocationAttribute(index) === 'DRCorner') { // DR Corner
    for (let a = 0; a < drCheck.length; a++) {
      if (buttonList[drCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++;
      }
    }
  }
  if ((Number(squares[index].getAttribute('id')) === flagQuantity) &&
  (squares[index].getAttribute('class')) === 'opened-field') {
    if (getLocationAttribute(index) === 'ULCorner') { // UL Corner
      ulCheck.forEach(element => removeButtons(element + index));
    } else if (getLocationAttribute(index) === 'UEdge') { // U Edge
      uCheck.forEach(element => removeButtons(element + index));
    } else if (getLocationAttribute(index) === 'URCorner') { // UR Corner
      urCheck.forEach(element => removeButtons(element + index));
    } else if (getLocationAttribute(index) === 'LEdge') { // L Edge
      lCheck.forEach(element => removeButtons(element + index));
    } else if (getLocationAttribute(index) === 'Middle') { // MIddle
      mCheck.forEach(element => removeButtons(element + index));
    } else if (getLocationAttribute(index) === 'REdge') { // R Edge
      rCheck.forEach(element => removeButtons(element + index));
    } else if (getLocationAttribute(index) === 'DLCorer') { // DL Corner
      dlCheck.forEach(element => removeButtons(element + index));
    } else if (getLocationAttribute(index) === 'DEdge') { // D Edge
      dCheck.forEach(element => removeButtons(element + index));
    } else if (getLocationAttribute(index) === 'DRCorner') { // DR Corner
      drCheck.forEach(element => removeButtons(element + index));
    }
  }
}

// Add functions on buttons

function assignButtonFunction() {
  for (let index = 0; index < buttons.length; index++) {
    buttonList[index].addEventListener('mousedown', event => {
      if (!gameOver) {
        clicked = true;
        if ((buttonList[index].getAttribute('class') === 'field-button') && (event.button === 0)) {
          buttonList[index].setAttribute('class', 'field-button-pressed');
        }
        if ((event.button !== 2) && (normalIndexCount === normalIndexCountBackup)) {
          fieldGenerated = false;
        } else if (normalIndexCount !== normalIndexCountBackup) {
          fieldGenerated = true
        }
      }
    });
    buttonList[index].addEventListener('mouseup', event => {
      if (!gameOver) {
        if (!fieldGenerated) {
          genField(index);
          insertNumbers();
          fieldGenerated = true;
        }
        clicked = false;
        clickCount++;
        buttonControl(event, index);
        if ((clickCount === 1) && !(squares[index].classList.contains('mine'))) { // start timer
          timerId = setInterval(() => {
            time++;
            document.getElementById('timer').innerHTML = time;
          }, 1000);
        }
        gameClear(index);
      }
    });
    buttonList[index].addEventListener('mouseout', () => {
      if (!gameOver) {
        if ((clicked) && buttonList[index].getAttribute('class') !== 'field-button-flagged') {
          buttonList[index].setAttribute('class', 'field-button');
        }
      }
    });
    buttonList[index].addEventListener('mouseover', event => {
      if (!gameOver) {
        if ((clicked) && (buttonList[index].getAttribute('class') !== 'field-button-flagged') &&
        (event.button === 0)) {
          buttonList[index].setAttribute('class', 'field-button-pressed');
        }
      }
    });
  }
}

// Add functions on field
function assignFieldFunction() {
  for (let index = 0; index < squares.length; index++) {
    squares[index].addEventListener('mousedown', event => {
      if ((!gameOver) && (event.button !== 2)) {
        clicked = true;
        if (getLocationAttribute(index) === 'ULCorner') {
          for (let a = 0; a < ulCheck.length; a++) { // UL Corner
            if (buttonList[index + ulCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + ulCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'UEdge') {
          for (let a = 0; a < uCheck.length; a++) {
            if (buttonList[index + uCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + uCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'URCorner') {
          for (let a = 0; a < urCheck.length; a++) {
            if (buttonList[index + urCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + urCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'LEdge') {
          for (let a = 0; a < lCheck.length; a++) {
            if (buttonList[index + lCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + lCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'Middle') {
          for (let a = 0; a < mCheck.length; a++) {
            if (buttonList[index + mCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + mCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'REdge') {
          for (let a = 0; a < rCheck.length; a++) {
            if (buttonList[index + rCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + rCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'DLCorner') {
          for (let a = 0; a < dlCheck.length; a++) {
            if (buttonList[index + dlCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + dlCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'DEdge') {
          for (let a = 0; a < dCheck.length; a++) {
            if (buttonList[index + dCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + dCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'DRCorner') {
          for (let a = 0; a < drCheck.length; a++) {
            if (buttonList[index + drCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + drCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        }
      }
    });
    squares[index].addEventListener('mouseout', () => {
      for (let element = 0; element < buttonList.length; element++) {
        if (!gameOver) {
          if (buttonList[element].getAttribute('class') === 'field-button-pressed') {
            buttonList[element].setAttribute('class', 'field-button');
          }
        }
      }
    });
    squares[index].addEventListener('mouseover', () => {
      if ((clicked) && !(gameOver)) {
        if (getLocationAttribute(index) === 'ULCorner') {
          for (let a = 0; a < ulCheck.length; a++) { // UL Corner
            if (buttonList[index + ulCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + ulCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'UEdge') {
          for (let a = 0; a < uCheck.length; a++) {
            if (buttonList[index + uCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + uCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'URCorner') {
          for (let a = 0; a < urCheck.length; a++) {
            if (buttonList[index + urCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + urCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'LEdge') {
          for (let a = 0; a < lCheck.length; a++) {
            if (buttonList[index + lCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + lCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'Middle') {
          for (let a = 0; a < mCheck.length; a++) {
            if (buttonList[index + mCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + mCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'REdge') {
          for (let a = 0; a < rCheck.length; a++) {
            if (buttonList[index + rCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + rCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'DLCorner') {
          for (let a = 0; a < dlCheck.length; a++) {
            if (buttonList[index + dlCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + dlCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'DEdge') {
          for (let a = 0; a < dCheck.length; a++) {
            if (buttonList[index + dCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + dCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        } else if (getLocationAttribute(index) === 'DRCorner') {
          for (let a = 0; a < drCheck.length; a++) {
            if (buttonList[index + drCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + drCheck[a]].setAttribute('class', 'field-button-pressed');
            }
          }
        }
      }
    });
    squares[index].addEventListener('mouseup', event => {
      if (!gameOver) {
        for (let element = 0; element < buttonList.length; element++) {
          if (buttonList[element].getAttribute('class') === 'field-button-pressed') {
            buttonList[element].setAttribute('class', 'field-button');
          }
        }
        fieldControl(event, index);
        clicked = false;
        gameClear(index);
      }
    });
  }
}

// game clear
function gameClear(index) {
  if ((normalIndexCount === 0) && (squares[index].getAttribute('id') !== 'mine')) {
    alert('축하드립니다!\n기록: ' + time + '초');
    clearInterval(timerId);
    gameOver = true;
  }
}

// button control function
function buttonControl(event, index) {
  if ((event.button === 0) || (event.button === 1)) {
    removeButtons(index);
  } else if (event.button === 2) {
    flag(index);
  }
}

function fieldControl(event, index) {
  if ((event.button === 0) || (event.button === 1)) {
    autoClick(index);
  }
}

//start/restart game
function gameStart() {
  gameOver = false;
  mines.forEach(index => {
    squares[index].style.backgroundColor = 'darkgray';
  });
  mines = [];
  bannedNumberList = [];
  minecount = mineCountBackup;
  normalIndexCount = normalIndexCountBackup;
  clearInterval(timerId);
  time = 0;
  document.getElementById('timer').innerHTML = time;
  timerId = null;
  clickCount = 0;
  for (let index = 0; index < squares.length; index++) {
    document.getElementById('minecount').innerHTML = minecount;
    squares[index].removeAttribute('class');
    squares[index].removeAttribute('id');
    squares[index].innerHTML = null;
    squares[index].style.backgroundImage = null
    buttons[index].removeAttribute('class');
    buttonList[index].setAttribute('class', 'field-button');
  }
}

//assign gamestart function on button
document.getElementById('start').addEventListener('mousedown', gameStart);
assignButtonFunction();
assignFieldFunction();
gameStart();
