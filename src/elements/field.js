import { onClickHandler } from "../handlers/on-click-handler";
import onMouseDownHandler from "../handlers/on-mouse-down";
import { fieldSizeSelect } from "./form";

const getFieldSize = () => Number(localStorage.getItem('fieldSize') ?? fieldSizeSelect.value);
const setGridSize = () => `repeat(${getFieldSize()}, 1fr) / repeat(${getFieldSize()}, 1fr)`;

const grid = document.createElement('div');
grid.className = 'grid';
grid.style.gridTemplate = setGridSize();

const saveEmpty = () => localStorage.setItem('empty', JSON.stringify(empty));
const loadEmpty = () => {
  return JSON.parse(localStorage.getItem('empty'));
}

let empty = loadEmpty() ?? { row: getFieldSize(), column: getFieldSize() };

const setEmpty = (newEmpty) => empty = newEmpty;

const generateSequance = () => {
  const sequance = [];

  for (let i = 1; i < getFieldSize() * getFieldSize(); i++) {
    sequance.push(i);
  }

  sequance.sort(() => Math.random() - 0.5);
  const sum = sequance.reduce((acc, n, i, arr) => {
    const subArr = arr.slice(i + 1);
    return acc + subArr.reduce((a, num) => a + (num < n ? 1 : 0), 0);
  }, 0);

  if (sum % 2 === 1) {
    const temp = sequance[sequance.length - 1];
    sequance[sequance.length - 1] = sequance[sequance.length - 2];
    sequance[sequance.length - 2] = temp;
  }

  return sequance;
}

const saveField = (fieldSize) => {
  const tilesElems = grid.children;
  const tilesObjects = {};

  for (let tile of tilesElems) {
    tilesObjects[tile.textContent] = {
      row: tile.style.gridRowStart,
      column: tile.style.gridColumnStart,
    };
  }

  localStorage.setItem('field', JSON.stringify(tilesObjects));
  localStorage.setItem('fieldSize', fieldSize);
}

const appendTile = (xPos, yPos, value) => {
  const gridElem = document.createElement('div');
  const circle = document.createElement('div');
  gridElem.append(circle);
  circle.append(value);
  gridElem.className = 'grid__elem';
  circle.className = 'circle';
  gridElem.style.gridArea = `${xPos}/${yPos}/span 1/span 1`;
  gridElem.addEventListener('click', onClickHandler);
  gridElem.addEventListener('mousedown', onMouseDownHandler);
  grid.append(gridElem);
}

const loadField = () => {
  const fieldSize = getFieldSize();
  const tiles = JSON.parse(localStorage.getItem('field'));

  for (let i = 1; i < fieldSize * fieldSize; i++) {
    appendTile(tiles[i].row, tiles[i].column, i);
  }
}

const generateField = (fieldSize) => {
  const tiles = generateSequance();

  for (let i = 0; i < fieldSize * fieldSize - 1; i++) {
    const row = Math.floor(i / fieldSize) + 1;
    const column = i % fieldSize + 1;

    appendTile(row, column, tiles[i]);
  }

  saveField(fieldSize);
  saveEmpty();
}

const clearField = () => {
  while (grid.children.length !== 0) {
    grid.children[0].remove();
  }
}

export { grid, saveField, loadField, generateField, clearField, setGridSize, getFieldSize, setEmpty, empty, saveEmpty };