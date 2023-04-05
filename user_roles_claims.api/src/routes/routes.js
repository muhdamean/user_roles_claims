const express= require('express');
const app=express();

const user= require('./users');
const pagerole= require('./pageroles');

app.use(user);
app.use(pagerole);

module.exports=app;