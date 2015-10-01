var express = require('express');
var router = express.Router();
var request = require('request');
//

router.get('/', function (req, res, next) {
    console.log(req.query);

    var oauth = {
        consumer_key: 'HPZlPZ0VBWGSQAve7AB18w'
        , consumer_secret: 'cRdpN2MjV4dbwD_SCu00dZLO6DE'
        , token: 'VjB6eqGU3aVMnfNXIH_9Nyim0QMgAdTS'
        , token_secret: '4CVyX5q0WStxA9CDUeV-1DnNb7Y'
    };
     //api.yelp.com/v2/search/?location=Minneapolis, MN&sort=2&radius_filter=4500&category_filter=pizza
    var url = 'http://api.yelp.com/v2/search/?location=' +req.query.location + '&sort=2&radius_filter=8500&category_filter=' + req.query.term;

    request.get({url: url, oauth: oauth, json: true}, function (err, request, data) {
        if (err) {
            next(err);
        } else {
            res.json(data);
        }

    })
});

module.exports = router;

