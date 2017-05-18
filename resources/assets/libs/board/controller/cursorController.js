import ElementView from '../view/elementView';

import Vector from '../../utils/vector';

export default class CursorController {
  constructor() {
    this.cursors = {};

    this.curCursorId = 0;
  }

  getCursor(spec) {
    return new Promise((resolve, reject) => {
      if (!this.cursors[spec.name]) {
        const newCursor = new ElementView(this.curCursorId++, 0, spec, false);

        newCursor.pos = new Vector(0, 0);
        newCursor.initComponent().then(() => {
          newCursor.getFabricElements().forEach(el => {
            el.opacity = 0.2;
          });
          this.cursors[spec.name] = newCursor;
          resolve(newCursor);
        });
      } else {
        resolve(this.cursors[spec.name]);
      }
    });
  }
}
