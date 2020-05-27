const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')
var bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
//const mongodbURI = 'mongodb+srv://vaidees:Vaidees95@@cluster0-oy3k6.mongodb.net/test?retryWrites=true&w=majority'
const mongodbURI = 'mongodb://localhost/AIS'
mongoose.connect(mongodbURI,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify:false
});

mongoose.connection.on('connected',()=>{
    console.log('Mongose is connected');
});


var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(cors());
const routes = require('./routes/api')
const ticketRouter = require('./routes/ticket');
const insuranceRouter = require('./routes/insurancetype');
const agentRouter = require('./routes/agent');
const clientfeedback = require('./routes/clientfeedback');
app.use('/',routes);
app.use('/ticket', ticketRouter);
app.use('/insurancetype', insuranceRouter);
app.use('/agent', agentRouter);
app.use('/clientfeedback', clientfeedback);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('tiny'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});