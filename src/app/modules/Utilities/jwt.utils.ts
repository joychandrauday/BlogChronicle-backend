import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from '../Error/error';

// Extend the Request interface to include `user` property
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user: { id: string; email: string; role: string };
        }
    }
}

// Use fallback values for JWT_SECRET and JWT_EXPIRY
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '10d';

// Function to generate JWT
export const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

// Middleware to verify JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        // Check for the presence of the Authorization header
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ success: false, message: 'No token provided' });
            return; // Ensure the function stops here
        }

        // Extract the token
        const token = authHeader.split(' ')[1];

        // Verify the token and attach the decoded payload to `req.user`
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
        req.user = decoded; // Ensure `req.user` is properly typed
        console.log(decoded);
        next(); // Pass control to the next middleware
    } catch (err) {
        // Narrow the error type
        if (err instanceof Error) {
            // Handle specific JWT errors
            if (err.name === 'TokenExpiredError') {
                res.status(401).json({ success: false, message: 'Token has expired' });
                return; // Explicitly stop further execution
            }
            if (err.name === 'JsonWebTokenError') {
                res.status(403).json({ success: false, message: 'Invalid token' });
                return; // Explicitly stop further execution
            }
        }
        res.status(500).json({ success: false, message: 'Failed to authenticate token' });
        return; // Explicitly stop further execution
    }
};


export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== 'admin') {
        // return to frontend
        res.status(403).json({
            success: false,
            message: "You are not authorized to Block a user",
            statusCode: 403,
        });
    }
    next()
}
