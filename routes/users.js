var express = require('express');
var router = express.Router();
const soaptester = require('./strong-soap-connector');


/* GET */
router.get('/', function(req, res, next) {
  soaptester(res);
});

module.exports = router;
