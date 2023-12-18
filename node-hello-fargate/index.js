require('dotenv').config();
const express = require('express');

const app = express();
const port = 9000;
app.get('/', (req, res) => {
  res.json({
    data: 'Hello World!',
    title: process.env.TITLE,
    version: process.env.VERSION || 'not available',
    description: process.env.DESCRIPTION,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//TODO IDEA make aws ci/cd easy for people like who just want to run their containers everywhere without taking into worry the configurations
