var mongoose = require('mongoose');
var jsonResponse = require('./JsonResponse');
var PostModel = mongoose.model('Post');
var UserModel = mongoose.model('User');
var CategoryModel = mongoose.model('Category');

module.exports.addPost = function (request, response) {
    PostModel.create({
        title: request.body.title,
        type: request.body.type,
        detail: request.body.detail,
        userId: request.body.userId,
        categoryId: request.body.categoryId
    }, function (err, post) {
        if (err) {
            console.log(err);
            jsonResponse.send(response, 400, err);
        } else {
            console.log(post);
            jsonResponse.send(response, 201, post);
        }
    });
    // jsonResponse.send(response, 200, request.body);
    // console.log(request.body);
};

module.exports.getPost = function (request, response) {
    PostModel.findOne({
        _id: request.body._id
    })
        .populate('userId', 'email userName')
        .populate('categoryId', 'name')
        .exec(function (err, post) {
            if(err){
                console.log(err);
                jsonResponse.send(response, 400, err);
            } else {
                console.log(post);
                jsonResponse.send(response, 200, post);
            }
        })
};

module.exports.deletePost = function (request, response) {

};

module.exports.getPostList = function (request, response) {
    PostModel.find(request.body).sort('-created')
        .populate('userId', 'email userName')
        .populate('categoryId', 'name')
        .exec(function (error, postList) {
            if (error) {
                console.log('get post list error: ', error);
                jsonResponse.send(response, 400, error);
            } else {
                jsonResponse.send(response, 200, postList);
            }
        })
};

module.exports.modifyPost = function (request, response) {

};