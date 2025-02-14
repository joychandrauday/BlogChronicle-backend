export interface IProject {
    title: string;
    coverImage: string;
    description: string;
    liveLink?: string;
    clientCodeLink?: string;
    serverCodeLink?: string;
    underDevelopment: boolean;
    features: string[];
    usedTechnologies: string[];
    serial: string;
    projectType: string;
}