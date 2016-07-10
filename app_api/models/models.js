var mongoose = require('mongoose');

//用户Schema定义
var userSchema = new mongoose.Schema({
    email: {
        type: String, //email的类型为字符串
        require: true, //非空
        unique: true //唯一
    },
    password: {
        type: String, //密码的类型为字符串
        require: true //非空
    },
    userName: String, //用户名的类型为字符串
    mobile: Number, //手机号的类型为数值
    qq: Number, //qq的类型为数值
    wechat: String, //微信号的类型为字符串
    created: {
        type: Date, //创建日期的类型为日期类型
        "default": Date.now //默认值为创建时间
    }
});

//分类Schema定义
var categorySchema = new mongoose.Schema({
    name: {
        type: String, //分类名的类型为字符串
        require: true //非空
    }
});

//评论Schema定义
var commentSchema = new mongoose.Schema({
    content: {
        type: String, //评论内容的类型为字符串
        require: true //非空
    },
    created: {
        type: Date, //创建日期的类型为日期类型
        "default": Date.now //默认值为创建日期
    },
    subComment: [this], //自评论的类型为评论类型，也就是本身类型
    userId: {
        type: mongoose.Schema.Types.ObjectId, //评论用户的引用
        ref: 'User', //引用自User Model
        require: true //非空
    }
});

//启事Schema定义
var postSchema = new mongoose.Schema({
    title: {
        type: String, //启事类型为字符串
        require: true //非空
    },
    type: {
        type: 'String', //启事分类类型为字符串
        enum: ['lost', 'found'] //lost found二者之一
    },
    detail: String, //启事详情为字符串
    created: {
        type: Date, //创建时间类型为日期类型
        "default": Date.now //默认值为创建日期
    },
    updated: {
        type: Date, //更新日期类型为日期类型
        "default": Date.now //默认值为创建日期
    },
    finished: {
        type: Boolean, //是否完成（物归原主）类型为布尔型
        "default": false //默认是false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, //发布者的引用
        ref: 'User', //引用自User Model
        require: true //非空
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, //物品分类的引用
        ref: 'Category', //引用自Cate（物品分类）
        require: true //非空
    },
    comment: [commentSchema] //subDocument，子文档，即该启事的评论
});

//公告Schema定义
var announcementSchema = new mongoose.Schema({
    created: {
        type: Date, //公告创建日期类型为日期类型
        "default": Date.now //默认值为创建日期
    },
    content: String, //公告内容为字符串类型
    userId: {
        type: mongoose.Schema.Types.ObjectId, //公告发布者的引用
        ref: 'User' //引用自User
    }
});

//声明model
mongoose.model('User', userSchema);
mongoose.model('Category', categorySchema);
mongoose.model('Post', postSchema);
mongoose.model('Comment', commentSchema);
mongoose.model('Announcement', announcementSchema);


