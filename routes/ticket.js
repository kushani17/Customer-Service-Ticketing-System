const router = require('express').Router();
let Ticket = require('../models/ticket.model');

router.route('/').post((req, res) => {
  Ticket.find({createdby:req.body.createdby}).sort({"createdAt": -1})
    .then(ticket => res.json(ticket))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getalltickets').post((req, res) => {
  Ticket.find({}).sort({"status": -1,"priority": -1})
    .then(ticket => res.json(ticket))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getunknownticketwithphoneandemail').post((req, res) => {

  Ticket.find({email:req.body.email,phone:req.body.phone}).sort({"createdAt": -1})
    .then(ticket => res.json(ticket))
    .catch(err => res.status(400).json('Error: ' + err));
    
});

router.route('/getunknownticketwithticketid').post((req, res) => {
  Ticket.find({_id:req.body.ticketid})
    .then(ticket => res.json(ticket))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
 const data = req.body;
const blogs = new Ticket(data);
//console.log(req.body);
blogs.save((error) => {
if(error){
    res.json({msg:'Internal server error'});        
} else{
    res.json({msg:'Your data saved'});
}
});
});

router.route('/:id').get((req, res) => {
    Ticket.findById(req.params.id)
      .then(ticket => res.json(ticket))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Ticket.findByIdAndDelete(req.params.id)
      .then(() => res.json('Ticket deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/clientupdateticket/:id').post((req, res) => {
    Ticket.findById(req.params.id)
      .then(ticket => {
        ticket.description = req.body.description;
        ticket.subject = req.body.subject;
  
        ticket.save()
          .then(() => res.json('Ticket updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/agentupdateticket/:id').post((req, res) => {
    Ticket.findById(req.params.id)
      .then(ticket => {
        ticket.status = req.body.ticketstatus;
        ticket.priority=req.body.priority;
        ticket.agentemail=req.body.agentemail;
        ticket.agentname=req.body.agentname;
        ticket.save()
          .then(() => res.json('Ticket updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;
