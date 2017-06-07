import ElementView from '../view/elementView';

import Vector from '../../utils/vector';

export default class CursorController {
  constructor(boardView) {
    this.cursors = {};
    this.curCursorId = 0;

    this.boardView = boardView;
  }

  getCursor(spec, rotate) {
    return new Promise((resolve, reject) => {
      if (!this.cursors[`${spec.name}_${rotate}`]) {
        const newCursor = new ElementView(
          this.curCursorId++,
          rotate,
          spec,
          false
        );

        newCursor.placeOnBoard(this.boardView, new Vector(0, 0));
        newCursor.initComponent().then(() => {
          newCursor.getFabricElements().forEach(el => {
            el.opacity = 0.2;
          });
          this.cursors[spec.name] = newCursor;
          resolve(newCursor);
        });
      } else {
        resolve(this.cursors[`${spec.name}_${rotate}`]);
      }
    });
  }
}
