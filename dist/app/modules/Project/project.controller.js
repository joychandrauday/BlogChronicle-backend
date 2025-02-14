"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const project_service_1 = require("./project.service");
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield project_service_1.projectService.getProjects();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching projects" });
    }
});
const getSingleProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield project_service_1.projectService.getSingleProject(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching project" });
    }
});
const editProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProject = yield project_service_1.projectService.editProject(req.params.id, req.body);
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(updatedProject);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating project" });
    }
});
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProject = yield project_service_1.projectService.deleteProject(req.params.id);
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting project" });
    }
});
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProject = yield project_service_1.projectService.addProject(req.body);
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating project" });
    }
});
exports.projectController = {
    getProjects,
    getSingleProject,
    editProject,
    deleteProject,
    createProject,
};
