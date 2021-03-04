const cellSize = 40;
let widthInput = document.getElementById('width');
let heightInput = document.getElementById('height');
let mineCountInput = document.getElementById('mine-count-setting')
let width;
let height;
let fieldGrid = document.getElementById('field');
let buttonGrid = document.getElementById('buttons');
let squares;
let buttons;
let buttonList;
let minecount;
let mineCountBackup;
function addElement() {
  width = Number(widthInput.value);
  height = Number(heightInput.value);
  minecount = mineCountInput.value;
  mineCountBackup = mineCountInput.value;
  document.getElementById('minecount').innerHTML = minecount;
  document.getElementById('minecount').innerHTML = mineCountBackup;
  let field = document.createElement('div'); // <div>
  let fieldId = document.createAttribute('id'); //<id>
  fieldId.value = 'field'; //<id = 'field'>
  let fieldClass = document.createAttribute('class'); //<class>
  fieldClass.value = 'field'; //<class = 'field'>
  field.setAttributeNode(fieldId); //<div id = 'field'>
  field.setAttributeNode(fieldClass); //<div id = 'field' class = 'field'>
  document.body.replaceChild(field, fieldGrid);

  let buttonField = document.createElement('div'); //<div>
  let buttonFieldId = document.createAttribute('id'); //<id>
  buttonFieldId.value = 'buttons'; //<id = 'buttons'>
  let buttonFieldClass = document.createAttribute('class'); //<class>
  buttonFieldClass.value = 'buttons'; //<class = 'field'>
  buttonField.setAttributeNode(buttonFieldId); // <div id = 'buttons'>
  buttonField.setAttributeNode(buttonFieldClass); //<div id = 'buttons' class = 'buttons'>
  document.body.replaceChild(buttonField, buttonGrid);

  fieldGrid = document.getElementById('field');
  fieldGrid.style.width = String(width * cellSize) + 'px';
  fieldGrid.style.height = String(height * cellSize) + 'px';
  buttonGrid = document.getElementById('buttons');
  buttonGrid.style.width = String(width * cellSize) + 'px';
  buttonGrid.style.height = String(height * cellSize) + 'px';
  buttonGrid.style.marginTop = String(height * cellSize * -1) + 'px';
  for (let index = 0; index < width * height; index++) {
    let fieldDiv = document.createElement('div');// <div>
    field.appendChild(fieldDiv); // <div id = 'field'><div>

    let buttonFieldDiv = document.createElement('div'); //<div>
    let button = document.createElement('button'); // <button>
    let buttonClass = document.createAttribute('class'); //<class>
    buttonClass.value = 'field-button'; // <class = 'field-button'>
    button.setAttributeNode(buttonClass); // <button class = 'field-button'>
    buttonFieldDiv.appendChild(button); //<div><button class = 'field-button'>
    buttonField.appendChild(buttonFieldDiv); //<div><div><button class = 'field-button'>
  }
  squares = Array.from(fieldGrid.getElementsByTagName('div'));
  buttons = Array.from(buttonGrid.getElementsByTagName('div'));
  buttonList = Array.from(buttonGrid.getElementsByTagName('button'));
}
addElement();
