const router = require('express').Router();
let feedback = require('../models/clientfeedback');



router.route('/:id').get((req, res) => {
     feedback.find({ticketid:req.params.id})
    .then(reviewinfo => res.json(reviewinfo))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const clientfeedback = new feedback(req.body);

  clientfeedback.save()
    .then(() => res.json('Client Feedback added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;