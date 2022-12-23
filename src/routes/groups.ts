
const dummyController = require('../controller/dummyController');
var express = require('express');


const router = express.Router();


router.get('/allgroups', dummyController.dummy);

module.exports=router;
