import './style.css';

import { top10Header, top10List, loadTop, setTop } from './elements/top-10-list';
import { checkBoxLabel } from './elements/header/checkbox';
import { movesCounter, updateMoves, resetMoves } from './elements/header/move-counter';
import { time, updateTime, resetTime } from './elements/header/timer';
import { grid, loadField, generateField, clearField, setGridSize, getFieldSize, setEmpty } from './elements/field';
import { form } from './elements/form';

const body = document.body;

const header = document.createElement('header');

let moves = localStorage.getItem('moves') ?? 0;

updateTime();
updateMoves();

header.append(time);
header.append(movesCounter);
header.append(checkBoxLabel);

const topWrapper = document.createElement('div');
topWrapper.className = 'top-wrapper';

loadTop();

setTop(getFieldSize());

topWrapper.append(top10Header);
topWrapper.append(top10List);

body.append(header);
body.append(grid);
body.append(form);
body.append(topWrapper);

localStorage.getItem('field') === null ? generateField(getFieldSize()) : loadField();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearField();
  resetMoves();
  resetTime();
  localStorage.removeItem('field');
  localStorage.removeItem('fieldSize');
  localStorage.removeItem('empty');
  localStorage.removeItem('moves');
  localStorage.removeItem('time');
  grid.style.gridTemplate = setGridSize();
  setEmpty({ row: getFieldSize(), column: getFieldSize() });
  generateField(getFieldSize());
  loadTop();
  updateMoves(moves);
  setTop(getFieldSize());
});
