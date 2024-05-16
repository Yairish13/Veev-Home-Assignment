const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const routes = require('../api/routes/v1');
const NotFoundError = require('../api/handlers/not-found-error');
const { errorHandler } = require('../api/middlewares/error-handler');

const app = express();
app.use(cors())
app.use(json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', routes);

app.use('*', async (req, res, next) => {
  const err = new NotFoundError('Route not found');
  next(err);
});

app.use(errorHandler);

module.exports = { app };
