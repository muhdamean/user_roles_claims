const express= require('express');
const app=express();
const db=require('../services/user.services');

app.post('/api/user/register', db.register);
app.post('/api/user/login', db.login);

module.exports=app;