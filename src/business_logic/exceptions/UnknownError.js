class UnknownError extends Error {
  constructor(message, error) {
    super(message);
    Object.setPrototypeOf(this, UnknownError.prototype);
    this.name = this.constructor.name;
    this.code = 500;
    this.details = error;
  }

  dump() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      code: this.code,
      details: this.details.dump(),
    };
  }
}

export default UnknownError;
