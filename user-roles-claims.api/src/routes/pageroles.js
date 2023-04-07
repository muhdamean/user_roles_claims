const express= require('express');
const app=express();
const db=require('../services/pagerole.services');

app.post('/api/pages', db.createPage);
app.get('/api/pages', db.getPages);

app.post('/api/roles', db.createRole);
app.get('/api/roles', db.getRoles);

module.exports=app;