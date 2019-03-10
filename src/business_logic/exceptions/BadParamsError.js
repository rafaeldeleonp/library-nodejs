class BadParamsError extends Error {
  constructor(message, details = []) {
    super(message);
    Object.setPrototypeOf(this, BadParamsError.prototype);
    this.name = this.constructor.name;
    this.code = 400;
    this.details = details;
  }

  dump() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      details: this.details,
      code: this.code,
    };
  }
}

export default BadParamsError;
