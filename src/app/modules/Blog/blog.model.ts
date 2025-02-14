// 5.Model
// Blog Model:
import { model, Schema } from 'mongoose'
import { IBlog } from './blog.interface'

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
    featuredImage: { type: String, default: 'https://designshack.net/wp-content/uploads/placeholder-image.png' }
  },
  {
    timestamps: true,
  }
)

export const blogModel = model<IBlog>('Blog', blogSchema)
