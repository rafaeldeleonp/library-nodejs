export default class InvalidOperantionException extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, InvalidOperantionException.prototype);
    this.name = this.constructor.name;
  }

  dump() {
    return { message: this.message, stack: this.stack };
  }
}
