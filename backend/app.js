const express = require('express');
const app = express();

app.use(express.json());

app.use(/api/user);
app.use(/api/publication);