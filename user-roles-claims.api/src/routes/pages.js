const express= require('express');
const app=express();
const db=require('../services/page.services');

app.post('/api/pages', db.createPage);
app.get('/api/pages', db.getPages);


module.exports=app;