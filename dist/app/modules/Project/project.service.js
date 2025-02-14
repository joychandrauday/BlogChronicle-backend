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
exports.projectService = void 0;
const project_model_1 = require("./project.model");
// Get all projects
const getProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_model_1.projectModel.find();
    return projects;
});
// Get a single project by ID
const getSingleProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.projectModel.findById(id);
    return project;
});
// Edit a project
const editProject = (id, updatedProject) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.projectModel.findByIdAndUpdate(id, updatedProject, { new: true });
    return project;
});
// Delete a project
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield project_model_1.projectModel.findByIdAndDelete(id);
});
// Add a new project
const addProject = (newProject) => __awaiter(void 0, void 0, void 0, function* () {
    const project = new project_model_1.projectModel(newProject);
    yield project.save();
    return project;
});
exports.projectService = {
    getProjects,
    getSingleProject,
    editProject,
    deleteProject,
    addProject
};
