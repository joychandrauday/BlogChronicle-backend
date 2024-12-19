// 3. Router
import express from 'express'
import { userController } from './user.controller'
import { verifyAdmin, verifyToken } from '../Utilities/jwt.utils'
import { blogController } from '../Blog/blog.controller'
const router = express.Router()

router.get('/', userController.gettingUsers) // add order to db
router.get('/:id', userController.gettingSingleUser) // add order to db
router.patch('/users/:userId/block', verifyToken, verifyAdmin, userController.blockUser as unknown as express.RequestHandler)
router.delete('/blogs/:id', verifyToken, verifyAdmin, blogController.deletingAnyBlog) // getting ll blogs from db
export const userRoutes = router

