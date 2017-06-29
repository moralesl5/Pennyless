const router = require('express').Router();
const search = require('../models/search');

router.get('/', (req, res) => {
    res.render('ux/show');
});

router.get('/new', (req,res) =>{
	res.render('ux/new')
})


module.exports = router;