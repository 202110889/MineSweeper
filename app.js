var grid = document.getElementById('field')
var squares = Array.from(grid.getElementsByTagName('div'))
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
function fieldGen () {
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
      } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // Center
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
      }
    } else { // if mine is in this index, skip to next index
      continue
    }
  }
}
fieldGen()
insertNumbers()
console.log(grid)
console.log(mines)
console.log(squares)
