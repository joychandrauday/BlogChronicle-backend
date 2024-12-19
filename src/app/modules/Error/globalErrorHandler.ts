import { Request, Response, NextFunction } from "express";
import {
    ZodValidationError,
    NotFoundError,
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    InternalServerError,
} from "./error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err); // Log the error for debugging purposes

    // Helper function to format the error response
    const createErrorResponse = (
        message: string,
        statusCode: number,
        details?: string
    ) => ({
        success: false,
        message,
        statusCode,
        error: details ? { details } : undefined,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Include stack trace only in development
    });

    if (err instanceof ZodValidationError) {
        return res.status(400).json(
            createErrorResponse("Validation Error", 400, JSON.stringify(err.errors))
        );
    }

    if (err instanceof NotFoundError) {
        return res
            .status(404)
            .json(createErrorResponse("Resource not found", 404));
    }

    if (err instanceof ValidationError) {
        return res
            .status(400)
            .json(createErrorResponse("Validation error", 400, err.message));
    }

    if (err instanceof AuthenticationError) {
        return res
            .status(401)
            .json(createErrorResponse(err.message, 401, "Authentication failed"));
    }

    if (err instanceof AuthorizationError) {
        return res
            .status(403)
            .json(createErrorResponse("Unauthorized access", 403, err.message));
    }

    if (err instanceof InternalServerError) {
        return res
            .status(500)
            .json(createErrorResponse("Internal server error", 500, err.message));
    }

    // Default handler for any unhandled errors
    return res.status(500).json(
        createErrorResponse(
            "An unexpected error occurred",
            500,
            process.env.NODE_ENV === "development" ? err.message : undefined
        )
    );
};
