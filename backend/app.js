const express = require('express');
const app = express();
const userRoutes = require('./routes/user.js');
const publicationRoutes = require('./routes/publication.js');
const commentRoutes = require('./routes/comments.js');
const messageRoutes = require('./routes/message.js');
const env = require('dotenv').config({ path: '../.env' });
const { xss } = require('express-xss-sanitizer');

app.use(express.json());
app.use(xss());

app.use("/api/auth", userRoutes);
app.use("/api/post", publicationRoutes, commentRoutes);
app.use("/api/messages/", messageRoutes);

module.exports = app;