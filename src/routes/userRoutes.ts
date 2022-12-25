// const Router = express.Router();
const userController = require('../controller/userController')
var express = require('express');

var router = express.Router();

router.get('/userDetails/:uid', userController.getUserDetails);



module.exports= router;