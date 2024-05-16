const CustomError = require("./custom-error");

class BadRequestError extends CustomError {
    constructor(message, metadata = {}) {
        super(message, 400, metadata);
        this.name = 'BadRequestError';
    }
}

module.exports = BadRequestError;