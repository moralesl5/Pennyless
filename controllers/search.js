const router = require('express').Router();
const search = require('../models/search');
const axios = require('axios')

router.get('/', (req, res) => {
    res.render('ux/show');
});


// NEW PLACE
router.get('/new', (req, res) => {
    res.render('ux/new')
})


router.post('/', (req, res) => {
    const responseData = {};
    console.log('Data:', req.body);
    console.log('User:', req.user.id);
    search
        .getPlaceId(req.body.address)
        .then((latlong) => {
            console.log("Data from API!!", latlong.data.results[0])
            console.log("Lat: ", latlong.data.results[0].geometry.location.lat);
            console.log("Long:", latlong.data.results[0].geometry.location.lng);
            responseData.lat = latlong.data.results[0].geometry.location.lat;
            responseData.long = latlong.data.results[0].geometry.location.lng;
            console.log("this is the response data", responseData);
        	return search.create(req.user.id, req.body)
        })
        .then(place => {
            console.log('INSIDE OF POST', place);
            responseData.id = place.id;
            responseData.user_id = place.user_id;
            responseData.name = place.name;
            responseData.cat = place.cat;
            responseData.note = place.note;
            console.log("HERE IS YOUR DATA LOGAN", responseData)
            console.log("Trying to convert in controller")

            res.json(responseData);


        })
        .catch(err => console.log('ERROR IN CONTROLLER', err))

})

module.exports = router;
