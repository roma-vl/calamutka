const logRequest = (req, res, next) => {
    console.log(`Received ${req.method} request to ${req.originalUrl}`);
    next();
};

module.exports = { logRequest };
