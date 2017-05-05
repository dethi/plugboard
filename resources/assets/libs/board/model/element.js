export class Element {
  constructor(pos, spec) {
    this.pos = pos;
    this.spec = spec;

    this.input = spec.input.reduce(
      (result, item) => {
        result[item] = 0;
        return result;
      },
      {}
    );

    this.output = new Array(spec.output.length);
  }
}
