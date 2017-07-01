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
        .create(req.user.id, req.body)
        .then((place) => {
            console.log('INSIDE OF POST', place);
            responseData.data = place;
            console.log(responseData.data)
            console.log("Trying to convert in controller")
            return search.getPlaceId(req.body.address)
        })
        .then(latlong => {
            console.log("Data from API!!", latlong.data.results[0])
            console.log("Lat: ", latlong.data.results[0].geometry.location.lat);
            console.log("Long:", latlong.data.results[0].geometry.location.lng);
            responseData.data.lat = latlong.data.results[0].geometry.location.lat;
            responseData.data.long = latlong.data.results[0].geometry.location.lng;
            console.log("this is the response data", responseData);
            res.json(responseData);

        })
        .catch(err => console.log('ERROR IN CONTROLLER', err))

})

module.exports = router;
