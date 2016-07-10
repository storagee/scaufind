var mongoose = require('mongoose');

var user = {
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
};

var category = {
    name: String
};

var post = {
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
};

var comment = {
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
};

var announcement = {
    created: {
        type: Date,
        "default": Date.now
    },
    content: String,
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
};

