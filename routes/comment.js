var express = require('express');
var router = express.Router();
var path = require('path');
var Comment = require('../models/comment');

router.get('/:rating?',function(req,res,next){
    console.log("entered");
    Comment.find({}).exec(function(err, restaurant){
        if(err) {
            next(err);
        } else{
            res.json(restaurant);
        }
    });
});

router.post('/', function(req,res,next) {

    Comment.create(req.body, function (err, post) {

        if (err){
            console.log(err);
            next(err);
        }else{
            console.log('adding restaurant:', res.body)
            res.json(post);
        }

    })
});

router.delete('/', function(req, res, next) {
    console.log("this is the delete route id", req.body.id, req.query);

    Comment.findOneAndRemove({_id: req.body.id }, function(err, node) {

        if(err){
            next(err);
        }else {
            console.log("Deleted:", node);
            res.status(200).send("deleted");
        }
    })

});

module.exports = router;