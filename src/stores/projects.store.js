import { makeAutoObservable } from "mobx";
import ProjectService from '../services/projects.service';

class ProjectStore {
    projects = {};
    selectedProject = null;

    constructor() {
        makeAutoObservable(this);
    }

    get projectDetails() {
        return this.selectedProject;
    }
    fetchProjects = async () => {
        this.projects = await ProjectService.fetchProjects();
    };
    fetchProject = async (id) => {
        const data = await ProjectService.fetchProjectDetails(id);
        this.projects[data.id] = data; 
        this.selectedProject = data;
    }

    updateProject = async (id, updates) => {
        const updatedProject = await ProjectService.updateProject(id, updates);
        this.projects = updatedProject;
        this.selectedProject = updatedProject[id];
    }

    calculateCost = (id) => {
        const project = this.projects[id];
        const days = (new Date() - new Date(project.startDate)) / (1000 * 3600 * 24);
        const calculatedCost = days * (project.startingBudget * 0.1);
        project.currentCost = calculatedCost > project.startingBudget ? project.startingBudget * 1.5 : calculatedCost;
        if (project.currentCost > project.startingBudget * 1.5) {
            project.status = "Forced Closed";
        }
        this.projects[id] = project;
    }
}

const projectStore = new ProjectStore();
export default projectStore;