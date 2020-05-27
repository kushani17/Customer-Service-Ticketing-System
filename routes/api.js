const express = require('express');
const router = express.Router();

const BlogPost = require('../models/blogspot');









router.post('/createclientuser',(req,res) => {
var admin = require("firebase-admin");
const email = req.body.email;
//console.log(req.body);
if (!admin.apps.length) {
var serviceAccount = {
    "type": "service_account",
    "project_id": "ticketingsystem-50de8",
    "private_key_id": "43d0c547984ddb3cd1a4af20b2441d1383168100",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0j78xPNhuo/6r\n/LaL21RqdzMYg6MaoGZl79YFvKGuwzsdFcjG2ne1fKfZNb062dNZCqS7FlsrsllJ\n0jSBKlQDQDPiHBwJaAFbOIbmI/inb7jO7UpgXDS8RbllPqjunjDXdFozIwnoDm8O\n8v2/jW7uw/IdIqdgQm+RT0beagpAJW1ChJh7OHt0xxH49kLYhPddfouiNdgTc3ir\nteENpSUQc5joxHwo3r3hLYpF07sX1XGSjtvRJAuz5qRbqwvqY2up5EK2Fn7uqGhI\ncFWcOo9MWVgrdjlSGLvf3+gCVdVY/I6+hliYAj97xSvaXy7EeO5x3RGfdvepBIne\njEkVSCFnAgMBAAECggEAEOulmZofmCKzI2/ftXR80StRdPslBkJAxk226zu1lRiD\niiK3+XaQoEfJvO+tx32RMjdun3+lVI92kZXqyK3sSI+0LPzAXdtKwT8nWRrG2v37\nvhx7i1Mot/n6uTOphg75+b7UExW2AHKV0rtPrys0WZiwMC3GrJ0dMmtQ81fRlRgk\nbr7tmHNixNBq2iKSB+D07hU9JuSAR1vzvk9kW0e2QS+U6h+WQYigi+M9AC9XHqMQ\nXjB8z3IKghW3qiePbQh43ZwWRQovCXqaQaaQD1Xhb8z7X6t1nEJWsH3MvaS4ydrD\nnZ52w4trg6C7DVijF+3ieQGCzQbUVHVT9wtOnXYRPQKBgQDii1X2uI1paUvDzJ6c\nVt3anM2Mnbm336rF7zldTDh3wiDz5zffHznfK/palDAnDGFB06JnWOgFG3uFYn4n\nMWgLoMBxX3bO9v8L+gQH1BXMrUE9IIL3kDLZXxell8vDRdiVrLOKzono6TCkcOCm\n3/KIn5nU1vKGa266bawr/1qEBQKBgQDMCdi6gTRzWNFgCE9j4JZ3ub54lRQ44oMa\nZHyR+7yv76/dpUL7/Oofu9DWo9krtilX5by01PybJozafhMBKvMAPknb67UMCi8i\nZbCn/UruXGIGNymkby3P4Kex4WwvsBPCXV8oUs9ZrQ9XnlyvrUuLZ1hGXnKrle1U\nCrfnMslXewKBgEb+l2/8IgTYxK+VnlcsOdZasWfRvfPLmj7xWy7Lxh5xrdYBrda0\neHRh2dEtA3IZRRlV810j1YJUPH9ugE5UA2ExfV2KJzdw3Diqnzy80CAWY41+dMyU\nWfsY+9YfHfISH2+4cYOcekeNXHsMDLr/D4iVS6YRvms1m7u8xun62ijpAoGAfTsN\n6mqi5qj82RRApeySbalzXk8hukhMb0Z9rpvzk4hpSIDGPCNfD1sXMqYeBNYpSemX\niOWwpQlkKjZ3M6BIxT1116Uz2c/mXhZL9s9fziylfWseA+65D32zb1oMLLjFZ+Yn\nIXiyCzhM0lpASRLz6vvjEk2l0+qRX6O0fBKPwUECgYEAhMHor5ILTTYoeKXSeagM\n441g7/+68Hs9+sGFEbG/3NDlk+/WHBWXN5MKi/CGAQdHk3pN/zKiYYMFZVmbvK/T\nnvvaoIgV0R9JQUnbnc5EkzWE92DYnZ5pV3urwYiZnr0iZip945a/STgI9IsAhZxc\nT46GCTAuPw/kRBKBbHubkGE=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-d5iza@ticketingsystem-50de8.iam.gserviceaccount.com",
    "client_id": "102339031937393744345",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d5iza%40ticketingsystem-50de8.iam.gserviceaccount.com"
  }
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ticketingsystem-50de8.firebaseio.com"
  });
}

  admin.auth().createUser({
    email: email,
    password: '12345678',
  displayName: "Client"

  })
    .then(function(userRecord) { 
      res.status(200).send('OK');  
      // See the UserRecord reference doc for the contents of userRecord.
     // console.log('Successfully created new user:', userRecord.uid);
    })
   // .catch(function(error) {
      .catch(err => res.status(409).json('Error: ' + err));
   //   console.log('Error creating new user:', error);
   // });

});




