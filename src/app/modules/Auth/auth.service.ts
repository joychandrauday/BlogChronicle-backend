// 4. Service

import { IUser } from "../User/user.interface";
import { userModel } from "../User/user.model";

// create a new user
const addUserToDB = async (user: IUser) => {
  // Save user to the database
  const result = await userModel.create(user)
  return result
}
// find one from the database

const getUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ email })
  return user
}

export const authService = {
  addUserToDB,
  getUserByEmail
};
