module.exports = {
    index,
    new: newProject
}

// render all projects page
function index(req, res) {
    res.render('natsolutions/index', { title: 'NATURAL SOLUTION PROJECTS'})
}
// render new project form page
function newProject(req, res) {
    res.render('natsolutions/new', { title: 'NEW PROJECT FORM'})
}

