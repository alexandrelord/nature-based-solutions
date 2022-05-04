let Project = require("../models/project");
let nodeGeocoder = require('node-geocoder');
const Geocoder = require("node-geocoder/lib/geocoder");
const project = require("../models/project");

module.exports = {
  index,
  show,
  new: newProject,
  create,
  edit,
  update,
  delete: deleteProject
};

// render all projects page
function index(req, res) {
  Project.find({}, function (err, projects) {
    res.render("projects/index", { projects });
  });
}
// render new project form page
function newProject(req, res) {
  res.render("projects/new");
}
// render project page
function show(req, res) {
    Project.findById(req.params.id, function(err, project) {
        res.render('projects/show', { project })
    })
}

// create new project
function create(req, res) {
  let geoCoder = nodeGeocoder({ provider: 'openstreetmap' });
  geoCoder.geocode({city: req.body.city, country: 'Colombia', limit: 1})
  .then((res) => {
    req.body.lat = res[0].latitude;
    req.body.lon = res[0].longitude;
  })
  .then(() => {
    const project = new Project(req.body);
    project.save(function (err, prj) {
      if (err) return res.render("projects/new");
      console.log(prj);
      // should redirect to /projects/show page for that specific project
      // redirect to all projects for now
      res.redirect("/projects");
    });
  })
  .catch((err)=> {
    console.log(err);
  });
}
// send to edit project page
function edit(req, res) {
  Project.findById(req.params.id, function (err, project) {
    res.render("projects/edit", { project });
  });
}

function update(req, res) {
  let geoCoder = nodeGeocoder({ provider: 'openstreetmap'})
  geoCoder.geocode({city: req.body.city, country: 'Colombia', limit: 1})
  .then((res) => {
    req.body.lat = res[0].latitude
    req.body.lon = res[0].longitude
  })
  .then(() => {
    Project.findByIdAndUpdate(req.params.id, req.body, function(err, project) {
      res.redirect(`/projects/${project.id}`)
    }) 
  })
  
}

function deleteProject(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if (err) return res.send(err)
    if (!req.user._id.equals(project.author)) return res.redirect(`/projects/${project.id}`)
    project.remove()
    res.redirect('/projects')
  })
}

// req.user is the logged-in user - if not logged-in, req.user is null