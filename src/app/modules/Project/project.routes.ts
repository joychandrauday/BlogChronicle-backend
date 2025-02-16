// 3. Router
import express from 'express'
import { projectController } from './project.controller';
const router = express.Router()

// 4. Endpoint for creating a new project
router.post('/', projectController.createProject)
router.get('/', projectController.getProjects)
router.get('/:id', projectController.getSingleProject as unknown as express.RequestHandler)
router.patch('/:id', projectController.editProject as unknown as express.RequestHandler)
router.delete('/:id', projectController.deleteProject as unknown as express.RequestHandler)

export const projectRoutes = router
