const express= require('express');
const app=express();

const user= require('./users');
const page= require('./pages');
const role= require('./roles');

app.use(user);
app.use(page);
app.use(role);

module.exports=app;