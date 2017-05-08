export class Element {
  constructor(id, pos, spec) {
    this.id = id;
    this.pos = pos;
    this.spec = spec;

    this.input = arrayToLinkObject(spec.input, () => null);
    this.output = arrayToLinkObject(spec.output, () => []);
    this.outputState = arrayToLinkObject(spec.output, () => 0);
  }
}

export function arrayToLinkObject(array, init) {
  return array.reduce(
    (result, item) => {
      result[item] = init();
      return result;
    },
    {}
  );
}
