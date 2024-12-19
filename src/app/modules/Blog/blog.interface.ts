// Blog Model:
import { Types } from "mongoose";

export type IBlog = {
    title: string,
    content: string,
    author: Types.ObjectId | string | null,
    isPublished: boolean,
}