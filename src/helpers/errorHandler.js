const errorHandler = (res, status, message, errors = null) => {
    const response = {
        success: false,
        message,
        ...(errors && { errors })
    };
    return res.status(status).json(response);
};

module.exports = errorHandler;