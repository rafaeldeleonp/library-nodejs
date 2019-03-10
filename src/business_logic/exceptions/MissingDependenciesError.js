class MissingDependenciesError extends Error {
  constructor(dependency) {
    super(`Missing ${dependency} dependency.`);
    Object.setPrototypeOf(this, MissingDependenciesError.prototype);
    this.name = this.constructor.name;
    this.code = 500;
  }

  dump() {
    return {name: this.name, message: this.message, stack: this.stack, code: this.code};
  }
}

export default MissingDependenciesError;