router.post('/firebasedeleteuser',(req,res) => {
  //console.log(req.body.email);
  var admin = require("firebase-admin");
  if (!admin.apps.length) {
  var serviceAccount = {
      "type": "service_account",
      "project_id": "ticketingsystem-50de8",
      "private_key_id": "43d0c547984ddb3cd1a4af20b2441d1383168100",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0j78xPNhuo/6r\n/LaL21RqdzMYg6MaoGZl79YFvKGuwzsdFcjG2ne1fKfZNb062dNZCqS7FlsrsllJ\n0jSBKlQDQDPiHBwJaAFbOIbmI/inb7jO7UpgXDS8RbllPqjunjDXdFozIwnoDm8O\n8v2/jW7uw/IdIqdgQm+RT0beagpAJW1ChJh7OHt0xxH49kLYhPddfouiNdgTc3ir\nteENpSUQc5joxHwo3r3hLYpF07sX1XGSjtvRJAuz5qRbqwvqY2up5EK2Fn7uqGhI\ncFWcOo9MWVgrdjlSGLvf3+gCVdVY/I6+hliYAj97xSvaXy7EeO5x3RGfdvepBIne\njEkVSCFnAgMBAAECggEAEOulmZofmCKzI2/ftXR80StRdPslBkJAxk226zu1lRiD\niiK3+XaQoEfJvO+tx32RMjdun3+lVI92kZXqyK3sSI+0LPzAXdtKwT8nWRrG2v37\nvhx7i1Mot/n6uTOphg75+b7UExW2AHKV0rtPrys0WZiwMC3GrJ0dMmtQ81fRlRgk\nbr7tmHNixNBq2iKSB+D07hU9JuSAR1vzvk9kW0e2QS+U6h+WQYigi+M9AC9XHqMQ\nXjB8z3IKghW3qiePbQh43ZwWRQovCXqaQaaQD1Xhb8z7X6t1nEJWsH3MvaS4ydrD\nnZ52w4trg6C7DVijF+3ieQGCzQbUVHVT9wtOnXYRPQKBgQDii1X2uI1paUvDzJ6c\nVt3anM2Mnbm336rF7zldTDh3wiDz5zffHznfK/palDAnDGFB06JnWOgFG3uFYn4n\nMWgLoMBxX3bO9v8L+gQH1BXMrUE9IIL3kDLZXxell8vDRdiVrLOKzono6TCkcOCm\n3/KIn5nU1vKGa266bawr/1qEBQKBgQDMCdi6gTRzWNFgCE9j4JZ3ub54lRQ44oMa\nZHyR+7yv76/dpUL7/Oofu9DWo9krtilX5by01PybJozafhMBKvMAPknb67UMCi8i\nZbCn/UruXGIGNymkby3P4Kex4WwvsBPCXV8oUs9ZrQ9XnlyvrUuLZ1hGXnKrle1U\nCrfnMslXewKBgEb+l2/8IgTYxK+VnlcsOdZasWfRvfPLmj7xWy7Lxh5xrdYBrda0\neHRh2dEtA3IZRRlV810j1YJUPH9ugE5UA2ExfV2KJzdw3Diqnzy80CAWY41+dMyU\nWfsY+9YfHfISH2+4cYOcekeNXHsMDLr/D4iVS6YRvms1m7u8xun62ijpAoGAfTsN\n6mqi5qj82RRApeySbalzXk8hukhMb0Z9rpvzk4hpSIDGPCNfD1sXMqYeBNYpSemX\niOWwpQlkKjZ3M6BIxT1116Uz2c/mXhZL9s9fziylfWseA+65D32zb1oMLLjFZ+Yn\nIXiyCzhM0lpASRLz6vvjEk2l0+qRX6O0fBKPwUECgYEAhMHor5ILTTYoeKXSeagM\n441g7/+68Hs9+sGFEbG/3NDlk+/WHBWXN5MKi/CGAQdHk3pN/zKiYYMFZVmbvK/T\nnvvaoIgV0R9JQUnbnc5EkzWE92DYnZ5pV3urwYiZnr0iZip945a/STgI9IsAhZxc\nT46GCTAuPw/kRBKBbHubkGE=\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-d5iza@ticketingsystem-50de8.iam.gserviceaccount.com",
      "client_id": "102339031937393744345",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d5iza%40ticketingsystem-50de8.iam.gserviceaccount.com"
    }
    
  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://ticketingsystem-50de8.firebaseio.com"
    });
  }

  admin.auth().getUserByEmail(req.body.email)  
  .then(function(userRecord) {
      admin.auth().deleteUser(userRecord.toJSON().uid)
      .then(function() {
      console.log('Successfully deleted user');
  })
    .catch(function(error) {
      console.log('Error deleting user:', error);
    })
  })
  .catch(function(error) {
   console.log('Error fetching user data:', error);
  });

  
  });




