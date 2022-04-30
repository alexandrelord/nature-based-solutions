let Project = require('../controllers/natsolutions')

module.exports = {
    index,
    new: newProject,
    create
}

// render all projects page
function index(req, res) {
    res.render('natsolutions/index', { title: 'NATURAL SOLUTION PROJECTS'})
}
// render new project form page
function newProject(req, res) {
    res.render('natsolutions/new', { title: 'NEW PROJECT FORM'})
}

function create(req, res) {
    const project = new Project(req.body)
    project.save(function(err) {
        if (err) return res.render('natsolutions/new')
        console.log(project)
        // should redirect to /natsolutions/show page for that specific project
        // redirect to all projects for now
        res.redirect('/natsolutions')
    })
}
