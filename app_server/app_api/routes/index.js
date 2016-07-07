var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

router.get('/posts', ctrlMain.postList);
router.post('/posts', ctrlMain.post);

module.exports = router;