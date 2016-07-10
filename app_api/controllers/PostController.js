var mongoose = require('mongoose');
var jsonResponse = require('./JsonResponse');
var PostModel = mongoose.model('Post');
var UserModel = mongoose.model('User');
var CategoryModel = mongoose.model('Category');

//发布启事
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
            // console.log(post);
            jsonResponse.send(response, 201, post);
        }
    });
    // jsonResponse.send(response, 200, request.body);
    // console.log(request.body);
};

//通过id获得一个启事
module.exports.getPost = function (request, response) {
    PostModel.findOne({
        _id: request.body._id
    })
        .populate('userId', 'email userName')
        .populate('categoryId', 'name')
        .populate('comment.userId')
        .exec(function (err, post) {
            if(err){
                console.log(err);
                jsonResponse.send(response, 400, err);
            } else {
                for(var i = 0; i < post.comment.length; i++){
                    // console.log(post.comment[i].userId);
                }
                // console.log(post);
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

module.exports.addComment = function (req, res) {
    // console.log(req.body);
    PostModel.findById(req.body.postId, 'comment',
    function (err, post) {
        if(err){
            console.log('add comment error: ', err);
            jsonResponse.send(res, 400, {
                success: false
            })
        }else{
            post.comment.push({
                content: req.body.comment,
                userId: req.body.userId
            });
            post.save(function (err, post) {
                if(err){
                    jsonResponse.send(res, 400, {
                        success: false
                    })
                }else{
                    jsonResponse.send(res, 200, {
                        userId: req.body.userId,
                        content: req.body.comment,
                        success: true
                    })
                }
            })
        }
    });
};