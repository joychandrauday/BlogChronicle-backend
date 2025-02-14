import { IProject } from "./project.interface";
import { projectModel } from "./project.model";

// Get all projects
const getProjects = async () => {
    const projects = await projectModel.find();
    return projects;
};

// Get a single project by ID
const getSingleProject = async (id: string) => {
    const project = await projectModel.findById(id);
    return project;
};

// Edit a project
const editProject = async (id: string, updatedProject: Partial<IProject>) => {
    const project = await projectModel.findByIdAndUpdate(id, updatedProject, { new: true });
    return project;
};

// Delete a project

const deleteProject = async (id: string) => {
    await projectModel.findByIdAndDelete(id);
};

// Add a new project

const addProject = async (newProject: IProject) => {
    const project = new projectModel(newProject);
    await project.save();
    return project;
};

export const projectService = {
    getProjects,
    getSingleProject,
    editProject,
    deleteProject,
    addProject
};