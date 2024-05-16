const CustomError = require("./custom-error");

class GeneralError extends CustomError {
    constructor(message, metadata = {}) {
        super(message, 500, metadata);
        this.name = 'GeneralError';
    }
}

module.exports = GeneralError;