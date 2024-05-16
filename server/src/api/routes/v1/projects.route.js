const express = require('express');
const controller = require('../../controllers/projects/projects.controller')

const router = express.Router();

router
    .route('/')
    .get(controller.getAllProjects);
router
    .route('/:id')
    .get(controller.getProjectById);
router
    .route('/edit')
    .post(controller.updateProject);
router
    .route('/new')
    .post(controller.getProjectById);


module.exports = router;
