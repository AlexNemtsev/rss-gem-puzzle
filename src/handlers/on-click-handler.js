import sound from '../sound.wav';
import isEmptyNext from './is-empty-next';
import { empty, setEmpty, clearField } from '../elements/field';
import onMouseDownHandler from './on-mouse-down';
import { getFieldSize } from '../elements/field';
import { incrementMoves, moves, updateMoves } from '../elements/header/move-counter';
import { saveTime, updateTime } from '../elements/header/timer';
import { isSoundOn } from '../elements/header/checkbox';
import { grid, saveField, saveEmpty } from '../elements/field';
import { time } from '../elements/header/timer';
import { insertRecord, setTop } from '../elements/top-10-list';

const audio = new Audio(sound);

const checkWin = () => {
  const tiles = grid.children;
  const keys = Object.keys(tiles);
  return keys.every(key => {
    const col = Number(tiles[key].style.gridColumnStart);
    const row = Number(tiles[key].style.gridRowStart);
    const inner = Number(tiles[key].textContent);

    return ((row - 1) * getFieldSize() + col) === inner;
  });
}

const playSound = () => {
  audio.currentTime = 0;
  audio.play();
}

const moveTile = (tile) => {
  const temp = {
    row: Number(tile.style.gridRowStart),
    column: Number(tile.style.gridColumnStart)
  };
  tile.style.transform = `translate(${(empty.column - temp.column) * 100}%, ${(empty.row - temp.row) * 100}%)`;
  tile.style.transition = `250ms`;

  setEmpty(temp);
}

const createClone = (tile) => {
  const clone = tile.cloneNode(true);
  clone.style.gridColumnStart = `${empty.column}`;
  clone.style.gridRowStart = `${empty.row}`;
  clone.style.transform = `translate(0, 0)`;
  clone.addEventListener('click', onClickHandler);
  clone.addEventListener('mousedown', onMouseDownHandler);
  return clone;
}

const onClickHandler = (event) => {
  const tile = event.currentTarget;
  if (isEmptyNext(tile)) {
    const clone = createClone(tile);
    moveTile(tile);
    incrementMoves();
    localStorage.setItem('moves', moves);
    saveTime();
    updateMoves(moves);
    if (isSoundOn) playSound();
    setTimeout(() => {
      tile.remove();
      grid.append(clone);
      saveField(getFieldSize());
      saveEmpty();
      if (checkWin()) {
        alert(`Hooray! You solved the puzzle in ${time.textContent} and ${moves} moves!`);
        insertRecord(moves, getFieldSize());
        setTop(getFieldSize());
        clearField();
        localStorage.removeItem('field');
        localStorage.removeItem('fieldSize');
        localStorage.removeItem('empty');
        localStorage.removeItem('moves');
        localStorage.removeItem('time');
      }
    }, 250);
  }
}

export { onClickHandler, checkWin };