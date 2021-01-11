document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.field')
  let squares = Array.from(document.querySelectorAll('.field div'))
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
    let i = 0
    while (i < squares.length) {
      let quantity = 0
      if (!(squares[i].classList.contains('mine'))) {
        // boolean for a location of the index
        const isAtLeft = i % width === 0
        const isAtRight = i % width === 8
        const isAtTop = Math.floor(i / height) === 0
        const isAtBottom = Math.floor(i / height) === 8
        // checklists for each type of indexes
        const ulCheck = [i + 1, i + width, i + width + 1]
        const uCheck = [i - 1, i + 1, i + width - 1, i + width, i + width + 1]
        const urCheck = [i - 1, i + width - 1, i + width]
        const lCheck = [i - width, i - width + 1, i + 1, i + width, i + width + 1]
        const cCheck = [i - width - 1, i - width, i - width + 1, i - 1, i + 1, i + width - 1, i + width, i + width + 1]
        const rCheck = [i - width - 1, i - width, i - 1, i + width - 1, i + width]
        const dlCheck = [i - width, i - width + 1, i + 1]
        const dCheck = [i - 1, i + 1, i - width - 1, i - width, i - width + 1]
        const drCheck = [i - width - 1, i - width, i - 1]
        // choose a number for each type of indexes
        if ((isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // UL Corner
          var a
          for (a = 0; a < ulCheck.length; a++) {
            if (squares[ulCheck[a]].classList.contains('mine')) {
              quantity++
            }
          }
        } else if ((!isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // U Edge
          var a
          for (a = 0; a < uCheck.length; a++) {
            if (squares[uCheck[a]].classList.contains('mine')) {
              quantity++
            }
          }
        } else if ((!isAtLeft) && (isAtRight) && (isAtTop) && (!isAtBottom)) { // UR Corner
          var a
          for (a = 0; a < urCheck.length; a++) {
            if (squares[urCheck[a]].classList.contains('mine')) {
              quantity++
            }
          }
        } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // L Edge
          var a
          for (a = 0; a < lCheck.length; a++) {
            if (squares[lCheck[a]].classList.contains('mine')) {
              quantity++
            }
          }
        } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // Center
          var a
          for (a = 0; a < cCheck.length; a++) {
            if (squares[cCheck[a]].classList.contains('mine')) {
              quantity++
            }
          }
        } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (!isAtBottom)) { // R Edge
          var a
          for (a = 0; a < rCheck.length; a++) {
            if (squares[rCheck[a]].classList.contains('mine')) {
              quantity++
            }
          }
        } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // DL Corner
          var a
          for (a = 0; a < drCheck.length; a++) {
            if (squares[dlCheck[a]].classList.contains('mine')) {
              quantity++
            }
          }
        } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // D Edge
          var a
          for (a = 0; a < dCheck.length; a++) {
            if (squares[dCheck[a]].classList.contains('mine')) {
              quantity++
            }
          }
        } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (isAtBottom)) { // DR Corner
          var a
          for (a = 0; a < drCheck.length; a++) {
            if (squares[drCheck[a]].classList.contains('mine')) {
              quantity++
            }
          }
        }
        // insert number
        if (quantity !== 0) {
          squares[i].innerHTML = quantity
        }
        i++
      } else { //if mine is in this index, skip to next index
        i++
      }
    }
  }
  fieldGen()
  insertNumbers()
  console.log(grid)
  console.log(mines)
  console.log(squares)
})
