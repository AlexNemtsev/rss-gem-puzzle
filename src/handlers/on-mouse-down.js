import isEmptyNext from "./is-empty-next";
import { empty } from '../elements/field';
import { getFieldSize } from "../elements/field";

const onMouseDownHandler = (event) => {
  const tile = event.currentTarget;
  if (isEmptyNext(tile)) {
    const startPosX = event.pageX;
    const startPosY = event.pageY;

    const onMouseMoveHandler = (event) => {
      const tile = event.currentTarget;

      const onMouseOutHandler = (event) => {
        const tile = event.currentTarget;
        tile.style.transform = `translate(0, 0)`;
        tile.removeEventListener('mousemove', onMouseMoveHandler);
        tile.removeEventListener('mouseout', onMouseOutHandler);
      }

      const calcMoving = (mouseMovement, sign) => {
        const abs = Math.abs(mouseMovement);

        tile.addEventListener('mouseup', (e) => {
          e.currentTarget.removeEventListener('mouseout', onMouseOutHandler);
        });

        if (abs >= 300 / getFieldSize()) {
          tile.addEventListener('mouseout', onMouseOutHandler);
          return 300 / getFieldSize() * sign;
        } else if (mouseMovement / abs !== sign) {
          tile.addEventListener('mouseout', onMouseOutHandler);
          return 0;
        }

        return abs * sign;
      }

      const moveX = calcMoving(event.pageX - startPosX,
        empty.column - tile.style.gridColumnStart);
      const moveY = calcMoving(event.pageY - startPosY,
        empty.row - tile.style.gridRowStart);
      tile.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    tile.addEventListener('mousemove', onMouseMoveHandler);
    tile.addEventListener('mouseup', (e) => {
      e.currentTarget.removeEventListener('mousemove', onMouseMoveHandler);
    });
  }
}

export default onMouseDownHandler;