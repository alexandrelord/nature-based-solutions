var express = require('express');
var router = express.Router();
// add natsolutions controller module
var natsolutionsCTRL = require('../controllers/natsolutions')

/* GET natsolutions index (all projects page) */
router.get('/', natsolutionsCTRL.index)

module.exports = router;
