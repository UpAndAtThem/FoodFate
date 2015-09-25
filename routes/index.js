var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('plain route');
  res.render('index', { title: '' });
});

router.get('/*', function(req, res, next) {
  console.log('all route');
  res.redirect('/');
})

module.exports = router;
