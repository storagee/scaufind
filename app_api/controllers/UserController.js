var mongoose = require('mongoose');
var jsonResponse = require('./JsonResponse');
var UserModel = mongoose.model('User');

//增加一个User（注册）
module.exports.addUser = function (request, response) {
    UserModel.create({
        email: request.body.email,
        password: request.body.password,
        userName: request.body.userName,
        mobile: request.body.mobile,
        qq: request.body.qq,
        wechat: request.body.wechat
    }, function (error, User) {
        if(error){
            console.log('create user error: ', error);
            jsonResponse.send(response, 400, error);
        }else{
            // console.log(User);
            jsonResponse.send(response, 201, User)
        }
    });
};

module.exports.deleteUser = function (request, response) {

};

//获取所有User
module.exports.getUserList = function (request, response) {
    UserModel.find(function (error, Users) {
        if(error){
            console.log('get user list error: ', error);
            jsonResponse.send(response, 400, error);
        }else{
            // console.log(Users);
            jsonResponse.send(response, 200, Users);
        }
    })
};

module.exports.modifyUser = function (request, response) {

};

//通过Email获取一个User
module.exports.getUserByEmail = function (request, response) {
    // console.log('------------------email: ', request.body.email);
    UserModel.findOne({email: request.body.email}, function(error, User){
        if(error){
            console.error('get user by email error: ', error);
        }else{
            // console.log(User);
            jsonResponse.send(response, 200, User);
        }
    })
};