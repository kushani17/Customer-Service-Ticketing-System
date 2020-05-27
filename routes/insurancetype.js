const router = require('express').Router();
let User = require('../models/insurancetypes');
let subcategory = require('../models/insurancetypesubcategory');

router.route('/').get((req, res) => {
  User.find({},{name:true})
    .then(insurancetype => res.json(insurancetype))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const insurancetype = req.body;

  const newinsurancetype = new User(insurancetype);

  newinsurancetype.save()
    .then(() => res.json('Insurancetype added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addsubcategory').post((req, res) => {
  
  const subcategorytype = new subcategory(req.body);

  subcategorytype.save()
    .then(() => res.json('Insurancetype Subcategory added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/viewsubcategory').get((req, res) => {
  
  subcategory.find({},{insurancetype:true,subcategory:true})
    .then(subcategorytype => res.json(subcategorytype))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;