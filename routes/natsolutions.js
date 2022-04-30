var express = require('express');
var router = express.Router();
// add natsolutions controller module
var natsolutionsCTRL = require('../controllers/natsolutions')

/* GET natsolutions index - show all projects page */
router.get('/', natsolutionsCTRL.index)
/* GET natsolutions new - show new project page form */
router.get('/new', natsolutionsCTRL.new)
/* POST /natsolutions */
router.post('/', natsolutionsCTRL.create)



module.exports = router;
