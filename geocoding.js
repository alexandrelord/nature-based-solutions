let nodeGeocoder = require('node-geocoder');
 
let options = {
  provider: 'openstreetmap',
};
 
let geoCoder = nodeGeocoder(options);
geoCoder.geocode({city: 'Medellín', country: 'Colombia', limit: 1})
  .then((res)=> {
    console.log(res);
  })
  .catch((err)=> {
    console.log(err);
  });