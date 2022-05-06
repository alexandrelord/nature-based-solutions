let Project = require("../models/project");
let nodeGeocoder = require("node-geocoder");
const Geocoder = require("node-geocoder/lib/geocoder");

const request = require("request");
// file-system package to us get the base64 encoded image
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
  Project.findById(req.params.id, function (err, project) {
    res.render("projects/show", { project });
  });
}

//helper function base_64 encode
function base64_encode(image) {
  // read binary data
  var bitmap = fs.readFileSync(image);
  // convert binary data to base64 encoded string
  return bitmap.toString("base64");
}

// create new project
function create(req, res) {
  console.log(req.file);
  console.log(req.body);

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

    let geoCoder = nodeGeocoder({ provider: "openstreetmap" });
    geoCoder
      .geocode({ city: req.body.city, country: "Colombia", limit: 1 })
      .then((res) => {
        req.body.lat = res[0].latitude;
        req.body.lon = res[0].longitude;
      })
      .then(() => {
        const project = new Project(req.body);
        // body.data.link points to imgur url
        project.pic = body.data.link;
        project.save(function (err, prj) {
          console.log(project);
          if (err) return res.render("projects/new");
          fs.unlink(req.file.path, function (err) {
            if (err) return console.log(err);
            let link = body.data.link;
          });
          res.redirect(`/projects/${prj.id}`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
// send to edit project page
function edit(req, res) {
  Project.findById(req.params.id, function (err, project) {
    res.render("projects/edit", { project });
  });
}

function update(req, res) {
  let geoCoder = nodeGeocoder({ provider: "openstreetmap" });
  geoCoder
    .geocode({ city: req.body.city, country: "Colombia", limit: 1 })
    .then((res) => {
      req.body.lat = res[0].latitude;
      req.body.lon = res[0].longitude;
    })
    .then(() => {
      Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        function (err, project) {
          res.redirect(`/projects/${project.id}`);
        }
      );
    });
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
