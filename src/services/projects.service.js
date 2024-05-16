import axiosInstance from '../utils/axiosInstance';

const API_URL = '/projects'
class ProjectService {
    static async fetchProjects() {
        const response = await axiosInstance.get(`${API_URL}`);
        return response.data;
    }

    static async fetchProjectDetails(id) {
        const response = await axiosInstance.get(`${API_URL}/${id}`);
        return response.data;
    }

    static async updateProject(id, updates) {
        console.log(updates, 'updates');
        const response = await axiosInstance.post(`${API_URL}/edit`, { project: updates });
        console.log(response, 'response');
        return response.data;
    }

    static async addProject(projectData) {
        const response = await axiosInstance.post(API_URL, projectData);
        return response.data;
    }
}

export default ProjectService;
