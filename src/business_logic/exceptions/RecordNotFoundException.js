export default class RecordNotFoundException extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, RecordNotFoundException.prototype);
    this.name = this.constructor.name;
  }

  dump() {
    return { message: this.message, stack: this.stack };
  }
}
