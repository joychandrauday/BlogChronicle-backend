"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectModel = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    coverImage: { type: String, required: true },
    description: { type: String, required: true },
    liveLink: { type: String, required: false },
    clientCodeLink: { type: String, required: false },
    serverCodeLink: { type: String, required: false },
    underDevelopment: { type: Boolean, required: true },
    features: { type: [String], required: true },
    usedTechnologies: { type: [String], required: true },
    serial: { type: String, required: true },
    projectType: { type: String, required: true }
}, {
    timestamps: true,
});
exports.projectModel = (0, mongoose_1.model)('Project', projectSchema);
