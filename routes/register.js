var express = require('express');
var router = express.Router();
var Users = require('../models/users');

/* POST /api/register/ */
router.post('/', function(req, res, next) {
    console.log(req.body);
    Users.Create(req.body, function(err, user){

        if(err){
            next(err);
        } else{
            res.send(200);

        }
    });
});

module.exports = router;
