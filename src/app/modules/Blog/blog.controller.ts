// 3. Controller

import { NextFunction, Request, Response } from 'express'
import { blogValidationSchema, validateBlog } from './blog.validation';
import { blogService } from './blog.service';
import { AuthenticationError, NotFoundError, ValidationError, ZodValidationError } from '../Error/error';
import jwt from 'jsonwebtoken';
import { blogModel } from './blog.model';
import { userService } from '../User/user.service';
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';

// adding blog to database
const addingBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new AuthenticationError("User not authenticated");
    }
    const blogData = {
      ...req.body,
      author: user.id, // Include the author field from decoded token
    };

    const validation = validateBlog(blogData);
    if (!validation.success) {
      throw new ZodValidationError(validation.error.message);
    }

    const addedBlog = await blogService.addAnewBlog(validation.data);

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      statusCode: 201,
      data: {
        _id: addedBlog._id,
        title: addedBlog.title,
        content: addedBlog.content,
        author: addedBlog.author,
      },
    });
  } catch (error) {
    next(error);
  }
};

// getting blogs from database
const gettingblogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, sortBy = "createdAt", sortOrder = "desc", filter } = req.query;

    // Build the query object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } }, // Case-insensitive search in title
        { content: { $regex: search, $options: "i" } }, // Case-insensitive search in content
      ];
    }
    if (filter) {
      query.author = filter; // Filter by author ID
    }

    // Build sort object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sort: any = {};
    if (sortBy) {
      sort[sortBy as string] = sortOrder === "asc" ? 1 : -1; // Ascending or Descending
    }

    // Fetch blogs with query, sort, and filter
    const blogs = await blogService.getblogs(query, sort);

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      statusCode: 200,
      data: blogs,
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};
// getting single blog

const gettingSingleBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      statusCode: 200,
      data: blog,
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};


// deleting blog from the database 

const deletingBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new AuthenticationError("User not authenticated");
    }

    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      throw new NotFoundError("Blog not found");
    }
    console.log(blog.author?.toString(), user.id);
    if (blog.author?.toString() !== user.id) {
      throw new AuthenticationError("User not authorized to delete this blog");
    }
    await blogService.deleteBlogById(blog.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}
// admin access to delete any blog by id

const deletingAnyBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new AuthenticationError("User not authenticated");
    }

    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      res.status(404).json({
        success: true,
        message: "Blog Not found",
        statusCode: 404,
      });
    }

    await blogService.deleteBlogById(blog?.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}



// update blog by id

const updatingBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new AuthenticationError("User not authenticated");
    }

    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    if (blog.author?.toString() !== user.id) {
      throw new AuthenticationError("You are not authorized to update this blog");
    }

    const updatedBlog = await blogService.updateBlogInDB(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      statusCode: 200,
      data: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
}


// sending to routes
export const blogController = {
  addingBlog,
  gettingblogs,
  gettingSingleBlog,
  deletingBlog,
  deletingAnyBlog,
  updatingBlog
}
