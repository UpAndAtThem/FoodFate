var express = require('express');
var router = express.Router();
var path = require('path');
var likedRestaurants = require('../models/comment');

router.get('/*',function(req,res,next){
    console.log("entered");
    likedRestaurants.find({}).exec(function(err, restaurant){
        if(err) {
            throw err;
        } else{
            res.json(restaurant);
            next();
        }
    });
});

router.post('/', function(req,res,next) {
    console.log('adding restaurant:',req.body)
    likedRestaurants.create(req.body, function (err, post) {

        if (err){
            console.log(err);
            next(err);
        }else{
            res.json(post);
        }

    })
});

module.exports = router;