// 3. Controller
import { IUser } from "./user.interface"
import { userService } from "./user.service"
import { userModel } from "./user.model";
import bcrypt from "bcrypt";
// adding user to database
import { Request, Response, NextFunction } from 'express';
import { InternalServerError } from "../Error/error";

// adding user to database
const gettingUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Save the new user to the database
    const user = await userService.getUsers();
    console.log(user);

    // Send success response
    res.status(201).json({
      message: 'User retrieve successfully',
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
//get single user
const gettingSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await userService.getSingleUser(userId)

    // Send success response
    res.status(200).json({
      message: 'User retrieved successfully',
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }

}

// update user (block a user)
const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    // check if user is already blocked or exist
    const user = await userService.getSingleUser(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        statusCode: 404,
      });
    }
    if (user.isBlocked) {
      return res.status(400).json({
        success: false,
        message: "User is already blocked",
        statusCode: 400,
      });
    }
    // // Update the `isBlocked` property to true
    const updatedUser = await userService.editUser(userId, { isBlocked: true });

    if (!updatedUser) {
      throw new InternalServerError("Something went wrong!")
    }

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
      statusCode: 200,
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

// sending to routes
export const userController = {
  gettingUsers,
  gettingSingleUser,
  blockUser
}
