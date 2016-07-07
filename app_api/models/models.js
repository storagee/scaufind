var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    userName: String,
    mobile: Number,
    qq: Number,
    wechat: String,
    created: {
        type: Date,
        "default": Date.now
    }
});

var categorySchema = new mongoose.Schema({
    name: String
});

var postSchema = new mongoose.Schema({
    title: String,
    type: {
        type: 'String',
        enum: ['lost', 'found']
    },
    detail: String,
    created: {
        type: Date,
        "default": Date.now
    },
    updated: {
        type: Date,
        "default": Date.now
    },
    finished: Boolean,
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    }
});

var commentSchema = new mongoose.Schema({
    content: String,
    parentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    },
    created: {
        type: Date,
        "default": Date.now
    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

var announcementSchema = new mongoose.Schema({
    created: {
        type: Date,
        "default": Date.now
    },
    content: String,
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('User', userSchema);
mongoose.model('Category', categorySchema);
mongoose.model('Post', postSchema);
mongoose.model('Comment', commentSchema);
mongoose.model('Announcement', announcementSchema);


