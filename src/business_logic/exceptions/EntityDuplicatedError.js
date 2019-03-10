class EntityDuplicatedError extends Error {
  constructor(entity, uniqueIndex) {
    const uniqueIndexJson = JSON.stringify(uniqueIndex);
    const message = `${entity}: ${uniqueIndexJson} already exists`;
    super(message);
    Object.setPrototypeOf(this, EntityDuplicatedError.prototype);
    this.name = this.constructor.name;
    this.code = 409;
    this.entity = entity;
    this.index = uniqueIndex;
  }

  dump() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      code: this.code,
      entity: this.entity,
      uniqueIndex: this.index,
    };
  }
}

export default EntityDuplicatedError;
