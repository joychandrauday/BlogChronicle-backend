// 4.service

import { IUser } from "./user.interface"
import { userModel } from "./user.model"




// get all users
const getUsers = async () => {
  const users = await userModel.find()
  return users
}
// edit a user
const editUser = async (id: string, updatedUser: Partial<IUser>) => {
  const user = await userModel.findByIdAndUpdate(id, updatedUser, { new: true })
  return user
}
// get single user by id
const getSingleUser = async (id: string) => {
  const user = userModel.findById(id)
  return user;
}
// sending all to controller
export const userService = {
  getUsers,
  editUser,
  getSingleUser
}
