var mongoose = require('mongoose');
var jsonResponse = require('./JsonResponse');
var PostModel = mongoose.model('Post');

module.exports.addPost = function (request, response) {
    jsonResponse.send(response, 200, request.body);
    console.log(request.body);
};

module.exports.deletePost = function (request, response) {

};

module.exports.getPostList = function (request, response) {
    
};

module.exports.modifyPost = function (request, response) {
    
};