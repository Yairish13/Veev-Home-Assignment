const fs = require('fs/promises');
const path = require('path');
const BadRequestError = require('../../handlers/bad-request-err');

const dataFilePath = path.resolve(__dirname, '../../../data/projects.json');
const readProjects = async () => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw err;
    }
};

const writeProjects = async (data) => {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        throw err;
    }
};
const handleAllProjects = async () => {
    const projects = await readProjects();
    return projects;
}

const handleSearchProject = async (id) => {
    const projects = await readProjects();
    const project = projects[id];
    if (!project) {
        return new BadRequestError('Project not found')
    }
    return project;
}
const handleUpdateProject = async (body) => {
    const projects = await handleAllProjects();
    if (!body || !projects[body.id]) {
        return new BadRequestError('Project not found to be updated')
    } else {
        projects[body.id] = { ...projects[body.id], ...body };
        await writeProjects(projects);
        return projects;
    }
}
const handleCreateProject = async (body) => {
    const projects = await readProjects();
    const newId = Object.keys(projects).length + 1;
    const newProject = { id: newId, ...body };
    projects[newId] = newProject;
    await writeProjects(projects);
}
module.exports = {
    handleAllProjects,
    handleSearchProject,
    handleUpdateProject,
    handleCreateProject
}