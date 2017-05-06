export class Element {
  constructor(id, pos, spec) {
    this.id = id;
    this.pos = pos;
    this.spec = spec;

    this.input = arrayToLinkObject(spec.input);
    this.output = arrayToLinkObject(spec.output);
  }
}

function arrayToLinkObject(array) {
  return array.reduce(
    (result, item) => {
      result[item] = null;
      return result;
    },
    {}
  );
}
