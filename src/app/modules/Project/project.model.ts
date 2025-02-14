import { model, Schema } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>({
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
export const projectModel = model<IProject>('Project', projectSchema)