router.post('/createemployeeuser',(req,res) => {
    var admin = require("firebase-admin");
    const email = req.body.email;
    const role = req.body.role;
    if (!admin.apps.length) {
    var serviceAccount = {
        "type": "service_account",
        "project_id": "ticketingsystem-50de8",
        "private_key_id": "43d0c547984ddb3cd1a4af20b2441d1383168100",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0j78xPNhuo/6r\n/LaL21RqdzMYg6MaoGZl79YFvKGuwzsdFcjG2ne1fKfZNb062dNZCqS7FlsrsllJ\n0jSBKlQDQDPiHBwJaAFbOIbmI/inb7jO7UpgXDS8RbllPqjunjDXdFozIwnoDm8O\n8v2/jW7uw/IdIqdgQm+RT0beagpAJW1ChJh7OHt0xxH49kLYhPddfouiNdgTc3ir\nteENpSUQc5joxHwo3r3hLYpF07sX1XGSjtvRJAuz5qRbqwvqY2up5EK2Fn7uqGhI\ncFWcOo9MWVgrdjlSGLvf3+gCVdVY/I6+hliYAj97xSvaXy7EeO5x3RGfdvepBIne\njEkVSCFnAgMBAAECggEAEOulmZofmCKzI2/ftXR80StRdPslBkJAxk226zu1lRiD\niiK3+XaQoEfJvO+tx32RMjdun3+lVI92kZXqyK3sSI+0LPzAXdtKwT8nWRrG2v37\nvhx7i1Mot/n6uTOphg75+b7UExW2AHKV0rtPrys0WZiwMC3GrJ0dMmtQ81fRlRgk\nbr7tmHNixNBq2iKSB+D07hU9JuSAR1vzvk9kW0e2QS+U6h+WQYigi+M9AC9XHqMQ\nXjB8z3IKghW3qiePbQh43ZwWRQovCXqaQaaQD1Xhb8z7X6t1nEJWsH3MvaS4ydrD\nnZ52w4trg6C7DVijF+3ieQGCzQbUVHVT9wtOnXYRPQKBgQDii1X2uI1paUvDzJ6c\nVt3anM2Mnbm336rF7zldTDh3wiDz5zffHznfK/palDAnDGFB06JnWOgFG3uFYn4n\nMWgLoMBxX3bO9v8L+gQH1BXMrUE9IIL3kDLZXxell8vDRdiVrLOKzono6TCkcOCm\n3/KIn5nU1vKGa266bawr/1qEBQKBgQDMCdi6gTRzWNFgCE9j4JZ3ub54lRQ44oMa\nZHyR+7yv76/dpUL7/Oofu9DWo9krtilX5by01PybJozafhMBKvMAPknb67UMCi8i\nZbCn/UruXGIGNymkby3P4Kex4WwvsBPCXV8oUs9ZrQ9XnlyvrUuLZ1hGXnKrle1U\nCrfnMslXewKBgEb+l2/8IgTYxK+VnlcsOdZasWfRvfPLmj7xWy7Lxh5xrdYBrda0\neHRh2dEtA3IZRRlV810j1YJUPH9ugE5UA2ExfV2KJzdw3Diqnzy80CAWY41+dMyU\nWfsY+9YfHfISH2+4cYOcekeNXHsMDLr/D4iVS6YRvms1m7u8xun62ijpAoGAfTsN\n6mqi5qj82RRApeySbalzXk8hukhMb0Z9rpvzk4hpSIDGPCNfD1sXMqYeBNYpSemX\niOWwpQlkKjZ3M6BIxT1116Uz2c/mXhZL9s9fziylfWseA+65D32zb1oMLLjFZ+Yn\nIXiyCzhM0lpASRLz6vvjEk2l0+qRX6O0fBKPwUECgYEAhMHor5ILTTYoeKXSeagM\n441g7/+68Hs9+sGFEbG/3NDlk+/WHBWXN5MKi/CGAQdHk3pN/zKiYYMFZVmbvK/T\nnvvaoIgV0R9JQUnbnc5EkzWE92DYnZ5pV3urwYiZnr0iZip945a/STgI9IsAhZxc\nT46GCTAuPw/kRBKBbHubkGE=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-d5iza@ticketingsystem-50de8.iam.gserviceaccount.com",
        "client_id": "102339031937393744345",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d5iza%40ticketingsystem-50de8.iam.gserviceaccount.com"
      }
      
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://ticketingsystem-50de8.firebaseio.com"
      });
    }
    
      admin.auth().createUser({
        email: email,
        password: '12345678',
      displayName: role
    
      })
        .then(function(userRecord) {         
          res.status(200).send('OK');       
          // See the UserRecord reference doc for the contents of userRecord.
         // console.log('Successfully created new user:', userRecord.uid);
        })
        //.catch(function(error) {
          .catch(err => res.status(409).json('Error: ' + err));
      
    
    });
    
