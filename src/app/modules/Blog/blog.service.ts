// 4.service

import { IBlog } from "./blog.interface"
import { blogModel } from "./blog.model"


// create a new blog
const addAnewBlog = async (blog: IBlog) => {
  // Save blog to the database
  const result = await blogModel.create(blog)
  return result
}

// get all blogs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getblogs = async (query: any = {}, sort: any = {}) => {
  return await blogModel
    .find(query) // Apply query filters
    .sort(sort) // Apply sorting
    .populate("author", "name email"); // Populate author details (optional)
};
// fet single blogs

const getBlogById = async (id: string) => {
  return await blogModel.findById(id).populate("author", "name email");
};

// search blog by title or content
// delete blog by id

const deleteBlogById = async (id: string) => {
  const result = await blogModel.findByIdAndDelete(id)
  return result
}

// update blog by id

const updateBlogInDB = async (id: string, updatedBlog: IBlog) => {
  console.log(updatedBlog)
  const result = await blogModel.findByIdAndUpdate(id, updatedBlog, { new: true })
  return result
}

// sending all to controller
export const blogService = {
  addAnewBlog,
  getblogs,
  updateBlogInDB,
  deleteBlogById,
  getBlogById
}
