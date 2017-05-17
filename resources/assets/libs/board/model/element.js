export class Element {
  constructor(id, pos, spec) {
    this.id = id;
    this.pos = pos;
    this.specName = spec.name;

    this.input = arrayToLinkObject(spec.input, () => null);
    this.inputState = arrayToLinkObject(spec.input, () => 0);

    this.output = arrayToLinkObject(spec.output, () => []);
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
