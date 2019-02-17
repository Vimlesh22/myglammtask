const express = require('express');
const cors = require('cors');

const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const db = require('./model/db');
const app = express();
app.use(cors());
var expressValidator = require('express-validator');
const PORT = process.env.PORT || 3000;

app.use('/api',bodyParser.urlencoded({extended:true}));
app.use('/api',bodyParser.json());

app.use(expressValidator())
app.use('/api',routes);
app.listen(PORT,() => {
    db.connect();
    console.log("app listening on port ",PORT);
})