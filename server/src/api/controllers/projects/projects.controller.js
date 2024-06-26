const BadRequestError = require('../../handlers/bad-request-err');
const { handleAllProjects, handleUpdateProject, handleCreateProject, handleSearchProject } = require('./projects.helpers');


exports.getAllProjects = async (req, res, next) => {
    try {
        const projects = await handleAllProjects();
        res.status(200).json({ success: true, data: projects })
    } catch (err) {
        next(new BadRequestError(`${err.message}`))
    }
};

exports.getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await handleSearchProject(id);
        res.status(200).json({ success: true, data: project })
    } catch (err) {
        next(new BadRequestError(`${err.message}`))
    }
};

exports.updateProject = async (req, res, next) => {
    try {
        const { project } = req.body;
        const updatedProjects = await handleUpdateProject(project);
        res.status(200).json({ success: true, data: updatedProjects })
    } catch (err) {
        next(new BadRequestError(`${err.message}`))
    }
};
exports.createProject = async (req, res, next) => {
    try {
        const { project } = req.body;
        const projects = await handleCreateProject(project);
        res.status(200).json({ success: true, data: projects })
    } catch (err) {
        next(new BadRequestError(`${err.message}`))
    }
};

