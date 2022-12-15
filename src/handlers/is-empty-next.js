import { empty } from "../elements/field";

const isEmptyNext = (tile) => {
  const column = tile.style.gridColumnStart;
  const row = tile.style.gridRowStart;
  const rowDiff = row - empty.row;
  const colDiff = column - empty.column;
  if (Math.abs(colDiff) === 1 && Math.abs(rowDiff) === 0) return true;
  if (Math.abs(colDiff) === 0 && Math.abs(rowDiff) === 1) return true;

  return false;
}

export default isEmptyNext;