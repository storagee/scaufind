module.exports.send = function (response, status, content) {
    response.status(status);
    response.json(content);
};