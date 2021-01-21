const grid = document.getElementById('field')
const squares = Array.from(grid.getElementsByTagName('div'))
const buttonGrid = document.getElementsByClassName('buttons')[0]
let buttons = Array.from(buttonGrid.getElementsByTagName('div'))
let mineNumber = 0
const mines = []
const inputList = Array.from(buttonGrid.getElementsByTagName('input'))
// get info from index
let indexSize = window.getComputedStyle(squares[0]).getPropertyValue('width')
indexSize = Number(indexSize.slice(0, -2)) // delete 'px'
let paddingSize = window.getComputedStyle(squares[0]).getPropertyValue('padding')
paddingSize = Number(paddingSize.slice(0, -2)) // delete 'px'
const cellSize = indexSize + (paddingSize * 2)
let width = window.getComputedStyle(grid).getPropertyValue('width')
width = Number(width.slice(0, -2)) // delete 'px'
width = width / cellSize
let height = window.getComputedStyle(grid).getPropertyValue('height')
height = Number(height.slice(0, -2)) // delete 'px'
height = height / cellSize
let minecount = Number(document.getElementById('minecount').innerHTML)
let normalIndexCount = (width * height) - minecount
// checklists for each type of indexes
const ulCheck = [1, width, width + 1] // UL Corner
const uCheck = [-1, 1, width - 1, width, width + 1] // U Edge
const urCheck = [-1, width - 1, width] // UR Corner
const lCheck = [-width, -width + 1, 1, width, width + 1] // L Edge
const mCheck = [-width - 1, -width, -width + 1, -1, 1, width - 1, width, width + 1] // Middle
const rCheck = [-width - 1, -width, -1, width - 1, width] // Right Edge
const dlCheck = [-width, -width + 1, 1] // DL Corner
const dCheck = [-width - 1, -width, -width + 1, -1, 1] // D Edge
const drCheck = [-width - 1, -width, -1] // DR Corner
// set timer
let time = Number(document.getElementById('timer').innerHTML)
let timerId = null
let clickCount = 0
// generate a mine field
function generateField () {
  while (mineNumber < minecount) {
    mineNumber++
    const random = Math.floor(Math.random() * width * height)
    if (mines.includes(random)) {
      mineNumber--
    } else {
      mines.push(random)
      squares[random].setAttribute('id', 'mine')
      squares[random].setAttribute('class', 'mine')
    }
  }
}
function insertNumbers () {
  for (let index = 0; index < squares.length; index++) {
    let mineQuantity = 0
    if (!(squares[index].classList.contains('mine'))) {
      // boolean for a location of the index
      const isAtLeft = index % width === 0
      const isAtRight = index % width === width - 1
      const isAtTop = Math.floor(index / width) === 0
      const isAtBottom = Math.floor(index / width) === height - 1
      // choose a number for each type of indexes
      if ((isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // UL Corner
        for (let a = 0; a < ulCheck.length; a++) {
          if (squares[ulCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if ((!isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // U Edge
        for (let a = 0; a < uCheck.length; a++) {
          if (squares[uCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if ((!isAtLeft) && (isAtRight) && (isAtTop) && (!isAtBottom)) { // UR Corner
        for (let a = 0; a < urCheck.length; a++) {
          if (squares[urCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // L Edge
        for (let a = 0; a < lCheck.length; a++) {
          if (squares[lCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // MIddle
        for (let a = 0; a < mCheck.length; a++) {
          if (squares[mCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (!isAtBottom)) { // R Edge
        for (let a = 0; a < rCheck.length; a++) {
          if (squares[rCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // DL Corner
        for (let a = 0; a < drCheck.length; a++) {
          if (squares[dlCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // D Edge
        for (let a = 0; a < dCheck.length; a++) {
          if (squares[dCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (isAtBottom)) { // DR Corner
        for (let a = 0; a < drCheck.length; a++) {
          if (squares[drCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      }
      // insert number
      if (mineQuantity !== 0) {
        squares[index].innerHTML = mineQuantity
        squares[index].setAttribute('id', 'filled')
      } else {
        squares[index].setAttribute('id', 'blank')
      }
    } else { // if mine is in this index, skip to next index
      continue
    }
  }
}
// prevent context menu to pop up
document.addEventListener('contextmenu', e => e.preventDefault())
// functions of buttons
// remove buttons
function removeButtons (i) {
  const flagged = inputList[i].classList.contains('field-button-flagged')
  if (!(flagged) && (buttons[i].style.visibility !== 'hidden')) {
    buttons[i].style.visibility = 'hidden'
    squares[i].setAttribute('class', 'opened')
    normalIndexCount--
    gameClear(i)
    if ((squares[i].getAttribute('id') !== 'blank') && (squares[i].getAttribute('id') === 'mine')) {
      clearInterval(timerId)
      mines.forEach(index => {
        if (!(flagged)) {
          squares[i].setAttribute('class', 'mine')
          inputList[index].style.visibility = 'hidden'
          squares[index].style.backgroundColor = 'red'
        }
      })
      alert('운빨망겜')
      removeEListenerAll()
    } else if (squares[i].getAttribute('id') === 'blank') {
      // boolean for a location of the index
      const isAtLeft = i % width === 0
      const isAtRight = i % width === width - 1
      const isAtTop = Math.floor(i / width) === 0
      const isAtBottom = Math.floor(i / width) === height - 1
      // delete buttons in each type of indexes
      if ((isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // UL Corner
        for (let a = 0; a < ulCheck.length; a++) {
          if (squares[ulCheck[a] + i].getAttribute('class') === 'opened') {
            continue
          } else {
            removeButtons(ulCheck[a] + i)
          }
        }
      } else if ((!isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // U Edge
        for (let a = 0; a < uCheck.length; a++) {
          if (squares[uCheck[a] + i].getAttribute('class') === 'opened') {
            continue
          } else {
            removeButtons(uCheck[a] + i)
          }
        }
      } else if ((!isAtLeft) && (isAtRight) && (isAtTop) && (!isAtBottom)) { // UR Corner
        for (let a = 0; a < urCheck.length; a++) {
          if (squares[urCheck[a] + i].getAttribute('class') === 'opened') {
            continue
          } else {
            removeButtons(urCheck[a] + i)
          }
        }
      } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // L Edge
        for (let a = 0; a < lCheck.length; a++) {
          if (squares[lCheck[a] + i].getAttribute('class') === 'opened') {
            continue
          } else {
            removeButtons(lCheck[a] + i)
          }
        }
      } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // MIddle
        for (let a = 0; a < mCheck.length; a++) {
          if (squares[mCheck[a] + i].getAttribute('class') === 'opened') {
            continue
          } else {
            removeButtons(mCheck[a] + i)
          }
        }
      } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (!isAtBottom)) { // R Edge
        for (let a = 0; a < rCheck.length; a++) {
          if (squares[rCheck[a] + i].getAttribute('class') === 'opened') {
            continue
          } else {
            removeButtons(rCheck[a] + i)
          }
        }
      } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // DL Corner
        for (let a = 0; a < dlCheck.length; a++) {
          if (squares[dlCheck[a] + i].getAttribute('class') === 'opened') {
            continue
          } else {
            removeButtons(dlCheck[a] + i)
          }
        }
      } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // D Edge
        for (let a = 0; a < dCheck.length; a++) {
          if (squares[dCheck[a] + i].getAttribute('class') === 'opened') {
            continue
          } else {
            removeButtons(dCheck[a] + i)
          }
        }
      } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (isAtBottom)) { // DR Corner
        for (let a = 0; a < drCheck.length; a++) {
          if (squares[drCheck[a] + i].getAttribute('class') === 'opened') {
            continue
          } else {
            removeButtons(drCheck[a] + i)
          }
        }
      }
    gameClear(i)
    }
  }
}
// put/remove a flag on a button
function flag (i) {
  const flagged = inputList[i].classList.contains('field-button-flagged')
  if (flagged) {
    inputList[i].setAttribute('class', 'field-button')
    minecount++
    document.getElementById('minecount').innerHTML = minecount
  } else {
    inputList[i].setAttribute('class', 'field-button-flagged')
    minecount--
    document.getElementById('minecount').innerHTML = minecount
  }
}
// autoclick(wheel click) function
function autoClick (index) {
  const isAtLeft = index % width === 0
  const isAtRight = index % width === width - 1
  const isAtTop = Math.floor(index / width) === 0
  const isAtBottom = Math.floor(index / width) === height - 1
  let flagQuantity = 0
  // check the number of flags around an index
  if ((isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // UL Corner
    for (let a = 0; a < ulCheck.length; a++) {
      if (inputList[ulCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if ((!isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // U Edge
    for (let a = 0; a < uCheck.length; a++) {
      if (inputList[uCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if ((!isAtLeft) && (isAtRight) && (isAtTop) && (!isAtBottom)) { // UR Corner
    for (let a = 0; a < urCheck.length; a++) {
      if (inputList[urCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // L Edge
    for (let a = 0; a < lCheck.length; a++) {
      if (inputList[lCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // MIddle
    for (let a = 0; a < mCheck.length; a++) {
      if (inputList[mCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (!isAtBottom)) { // R Edge
    for (let a = 0; a < rCheck.length; a++) {
      if (inputList[rCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // DL Corner
    for (let a = 0; a < drCheck.length; a++) {
      if (inputList[dlCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // D Edge
    for (let a = 0; a < dCheck.length; a++) {
      if (inputList[dCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (isAtBottom)) { // DR Corner
    for (let a = 0; a < drCheck.length; a++) {
      if (inputList[drCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  }
  if (Number(squares[index].innerHTML) === flagQuantity) {
    if ((isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // UL Corner
      ulCheck.forEach(element => removeButtons(element + index))
    } else if ((!isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // U Edge
      uCheck.forEach(element => removeButtons(element + index))
    } else if ((!isAtLeft) && (isAtRight) && (isAtTop) && (!isAtBottom)) { // UR Corner
      urCheck.forEach(element => removeButtons(element + index))
    } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // L Edge
      lCheck.forEach(element => removeButtons(element + index))
    } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // MIddle
      mCheck.forEach(element => removeButtons(element + index))
    } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (!isAtBottom)) { // R Edge
      rCheck.forEach(element => removeButtons(element + index))
    } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // DL Corner
      dlCheck.forEach(element => removeButtons(element + index))
    } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // D Edge
      dCheck.forEach(element => removeButtons(element + index))
    } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (isAtBottom)) { // DR Corner
      drCheck.forEach(element => removeButtons(element + index))
    }
  }
}
// Add functions on buttons
function assignButtonFunction () {
  for (let index = 0; index < buttons.length; index++) {
    buttons[index].addEventListener('mouseup', (event) => {
      buttonControl(event, index)
    })
  }
}
// Add functions on field
function assignFieldFunction () {
  for (let index = 0; index < squares.length; index++) {
    squares[index].addEventListener('mouseup', (event) => {
      fieldControl(event, index)
    })
  }
}
// game clear
function gameClear (index) {
  if ((normalIndexCount === 0) && (squares[index].getAttribute('id') !== 'mine')) {
    alert('축하드립니다!\n운빨 망겜에서 승리하셨습니다!\n기록: ' + time + '초')
    removeEListenerAll()
    clearInterval(timerId)
  }
}
// button control function
function buttonControl (event, index) {
  if (event.button === 0) {
    clickCount++
    removeButtons(index)
    if (clickCount === 1) {
      timerId = setInterval(() => {
        time++
        document.getElementById('timer').innerHTML = time
      }, 1000)
    }
  } else if (event.button === 1) {
    alert(event.button + ' has no function yet')
  } else if (event.button === 2) {
    flag(index)
  }
}
function fieldControl (event, index) {
  if ((event.button === 0) || (event.button === 1)) {
    autoClick(index)
  }
}
// remove button event
function removeEListenerAll() {
  let gridClone = grid.cloneNode(true)
  let buttonGridClone = buttonGrid.cloneNode(true)
  grid.parentNode.replaceChild(gridClone, grid)
  buttonGrid.parentNode.replaceChild(buttonGridClone, buttonGrid)
}
generateField()
insertNumbers()
assignButtonFunction()
assignFieldFunction()
