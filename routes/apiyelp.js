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

    var url = 'http://api.yelp.com/v2/search/?location=' +req.query.location + '&sort=2&category_filter=' + req.query.term;

    request.get({url: url, oauth: oauth, json: true}, function (err, request, data) {
        if (err) {
            next(err);
        } else {
            res.json(data);
        }

    })
});

module.exports = router;

//var qs = require('querystring')
//    , oauth =
//    { callback: 'localhost:3000/'
//        , consumer_key: 'HPZlPZ0VBWGSQAve7AB18w'
//        , consumer_secret: 'cRdpN2MjV4dbwD_SCu00dZLO6DE'
//    }
//    , url = 'https://api.twitter.com/oauth/request_token';
//request.post({url:url, oauth:oauth}, function (e, r, body) {
//    // Ideally, you would take the body in the response
//    // and construct a URL that a user clicks on (like a sign in button).
//    // The verifier is only available in the response after a user has
//    // verified with twitter that they are authorizing your app.
//
//    // step 2
//    var req_data = qs.parse(body)
//    var uri = 'https://api.twitter.com/oauth/authenticate'
//        + '?' + qs.stringify({oauth_token: req_data.oauth_token})
//    // redirect the user to the authorize uri
//
//    // step 3
//    // after the user is redirected back to your server
//    var auth_data = qs.parse(body)
//        , oauth =
//        { consumer_key: CONSUMER_KEY
//            , consumer_secret: CONSUMER_SECRET
//            , token: auth_data.oauth_token
//            , token_secret: req_data.oauth_token_secret
//            , verifier: auth_data.oauth_verifier
//        }
//        , url = 'https://api.twitter.com/oauth/access_token'
//        ;
//    request.post({url:url, oauth:oauth}, function (e, r, body) {
//        // ready to make signed requests on behalf of the user
//        var perm_data = qs.parse(body)
//            , oauth =
//            { consumer_key: CONSUMER_KEY
//                , consumer_secret: CONSUMER_SECRET
//                , token: perm_data.oauth_token
//                , token_secret: perm_data.oauth_token_secret
//            }
//            , url = 'https://api.twitter.com/1.1/users/show.json'
//            , qs =
//            { screen_name: perm_data.screen_name
//                , user_id: perm_data.user_id
//            }
//            ;
//        request.get({url:url, oauth:oauth, qs:qs, json:true}, function (e, r, user) {
//            console.log(user)
//        })
//    })
//})
//


//var OAuth2 = OAuth.OAuth2;
//var yelpConsumerKey = 'HPZlPZ0VBWGSQAve7AB18w';
//var yelpConsumerSecret = 'cRdpN2MjV4dbwD_SCu00dZLO6DE';
//var oauth2 = new OAuth2(
//    yelpConsumerKey,
//    yelpConsumerSecret,
//    'https://www.yelp.com/developers',
//    null,
//    'oauth2/token',
//    null);
//oauth2.getOAuthAccessToken(
//    '',
//    {'grant_type':'client_credentials'},
//    function (e, access_token, refresh_token, results){
//        console.log('bearer: ',access_token);
//        oauth2.get('protected url',
//            access_token, function(e,data,res) {
//                if (e) return callback(e, null);
//                if (res.statusCode!=200)
//                    return callback(new Error(
//                        'OAuth2 request failed: '+
//                        res.statusCode),null);
//                try {
//                    data = JSON.parse(data);
//                }
//                catch (e){
//                    return callback(e, null);
//                }
//                return callback(e, data);
//            });
//    });
