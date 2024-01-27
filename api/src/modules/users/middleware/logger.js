const logRequest = (req, res, next) => {
    console.log(`Received ${req.method} request to ${req.originalUrl}`);
    next();
};

export { logRequest };
