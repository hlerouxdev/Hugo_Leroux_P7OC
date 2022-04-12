const express = require('express');
const app = express();
const userRoutes = require('./routes/user.js');
const publicationRoutes = require('./routes/publication.js');
const commentRoutes = require('./routes/comments.js');
const messageRoutes = require('./routes/message.js');
const { xss } = require('express-xss-sanitizer');

app.use(express.json());
app.use(xss());
app.use(express.static('public'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use("/api/auth", userRoutes);
app.use("/api/posts", publicationRoutes, commentRoutes);
app.use("/api/messages/", messageRoutes);

module.exports = app;