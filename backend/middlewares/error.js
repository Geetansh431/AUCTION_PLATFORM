class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server error.";
    err.statusCode = err.statusCode || 500;

    // Specific error cases
    if (err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid, Try again.";
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = "Json Web Token is expired, Try again.";
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    let errorMessage = err.message;
    if (err.errors) {
        errorMessage = Object.values(err.errors)
            .map(error => error.message)
            .join(" ");
    } 


    return res.status(err.statusCode).json({
        success:false,
        status: err.status || 'error',
        message: errorMessage,
    });
}

export default ErrorHandler