var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {  
  next('route');
});

router.get('/', function(req, res, next) {
  console.log('실행');
  res.render('index', { title: 'Express' });
});

module.exports = router;
