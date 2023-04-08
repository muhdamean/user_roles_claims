require('dotenv').config()
const express = require('express')
const app=express();
const morgan = require('morgan');
const routes = require('./src/routes/routes')
const bodyParser = require('body-parser')
const db=require('./src/config/db')
const cors= require('cors')


const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:false,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(morgan('dev'));
app.use(routes)

app.use((req, res, next) => {
    const err = new Error('Not Found')
    console.log(err)
    err.status = 404
    res.send('Route not found')
    next(err)
})

const port = process.env.APP_PORT || '8080';
db.connect();
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})

module.exports = app