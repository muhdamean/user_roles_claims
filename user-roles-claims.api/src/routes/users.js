const express= require('express');
const app=express();
const db=require('../services/user.services');

app.post('/api/users/register', db.register);
app.post('/api/users/login', db.login);
app.get('/api/users', db.getUsers);

module.exports=app;