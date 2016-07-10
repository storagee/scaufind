var request = require('request');

var options = {
    apiPath: 'http://localhost:3000/api/',
    homePath: 'http://localhost:3000/',
    signUpSubmitPath: 'http://localhost:3000/addUser',
    loginPath: 'http://localhost:3000/sign-in/'
};

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
        title = "500, internal server error";
        content = "How embarrassing. There's a problem with our server.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content,
        user: req.session.user
    });
};

module.exports.index = function (req, res) {
    var requestOptions = {
        url: options.apiPath + 'getPostList',
        method: "GET",
        json: {}
    };
    request(requestOptions, function (error, response, body) {
        if (response.statusCode === 200) {
            // console.log(body);
            var data = {
                losts: [],
                founds: [],
                user: req.session.user
            };
            body.forEach(function (item, index, array) {
                if (item.type == 'lost') {
                    data.losts.push(item);
                } else {
                    data.founds.push(item);
                }
            });
            // console.log('ready to render, data is: ', data);
            res.render('index', data);
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

module.exports.post = function (req, res) {
    var user = req.session.user;
    if (user) {
        var requestOptions = {
            url: options.apiPath + 'getCategories',
            method: "GET",
            json: {}
        };
        request(requestOptions, function (error, response, body) {
            if (response.statusCode === 200) {
                // console.log(body);
                res.render('post', {
                    options: body,
                    userId: user._id,
                    submitUrl: options.homePath + 'add-post',
                    user: req.session.user
                });
            } else {
                _showError(req, res, response.statusCode);
            }
        })
    } else {
        res.redirect(options.loginPath);
    }
};

module.exports.addPost = function (req, res) {
    var requestOptions = {
        url: options.apiPath + 'addPost',
        method: "POST",
        json: req.body
    };
    // console.log(req.body);
    request(requestOptions, function (error, response, body) {
        if (response.statusCode == 201) {
            // console.log(body);
            res.redirect(options.homePath);
        } else {
            _showError(req, res, response.statusCode);
        }
    })
};

module.exports.postList = function (req, res) {
    var requestOptions = {
        url: options.apiPath + 'getPostList',
        method: "GET",
        json: {}
    };
    if (req.query.type == 'lost') {
        requestOptions.json.type = 'lost';
        request(requestOptions, function (error, response, body) {
            if (response.statusCode === 200) {
                // console.log('type = lost :::::::::::::::::::::::', body);
                res.render('post-list', {
                    posts: body,
                    user: req.session.user
                });
            } else {
                _showError(req, res, response.statusCode);
            }
        });
    } else {
        requestOptions.json.type = 'found';
        request(requestOptions, function (error, response, body) {
            if (response.statusCode === 200) {
                // console.log('type = found :::::::::::::::::::::::', body);
                res.render('post-list', {
                    posts: body,
                    user: req.session.user
                });
            } else {
                _showError(req, res, response.statusCode);
            }
        });
    }
    // res.render('post-list', {
    //     user: req.session.user
    // });
};

module.exports.signIn = function (req, res) {
    console.log('req.session.message: ------------------------------', req.session.message);
    res.render('sign-in', {
        submitUrl: options.homePath + 'login',
        message: req.session.message,
        user: req.session.user
    });
};

module.exports.signUp = function (req, res) {
    res.render('sign-up', {
        submitUrl: options.signUpSubmitPath,
        message: req.session.message,
        user: req.session.user
    });
};

module.exports.addUser = function (req, res) {
    // console.log(req.body);
    request({
        url: options.apiPath + 'getUserByEmail',
        method: 'GET',
        json: req.body
    }, function (findUserError, findUserResponse, User) {
        if (findUserError) {
            console.error('find user error: ', findUserError);
        } else {
            if (findUserResponse.statusCode == 200) {
                // console.log('in user email: ', User, req.body.email);
                if (!User) {
                    request({
                        url: options.apiPath + 'addUser',
                        method: "POST",
                        json: req.body
                    }, function (error, response, body) {
                        // console.log('---------------' + 1);
                        if (response.statusCode == 201) {
                            // console.log(body);
                            res.redirect(options.loginPath);
                        } else {
                            _showError(req, res, response.statusCode)
                        }
                    });
                } else {
                    req.session.message = '用户已存在';
                    res.redirect(options.homePath + 'sign-up');
                    req.session.message = null;
                }
            } else {
                console.error('findUserNot 200' + findUserResponse.statusCode);
                _showError(req, res, response.statusCode)
            }

        }
    });
};

module.exports.login = function (req, res) {
    request({
        url: options.apiPath + 'getUserByEmail',
        method: 'GET',
        json: req.body
    }, function (findUserError, findUserResponse, User) {
        if (findUserError) {
            console.log('login find user Error: ', findUserError);
        } else {
            if (findUserResponse.statusCode == 200) {
                // console.log('in user email: ', User, req.body.email);
                if (User) {
                    if (req.body.password == User.password) {
                        req.session.user = User;
                        res.redirect(options.homePath);
                    } else {
                        req.session.message = '账户或密码不正确';
                        res.redirect(options.homePath + 'sign-in');
                        req.session.message = null;
                        console.log('req.session.message: ------------------------------', req.session.message);
                    }
                } else {
                    req.session.message = '账户或密码不正确';
                    res.redirect(options.homePath + 'sign-in');
                    req.session.message = null;
                    console.log('req.session.message: ------------------------------', req.session.message);
                }
            } else {
                console.error('findUserNot 200' + findUserResponse.statusCode);
                _showError(req, res, response.statusCode)
            }
        }
    })
};

module.exports.logout = function (req, res) {
    req.session.user = null;
    res.redirect(options.homePath);
};

module.exports.postDetail = function (req, res) {
    var requestOptions = {
        url: options.apiPath + 'getPost',
        method: "GET",
        json: {
            _id: req.query.userId
        }
    };
    request(requestOptions, function (error, response, body) {
        if (response.statusCode === 200) {
            // console.log('type = lost :::::::::::::::::::::::', body);
            res.render('post-detail', {
                post: body,
                user: req.session.user
            });
        } else {
            _showError(req, res, response.statusCode);
        }
    });

    // res.render('post-detail', {
    //     user: req.session.user
    // });
};

module.exports.profile = function (req, res) {
    // console.log(req.session.user);
    res.render('profile', {
        user: req.session.user
    });
};

//评论
module.exports.addComment = function (req, res) {
    if (req.session.user) {
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@SSS', req.session.user._id);
        // console.log('####################################################');
        var requestOptions = {
            url: options.apiPath + 'addComment',
            method: "POST",
            json: {
                comment: req.body.comment,
                postId: req.body.postId,
                userId: req.session.user._id
            }
        };
        request(requestOptions, function (error, response, body) {
            res.status(response.statusCode);
            res.json(body);
        });
    } else {
        res.status(200);
        res.json({
            success: false,
            isLogin: false,
        });
    }
};