const express= require('express');
const app=express();
const db=require('../services/role.services');

app.post('/api/roles', db.createRole);
app.get('/api/roles', db.getRoles);
app.post('/api/roles/add', db.addUserToRole);
app.get('/api/roles/users', db.getUsersRoles);
app.get('/api/roles/user/:email', db.getUserRolesByEmail);

module.exports=app;