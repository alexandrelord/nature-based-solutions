// require the model to access the DB
let Project = require("../models/project");

// require the geocoder module and set provider
const NodeGeocoder = require("node-geocoder");
const geoCoder = NodeGeocoder({ provider: "openstreetmap" });
// const Geocoder = require("node-geocoder/lib/geocoder");

const request = require("request");
// file-system package to get the base64 encoded image
const fs = require("fs");

module.exports = {
  index,
  show,
  new: newProject,
  create,
  edit,
  update,
  delete: deleteProject,
};

// render all projects/index template and send all projects from DB to template
function index(req, res) {
  Project.find({}, (err, projects) => res.render("projects/index", { projects }));
}

// render new project form template
function newProject(req, res) {
  res.render("projects/new");
}

// find project by Id in DB, render project template and send project object to template
function show(req, res) {
  Project.findById(req.params.id, (err, project) => res.render("projects/show", { project }));
}

// create new project
async function create(req, res) {
  
  let geoResponse = await geoCoder.geocode({ city: req.body.city, country: "Colombia", limit: 1 })
  req.body.lat = geoResponse[0].latitude;
  req.body.lon = geoResponse[0].longitude;

  let image = base64_encode(req.file.path);
  
  const options = {
    method: "POST",
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
    formData: {
      image: image,
      type: "base64",
    },
  };
  
  request(options, function (err, response) {
      if (err) return console.log(err);
      let body = JSON.parse(response.body);
      
        const project = new Project(req.body);
        // body.data.link points to imgur url
        project.pic = body.data.link;
        console.log(project)

        project.save(function (err, prj) {
          if (err) return res.render("projects/new");
          fs.unlink(req.file.path, function (err) {
            if (err) return console.log(err);
          });
          res.redirect(`/projects/${prj.id}`);
        });
  })
}

// send to edit project page
function edit(req, res) {
  Project.findById(req.params.id, function (err, project) {
    res.render("projects/edit", { project });
  });
}

async function update(req, res) {
    
    // send request to geocode API and wait for the response
    let response = await geoCoder.geocode({ city: req.body.city, country: "Colombia", limit: 1 })
    // should handle error before continuing

    // save lat and lon from the geocode response in req.body  
    req.body.lat = response[0].latitude;
    req.body.lon = response[0].longitude;
    
    // find project by Id in DB and update
    Project.findByIdAndUpdate(
          req.params.id,
          req.body,
          function (err, project) {
            if (err) return res.send(err);
            res.redirect(`/projects/${project.id}`);
          }
    );   
}

function deleteProject(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if (err) return res.send(err);
    if (!req.user._id.equals(project.author))
      return res.redirect(`/projects/${project.id}`);
    project.remove();
    res.redirect("/projects");
  });
}

/*---- helper functions ----*/

//base_64 encode
function base64_encode(image) {
  // read binary data
  var bitmap = fs.readFileSync(image);
  // convert binary data to base64 encoded string
  return bitmap.toString("base64");
}