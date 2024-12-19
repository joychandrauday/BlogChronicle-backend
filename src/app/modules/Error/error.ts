export class ZodValidationError extends Error {
    constructor(message: string = "Invalid data format or missing fields") {
        super(message);
        this.name = "ZodValidationError";
    }
}

export class NotFoundError extends Error {
    constructor(message: string = "Resource not found") {
        super(message);
        this.name = "NotFoundError";
    }
}

export class ValidationError extends Error {
    constructor(message: string = "Validation error") {
        super(message);
        this.name = "ValidationError";
    }
}

export class AuthenticationError extends Error {
    constructor(message: string = "Authentication failed") {
        super(message);
        this.name = "AuthenticationError";
    }
}

export class AuthorizationError extends Error {
    constructor(message: string = "Unauthorized access") {
        super(message);
        this.name = "AuthorizationError";
    }
}

export class InternalServerError extends Error {
    constructor(message: string = "Internal server error") {
        super(message);
        this.name = "InternalServerError";
    }
}
