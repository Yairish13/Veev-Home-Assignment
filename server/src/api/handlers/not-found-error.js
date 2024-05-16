const CustomError = require("./custom-error");

class NotFoundError extends CustomError {
    constructor(message, metadata = {}) {
        super(message, 404, metadata);
        this.name = 'NotFoundError';
    }
}

module.exports = NotFoundError;