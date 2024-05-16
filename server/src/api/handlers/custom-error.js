class CustomError extends Error {
  constructor(message, statusCode, metadata = {}) {
    super(message);

    this.name = this.constructor.name;

    this.statusCode = statusCode || 500;
    this.metadata = metadata;
  }
}

module.exports = CustomError;