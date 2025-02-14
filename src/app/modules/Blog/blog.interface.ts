// Blog Model:
import { Types } from "mongoose";

export type IBlog = {
    title: string,
    content: string,
    author: string | string | null,
    isPublished: boolean,
    featuredImage: string | null
}