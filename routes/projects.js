var express = require('express');
var router = express.Router();
// add projects controller module
var projectsCtrl = require('../controllers/projects')

/* GET projects/index - show all projects page */
router.get('/', projectsCtrl.index)
/* GET projects/new - show new project page form */
router.get('/new', projectsCtrl.new)
/* POST /projects */
router.post('/', projectsCtrl.create)



module.exports = router;
