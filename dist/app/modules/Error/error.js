"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.AuthorizationError = exports.AuthenticationError = exports.ValidationError = exports.NotFoundError = exports.ZodValidationError = void 0;
class ZodValidationError extends Error {
    errors(errors) {
        throw new Error("Method not implemented.");
    }
    constructor(message = "Invalid data format or missing fields") {
        super(message);
        this.name = "ZodValidationError";
    }
}
exports.ZodValidationError = ZodValidationError;
class NotFoundError extends Error {
    constructor(message = "Resource not found") {
        super(message);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends Error {
    constructor(message = "Validation error") {
        super(message);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends Error {
    constructor(message = "Authentication failed") {
        super(message);
        this.name = "AuthenticationError";
    }
}
exports.AuthenticationError = AuthenticationError;
class AuthorizationError extends Error {
    constructor(message = "Unauthorized access") {
        super(message);
        this.name = "AuthorizationError";
    }
}
exports.AuthorizationError = AuthorizationError;
class InternalServerError extends Error {
    constructor(message = "Internal server error") {
        super(message);
        this.name = "InternalServerError";
    }
}
exports.InternalServerError = InternalServerError;
