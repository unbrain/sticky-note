var express = require('express');
var router = express.Router();

/* GET listing. */
router.get('/notes', function(req, res, next) {
  console.log('query...');
});

/* POST listing. */ 
router.post('/notes/add', function(req, res, next) {
  console.log('add...');
});

router.post('/notes/delete', function(req, res, next) {
  console.log('delete...');
});

router.post('/notes/edit', function(req, res, next) {
  console.log('edit...');
});

module.exports = router;
