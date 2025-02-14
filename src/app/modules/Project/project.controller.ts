/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { projectService } from "./project.service";

const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await projectService.getProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects" });
    }
};

const getSingleProject = async (req: Request, res: Response) => {
    try {
        const project = await projectService.getSingleProject(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Error fetching project" });
    }
};

const editProject = async (req: Request, res: Response) => {
    try {
        const updatedProject = await projectService.editProject(req.params.id, req.body);
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: "Error updating project" });
    }
};

const deleteProject = async (req: Request, res: Response) => {
    try {
        const deletedProject = await projectService.deleteProject(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: "Error deleting project" });
    }
}

const createProject = async (req: Request, res: Response) => {
    try {
        const newProject = await projectService.addProject(req.body);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Error creating project" });
    }
}

export const projectController = {
    getProjects,
    getSingleProject,
    editProject,
    deleteProject,
    createProject,
}