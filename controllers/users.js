let User = require('../controllers/users')

module.exports = {
    index,
}


function index(req, res, next) {
    console.log(req.user)
      // Passing search values, name & sortKey, for use in the EJS
      res.render('index', 
      { 
        user: req.user
      });
 }