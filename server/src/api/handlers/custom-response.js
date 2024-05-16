const CustomError = require('./custom-error');
const BadRequestError = require('./bad-request-err');
const NotFoundError = require('./not-found-error');

class CustomResponse {
  constructor(res, error = null, data = null, meta = null) {
    this.res = res;
    this.error = error;
    this.data = data;
    this.meta = meta;
  }

  send() {
    const response = {};

    if (this.error instanceof CustomError) {
      response.statusCode = this.error.statusCode;
      response.message = this.error.message;
    } else {
      response.statusCode = 500;
      response.message = 'Internal Server Error';
    }

    if (this.data !== null) {
      response.data = this.data;
    }

    if (this.meta !== null) {
      response.meta = this.meta;
    }

    return this.res.status(response.statusCode).json(response);
  }

  static success(res, message, data = null, meta = null) {
    return new CustomResponse(res, null, data, meta).send();
  }

  static created(res, message, data = null, meta = null) {
    return new CustomResponse(res, null, data, meta).send();
  }

  static badRequest(res, message, data = null, meta = null) {
    const error = new BadRequestError(message, data);
    return new CustomResponse(res, error, data, meta).send();
  }

  static notFound(res, message, data = null, meta = null) {
    const error = new NotFoundError(message, data);
    return new CustomResponse(res, error, data, meta).send();
  }

  // Other error handling methods...
}

module.exports = CustomResponse;