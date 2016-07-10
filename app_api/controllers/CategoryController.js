var mongoose = require('mongoose');
var jsonResponse = require('./JsonResponse');
var CategoryModel = mongoose.model('Category');

//增加一个物品分类
module.exports.addCategores = function (request, response) {
    console.log('request.body.categories', request.body['categories[]']);
    request.body['categories[]'].forEach(function (item, index, array) {
        CategoryModel.create({
            name: item
        });
    });
    jsonResponse.send(response, 200, request.body['categories[]']);
    console.log(request.body['categories[]']);
};

module.exports.deleteCategory = function (request, response) {

};

//获取所有物品分类
module.exports.getCategoryList = function (request, response) {
    CategoryModel.find(function (error, Categories) {
        if(error){
            console.log(error);
            jsonResponse.send(response, 400, error);
        }else{
            jsonResponse.send(response, 200, Categories);
        }
    })
};

module.exports.modifyCategory = function (request, response) {

};