module.exports = function (req, res, next) {
    // Bypass token verification
    next();
};
