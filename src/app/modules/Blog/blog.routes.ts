// 3. Router
import express from 'express'
import { blogController } from './blog.controller'
import { verifyAdmin, verifyToken } from '../Utilities/jwt.utils'

const router = express.Router()

router.post('/', verifyToken, blogController.addingBlog) // add blog to db
router.get('/', blogController.gettingblogs) // getting ll blogs from db
router.get('/:id', blogController.gettingSingleBlog) // getting ll blogs from db
router.delete('/:id', verifyToken, blogController.deletingBlog) // getting ll blogs from db
router.patch('/:id', verifyToken, blogController.updatingBlog) // getting ll blogs from db

export const blogRoutes = router
