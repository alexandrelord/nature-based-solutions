module.exports = {
    index
}

// render all projects page
function index(req, res) {
    res.render('natsolutions/index', { title: 'NATURAL SOLUTION PROJECTS'})
}

