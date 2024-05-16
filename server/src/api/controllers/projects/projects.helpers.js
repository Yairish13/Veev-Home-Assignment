const fs = require('fs/promises');
const path = require('path');
const BadRequestError = require('../../handlers/bad-request-err');
const GeneralError = require('../../handlers/general-error');

const dataFilePath = path.resolve(__dirname, '../../../data/projects.json');

const readProjects = async () => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return new GeneralError("failed reading")
    }
};

const writeProjects = async (data) => {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        return new GeneralError("failed write file")
    }
};

function daysBetween(date1, date2) {
    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }
    const d1 = parseDate(date1);
    const d2 = parseDate(date2);
    const timeDiff = Math.abs(d2 - d1);
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return dayDiff;
}

function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}
const calculateDailyCost = (project) => {
    let endDate;
    if (!project.endDate) {
        endDate = getTodayDate()
    } else {
        endDate = project.endDate;
    }
    const daysElapsed = daysBetween(project.startDate, endDate)
    const dailyCost = parseFloat(project.startingBudget) * 0.1;

    const totalCost = daysElapsed * dailyCost;
    return totalCost;
};

const updateProjectCostAndStatus = (project) => {
    const calculatedCost = calculateDailyCost(project);
    project.currentCost = calculatedCost.toFixed(2);
    if (Number(calculatedCost) > Number(project.startingBudget) * 1.5) {
        project.status = "Forced Closed";
    }
};

const handleAllProjects = async () => {
    const projects = await readProjects();
    Object.values(projects).forEach(updateProjectCostAndStatus);
    await writeProjects(projects);
    return projects;
};

const handleSearchProject = async (id) => {
    const projects = await readProjects();
    const project = projects[id];
    if (!project) {
        return new BadRequestError('Project not found');
    }
    updateProjectCostAndStatus(project);
    return project;
};

const handleUpdateProject = async (id, updates) => {
    const projects = await readProjects();
    if (!projects[id]) {
        return new BadRequestError('Project not found to be updated');
    } else {
        projects[id] = { ...projects[id], ...updates };
        updateProjectCostAndStatus(projects[id]);
        await writeProjects(projects);
        return projects;
    }
};

const handleCreateProject = async (body) => {
    const projects = await readProjects();
    const newId = Object.keys(projects).length + 1;
    const newProject = {
        id: newId,
        ...body,
        currentCost: '0.00',
        status: 'Planning'
    };
    updateProjectCostAndStatus(newProject);
    projects[newId] = newProject;
    await writeProjects(projects);
    return newProject;
};

module.exports = {
    handleAllProjects,
    handleSearchProject,
    handleUpdateProject,
    handleCreateProject
};
