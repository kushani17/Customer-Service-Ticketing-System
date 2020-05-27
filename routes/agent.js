const express = require('express');
const router = express.Router();

const AgentDB = require('../models/agentdb');



router.get('/apk/:id', function(req, res, next) {
    // console.log('dd',req.params.id)
    AgentDB.findById(req.params.id)
      .exec()
  
      .then(data => {
        //console.log('Data: ',data);
        res.json(data);
      })
      .catch(error => {
        console.log('error', error);
      });
  });

  router.get('/employeeinfo',(req,res) => {
    AgentDB.find({},{id:true,name:true,email:true})
    .then((data) => {
        res.json(data);
    })
    .catch((error)=>{
        console.log('error',error);
    });
});

  router.post('/saveagent', (req, res) => {
    const data = req.body;
    //console.log(data);
    const agent = new AgentDB(data);
    agent.save(error => {
      if (error) {
        res.json({ msg: 'Internal Server error' });
      } else {
        res.json({ msg: 'Your data is saved' });
      }
    });
  });
  
  router.post('/getagentname', (req, res) => {
    AgentDB.find({email:req.body.email},{name:true})
      .then(data => res.json(data))
      .catch(error => {
        console.log('error', error);
      });
  });
  
  router.post('/checkemployeealreadyexists',(req,res) => {
  //console.log(req.body.email);
    AgentDB.find({email:req.body.email})
    .then((data) => {
        res.json(data);
    })
    .catch((error)=>{
        console.log('error',error);
    });
});

router.get('/api', (req, res) => {
    AgentDB.find({})
      .then(data => {
        //console.log('Data: ',data);
        res.json(data);
      })
      .catch(error => {
        console.log('error', error);
      });
  });

  router.get('/delete/:id', function(req, res, next) {
    AgentDB.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
  router.post('/update',(req,res) => {

    AgentDB.updateMany({ _id: req.body.id},
     {
      
       $set: {
         name: req.body.name,
         phone:req.body.phone,
         email:req.body.email,
         address:req.body.address,
         city:req.body.city,
         state:req.body.state,
         zip:req.body.zip
 
       }
     }
 
        ,function (err, post) {
     if (err) return next(err);
     res.json(post);
    });
   });

   
module.exports = router;

