let Project = require("../models/project");
let nodeGeocoder = require('node-geocoder');
const Geocoder = require("node-geocoder/lib/geocoder");

module.exports = {
  index,
  show,
  new: newProject,
  create,
  edit
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
    console.log(req.body)
    req.body.lat = res[0].latitude;
    req.body.lon = res[0].longitude;
  })
  .then(() => {
    const project = new Project(req.body);
    project.save(function (err, testing) {
      if (err) return res.render("projects/new");
      console.log(testing);
      // should redirect to /projects/show page for that specific project
      // redirect to all projects for now
      res.redirect("/projects");
    });
  })
  .catch((err)=> {
    console.log(err);
  });
}
// edit project
function edit(req, res) {
  Project.findById(req.params.id, function (err, project) {
    res.render("projects/edit", { project });
  });
}
