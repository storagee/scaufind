var mongoose = require('mongoose');

var sendJsonResponse = function (response, status, content) {
    response.status(status);
    response.json(content);
};

module.exports.post = function (request, response) {
    sendJsonResponse(response, 200, {
        'controller': 'post',
        'status': 'success'
    })
};

module.exports.postList = function (request, response) {
    sendJsonResponse(response, 200, {
        'title': 'fighting!',
        'for': 'every thing'
    })
};
