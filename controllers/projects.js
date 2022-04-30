let Project = require('../models/project')
// let User = require('../models/user')

module.exports = {
    index,
    new: newProject,
    create,
    show
}

// render all projects page
function index(req, res) {
    Project.find({}, function (err, projects) {
        res.render('projects/index', { projects });
    })
}
// render new project form page
function newProject(req, res) {
    res.render('projects/new', { title: 'NUEVO PROYECTO PAGE' })
}

function show(req, res) {
    Project.findById(req.params.id, function(err, project) {
        res.render('projects/show', { project })
    })
}

function create(req, res) {
    const project = new Project(req.body)
    console.log(req.body)
    project.save(function(err) {
        if (err) return res.render('projects/new')
        // should redirect to /projects/show page for that specific project
        // redirect to all projects for now
        res.redirect('/projects')
    })
}
