var express = require('express');
var router = express.Router();
var path = require('path');
var likedRestaurant = require('../models/comment');

router.get('/list',function(req,res,next){
    console.log("entered", likedRestuarant);
    likedRestaurant.find({}).exec(function(err, restaurant){
        if(err) {
            throw err;
        } else{
            res.send(JSON.stringify(restaurant));
            next();
        }
    });
});

router.post('/', function(req,res,next) {
    console.log('adding restaurant:',req.body)
    likedRestaurant.create(req.body, function (err, post) {

        if (err){
            console.log(err);
            next(err);
        }else{
            res.json(post);
        }

    })
});

module.exports = router;