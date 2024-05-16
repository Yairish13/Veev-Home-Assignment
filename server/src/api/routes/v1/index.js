const express = require('express');
const httpStatus = require('http-status');
const projectsRouter = require('./projects.route');

const router = express.Router();

router.get('/status', (req, res) => res.json({
  code: httpStatus.OK,
  message: 'ok',
}));

router.use('/projects', projectsRouter);

module.exports = router;
