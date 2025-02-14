// 3. Router
import express from 'express'
import { blogController } from './blog.controller'
import { verifyToken } from '../Utilities/jwt.utils'

const router = express.Router()

router.post('/', blogController.addingBlog) // add blog to db
router.get('/', blogController.gettingblogs) // getting ll blogs from db
router.get('/:id', blogController.gettingSingleBlog) // getting ll blogs from db
router.get('/user/:id', blogController.gettingBlogsByAuthorId) // getting ll blogs from db
router.delete('/:id', blogController.deletingBlog) // getting ll blogs from db
router.patch('/:id', blogController.updatingBlog) // getting ll blogs from db

export const blogRoutes = router