router.post('/userinfo',(req,res) => {
  //req.body.email

    BlogPost.find({email:req.body.email},{name:true,email:true,insurancetype:true,insurancetypesubcategory:true})
    .then((data) => {
        res.json(data);
    })
    .catch((error)=>{
        console.log('error',error);
    });
});




//Routers
router.get('/',(req,res) => {
    console.log('title',req.body);
    res.json({
        msg: 'We received your data!!!'
    }); 
});

router.post('/save',(req,res) => {
    const data = req.body;
    const blogs = new BlogPost(data);
   //console.log(data);
    blogs.save((error) => {
    if(error){
        res.json({msg:'Internal server error'});        
    } else{
        res.json({msg:'Your data saved'});
    }
    });
});

router.post('/checkclientalreadyexists',(req,res) => {
  
    BlogPost.find({email:req.body.email})
    .then((data) => {
        res.json(data);
    })
    .catch((error)=>{
        console.log('error',error);
    });
});


router.post('/update',(req,res) => {

   BlogPost.updateMany({ _id: req.body.id},
    {
      $set: {
        name: req.body.name,
        company:req.body.company,
        insurancetype:req.body.insurancetype,
        insurancetypesubcategory:req.body.insurancetypesubcategory,
        phone:req.body.phone,
        email:req.body.email,
        city:req.body.city,
        state:req.body.state,
        refferedby:req.body.refferedby

      }
    }

       ,function (err, post) {
    if (err) return next(err);
    res.json(post);
   });
  });

router.get('/delete/:id',function(req,res,next) {
    //console.log('dd',req.params.id)
    BlogPost.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


router.get("/apk/:id",function(req,res,next) {
   // console.log('dd',req.params.id)
    BlogPost.findById(req.params.id).exec()
    
    .then((data) => {
        //console.log('Data: ',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error',error);
    });
});


router.get('/api',(req,res) => {
    BlogPost.find({})
    .then((data) => {
        //console.log('Data: ',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error',error);
    });
});



    module.exports = router;