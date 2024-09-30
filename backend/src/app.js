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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
