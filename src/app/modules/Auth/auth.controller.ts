import { NextFunction, Request, Response } from "express";
import { userModel } from "../User/user.model";
import bcrypt from "bcrypt";
import { authService } from "./auth.service";
import { z } from "zod";
import { AuthenticationError } from "../Error/error";
import { generateToken } from "../Utilities/jwt.utils";

// 1. tegistering a new user to the database
const addUserToDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate user input using Zod
    const userData = {
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }
    // Check if the user already exists
    const existingUser = await authService.getUserByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
        status: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user
    const newUser = new userModel({
      ...userData,
      password: hashedPassword,
      role: 'user'
    });
    const user = await authService.addUserToDB(newUser);
    console.log(user);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      statusCode: 201,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle errors (Zod validation or MongoDB-related errors)
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        statusCode: 400,
        errors: error.errors,
        stack: error.stack
      });
    }
    next(error); // Pass the error to the global error handler
  }
}
// log in user with password and emai address including jwt token
const logInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const existingUser = await authService.getUserByEmail(email);
    console.log(existingUser);
    if (!existingUser) {
      throw new AuthenticationError('Invalid credentials!')
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new AuthenticationError("Invalid credentials!")
    }
    const token = generateToken({ id: existingUser._id, email: existingUser.email, role: existingUser.role });
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: {
        token,
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
      },
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
}
export const authController = {
  addUserToDB,
  logInUser
}