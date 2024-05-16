const CustomError = require("../handlers/custom-error");

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            error: {
                ...err,
                message: err.message,
            }
        });
    }

    return res.status(500).json({ error: { message: err.message } });
};
module.exports = { errorHandler };