var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
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
    name: {
        type: String,
        require: true
    }
});

var postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
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
    finished: {
        type: Boolean,
        "default": false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    }
});

var commentSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        require: true
    },
    created: {
        type: Date,
        "default": Date.now
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

var announcementSchema = new mongoose.Schema({
    created: {
        type: Date,
        "default": Date.now
    },
    content: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.model('User', userSchema);
mongoose.model('Category', categorySchema);
mongoose.model('Post', postSchema);
mongoose.model('Comment', commentSchema);
mongoose.model('Announcement', announcementSchema);


