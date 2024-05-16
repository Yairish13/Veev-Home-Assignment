import { makeAutoObservable } from "mobx";
import ProjectService from '../services/projects.service'

class ProjectStore {
    projects = [];
    projectDetails = null;

    constructor() {
        makeAutoObservable(this);
    }

    fetchProjects = async () => {
        this.projects = await ProjectService.fetchProjects();
    };

    fetchProjectDetails = async (id) => {
        this.projectDetails = await ProjectService.fetchProjectDetails(id);
    };

    updateProject = async (id, updates) => {
        const updatedProject = await ProjectService.updateProject(id, updates);
        this.projects = this.projects.map(proj =>
            proj.id === id ? updatedProject : proj);
        this.projectDetails = updatedProject;
    };

    addProject = async (projectData) => {
        const newProject = await ProjectService.addProject(projectData);
        this.projects.push(newProject);
    };
}

const projectStore = new ProjectStore();
export default projectStore;
