// 3. Controller

import { NextFunction, Request, Response } from 'express'
import { blogService } from './blog.service';
import { AuthenticationError, NotFoundError } from '../Error/error';
import { blogModel } from './blog.model';


// adding blog to database
const addingBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogData = {
      ...req.body,
    };

    const addedBlog = await blogService.addAnewBlog(blogData);

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
    const blog = await blogService.getBlogById(req.params.id)
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
// get blogs by author id

const gettingBlogsByAuthorId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.params.id);
    const blogs = await blogModel.find({ author: req.params.id });

    if (!blogs.length) {
      throw new NotFoundError("No blogs found for this author");
    }

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

// deleting blog from the database 

const deletingBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {


    await blogService.deleteBlogById(req.params.id);

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
    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      throw new NotFoundError("Blog not found");
    }


    console.log(req.body)
    const updatedBlog = await blogService.updateBlogInDB(req.params.id, req.body);
    console.log(updatedBlog)
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
  updatingBlog,
  gettingBlogsByAuthorId
}
