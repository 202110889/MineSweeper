var grid = document.getElementById('field')
var squares = Array.from(grid.getElementsByTagName('div'))
var buttonGrid = document.getElementsByClassName('buttons')[0]
let buttons = Array.from(buttonGrid.getElementsByTagName('div'))
let mineNumber = 0
const mines = []
const width = 9
const height = 9
// create base field
/*  function generateBaseField () {
    while (fieldId < squares.length) {
      var field = document.createElement('div')
      var id = document.createAttribute('id')
      id.value = fieldId
      field.appendChild(id)
      grid.appendChild(field)
      fieldId++
    }
  } */
function generateField () {
  // choose the location of mines
  while (mineNumber < 10) {
    mineNumber++
    const random = Math.floor(Math.random() * 81)
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
  for (let i = 0; i < squares.length; i++) {
    let quantity = 0
    if (!(squares[i].classList.contains('mine'))) {
      // boolean for a location of the index
      const isAtLeft = i % width === 0
      const isAtRight = i % width === 8
      const isAtTop = Math.floor(i / height) === 0
      const isAtBottom = Math.floor(i / height) === 8
      // checklists for each type of indexes
      const ulCheck = [i + 1, i + width, i + width + 1] // UL Corner
      const uCheck = [i - 1, i + 1, i + width - 1, i + width, i + width + 1] // U Edge
      const urCheck = [i - 1, i + width - 1, i + width] // UR Corner
      const lCheck = [i - width, i - width + 1, i + 1, i + width, i + width + 1] // L Edge
      const mCheck = [i - width - 1, i - width, i - width + 1, i - 1, i + 1, i + width - 1, i + width, i + width + 1] // Middle
      const rCheck = [i - width - 1, i - width, i - 1, i + width - 1, i + width] // Right Edge
      const dlCheck = [i - width, i - width + 1, i + 1] // DL Corner
      const dCheck = [i - 1, i + 1, i - width - 1, i - width, i - width + 1] // D Edge
      const drCheck = [i - width - 1, i - width, i - 1] // DR Corner
      // choose a number for each type of indexes
      if ((isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // UL Corner
        for (let a = 0; a < ulCheck.length; a++) {
          if (squares[ulCheck[a]].classList.contains('mine')) {
            quantity++
          }
        }
      } else if ((!isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // U Edge
        for (let a = 0; a < uCheck.length; a++) {
          if (squares[uCheck[a]].classList.contains('mine')) {
            quantity++
          }
        }
      } else if ((!isAtLeft) && (isAtRight) && (isAtTop) && (!isAtBottom)) { // UR Corner
        for (let a = 0; a < urCheck.length; a++) {
          if (squares[urCheck[a]].classList.contains('mine')) {
            quantity++
          }
        }
      } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // L Edge
        for (let a = 0; a < lCheck.length; a++) {
          if (squares[lCheck[a]].classList.contains('mine')) {
            quantity++
          }
        }
      } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // MIddle
        for (let a = 0; a < mCheck.length; a++) {
          if (squares[mCheck[a]].classList.contains('mine')) {
            quantity++
          }
        }
      } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (!isAtBottom)) { // R Edge
        for (let a = 0; a < rCheck.length; a++) {
          if (squares[rCheck[a]].classList.contains('mine')) {
            quantity++
          }
        }
      } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // DL Corner
        for (let a = 0; a < drCheck.length; a++) {
          if (squares[dlCheck[a]].classList.contains('mine')) {
            quantity++
          }
        }
      } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // D Edge
        for (let a = 0; a < dCheck.length; a++) {
          if (squares[dCheck[a]].classList.contains('mine')) {
            quantity++
          }
        }
      } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (isAtBottom)) { // DR Corner
        for (let a = 0; a < drCheck.length; a++) {
          if (squares[drCheck[a]].classList.contains('mine')) {
            quantity++
          }
        }
      }
      // insert number
      if (quantity !== 0) {
        squares[i].innerHTML = quantity
      } else {
        squares[i].setAttribute('id', 'blank')
      }
    } else { // if mine is in this index, skip to next index
      continue
    }
  }
}
// prevent context menu to pop up
[buttonGrid].forEach(el => el.addEventListener('contextmenu', e => e.preventDefault()))
// functions of buttons
function removeButtons (i) {
  buttons[i].style.visibility = 'hidden'
  if (squares[i].getAttribute('id') !== 'blank') {
    if (squares[i].getAttribute('id') === 'mine') {
      mines.forEach(index => {
        buttons[index].style.visibility = 'hidden'
      })
      mines.forEach(index => {
        squares[index].style.backgroundColor = 'red'
      })
      alert('Game over')
    }
  } else if (squares[i].getAttribute('id') === 'blank') {
    const isAtLeft = (i % width === 0) || !(squares[i - 1].classList.contains('blank'))
    const isAtRight = (i % width === 8) || !(squares[i + 1].classList.contains('blank'))
    const isAtTop = (Math.floor(i / height) === 0) || !(squares[i - width].classList.contains('blank'))
    const isAtBottom = (Math.floor(i / height) === 8) || !(squares[i + width].classList.contains('blank'))
    // checklists for each type of indexes
    const ulCheck = [i + 1, i + width, i + width + 1] // UL Corner
    const uCheck = [i - 1, i + 1, i + width - 1, i + width, i + width + 1] // U Edge
    const urCheck = [i - 1, i + width - 1, i + width] // UR Corner
    const lCheck = [i - width, i - width + 1, i + 1, i + width, i + width + 1] // L Edge
    const mCheck = [i - width - 1, i - width, i - width + 1, i - 1, i + 1, i + width - 1, i + width, i + width + 1] // Middle
    const rCheck = [i - width - 1, i - width, i - 1, i + width - 1, i + width] // Right Edge
    const dlCheck = [i - width, i - width + 1, i + 1] // DL Corner
    const dCheck = [i - 1, i + 1, i - width - 1, i - width, i - width + 1] // D Edge
    const drCheck = [i - width - 1, i - width, i - 1] // DR Corner
    // check mines in these lists of indexes
    if ((isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // UL Corner
      for (let a = 0; a < ulCheck.length; a++) {
        removeButtons(ulCheck[a])
      }
    } else if ((!isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // U Edge
      for (let a = 0; a < uCheck.length; a++) {
        removeButtons(uCheck[a])
      }
    } else if ((!isAtLeft) && (isAtRight) && (isAtTop) && (!isAtBottom)) { // UR Corner
      for (let a = 0; a < urCheck.length; a++) {
        removeButtons(urCheck[a])
      }
    } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // L Edge
      for (let a = 0; a < lCheck.length; a++) {
        removeButtons(lCheck[a])
      }
    } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // Middle
      for (let a = 0; a < mCheck.length; a++) {
        removeButtons(mCheck[a])
      }
    } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (!isAtBottom)) { // R Edge
      for (let a = 0; a < rCheck.length; a++) {
        removeButtons(rCheck[a])
      }
    } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // DL Corner
      for (let a = 0; a < dlCheck.length; a++) {
        removeButtons(dlCheck[a])
      }
    } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // D Edge
      for (let a = 0; a < dCheck.length; a++) {
        removeButtons(dCheck[a])
      }
    } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (isAtBottom)) { // DR Corner
      for (let a = 0; a < drCheck.length; a++) {
        removeButtons(drCheck[a])
      }
    }
  }
}
// Add functions on buttons
function assignFunction () {
  for (let index = 0; index < buttons.length; index++) {
    buttons[index].setAttribute('id', index)
    buttons[index].addEventListener('mouseup', event => {
      if (event.button === 0) {
        removeButtons(index)
      } else if (event.button === 1) {
        alert(event.button + ' has no function yet')
      } else if (event.button === 2) {
        alert(event.button + ' has no function yet')
      }
    })
  }
}
generateField()
insertNumbers()
assignFunction()
console.log(grid)
console.log(mines)
console.log(squares)
