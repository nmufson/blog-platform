const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const passport = require('passport');
const userServices = require('./services/userServices');

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Express app listening on port ${PORT}!`),
);
