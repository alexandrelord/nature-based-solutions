let Project = require('../models/project')
let User = require('../models/user')

module.exports = {
    index,
    new: newProject,
    create
}

// render all projects page
function index(req, res) {
    res.render('projects/index', { title: 'NATURAL SOLUTION PROJECTS'})
}
// render new project form page
function newProject(req, res) {
    res.render('projects/new', { title: 'NUEVO PROYECTO PAGE' })
}

function create(req, res) {
    const project = new Project(req.body)
    project.save(function(err) {
        if (err) return res.render('projects/new')
        // console.log(project)
        // should redirect to /projects/show page for that specific project
        // redirect to all projects for now
        res.redirect('/projects')
    })
}
