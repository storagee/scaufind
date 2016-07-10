var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var PostController = require('../controllers/PostController');
var UserController = require('../controllers/UserController');
var CategoryController = require('../controllers/CategoryController');


//Post路由
router.post('/addPost', PostController.addPost);
router.post('/deletePost', PostController.deletePost);
router.get('/getPostList', PostController.getPostList);
router.get('/getPost', PostController.getPost);
router.post('/modifyPost', PostController.modifyPost);

//User路由
router.post('/addUser', UserController.addUser);
router.get('/getUserList', UserController.getUserList);
router.get('/getUserByEmail', UserController.getUserByEmail);

//Categorys路由
router.post('/addCategores', CategoryController.addCategores);
router.get('/getCategories', CategoryController.getCategoryList);

module.exports = router;
