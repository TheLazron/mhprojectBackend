
const groupController = require('../controller/groupController');
var express = require('express');


var router = express.Router();


router.get('/explore-groups', groupController.getAllGroups);

router.get('/group/:groupId', groupController.getSingleGroup);

router.get('/join-group/:groupId', groupController.joinGroup);

// router.get('/group/:groupID',)

module.exports=router;
