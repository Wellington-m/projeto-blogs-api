const express = require('express');
const routes = require('./routes');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const app = express();

app.use(express.json());

app.use('/login', routes.loginRoute);
app.use('/user', routes.userRoute);
app.use('/categories', routes.categoryRoute);
app.use('/post', routes.postRoute);

module.exports = app;
