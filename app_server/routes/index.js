var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main.js');

/* GET home page. */
//首页
router.get('/', ctrlMain.index);
//发布寻物启事页
router.get('/post', ctrlMain.post);
//发布寻物启事
router.post('/add-post', ctrlMain.addPost);
//获取寻物启事列表
router.get('/post-list', ctrlMain.postList);
//查看某条寻物启事的详情
router.get('/post-detail', ctrlMain.postDetail);
//查看用户信息
router.get('/profile', ctrlMain.profile);
//发布评论
router.post('/comment', ctrlMain.addComment);

//注册页
router.get('/sign-up', ctrlMain.signUp);
//注册
router.post('/addUser', ctrlMain.addUser);


//登录页
router.get('/sign-in', ctrlMain.signIn);
//登录
router.post('/login', ctrlMain.login);

//注销
router.get('/logout', ctrlMain.logout);


module.exports = router;
