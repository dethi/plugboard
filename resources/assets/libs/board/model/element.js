export class Element {
  constructor(id, pos, spec) {
    this.id = id;
    this.pos = pos;
    this.spec = spec;

    this.input = arrayToLinkObject(spec.input, true);
    this.output = arrayToLinkObject(spec.output, false);
  }
}

export function arrayToLinkObject(array, isInput) {
  return array.reduce(
    (result, item) => {
      result[item] = isInput ? null : [];
      return result;
    },
    {}
  );
}
