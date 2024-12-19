import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';

// Middleware to verify if the user has one of the allowed roles
export const authorizeRoles = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Extract token from the authorization header
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            // Extract token from header
            const token = authHeader.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };

            // Attach user info to the request object
            req.user = { id: decoded.id, email: decoded.email, role: decoded.role };

            // Check if the user's role is in the allowed roles
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ success: false, message: 'Forbidden: You do not have the required role' });
            }

            // Proceed to the next middleware if role matches
            next(); // Make sure this is called and not returning a value
        } catch (err) {
            // Handle any errors (e.g., token expired or invalid)
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ success: false, message: 'Token expired' });
            } else if (err instanceof jwt.JsonWebTokenError) {
                return res.status(403).json({ success: false, message: 'Invalid token' });
            }
            return res.status(500).json({ success: false, message: 'Authentication failed' });
        }
    };
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        // Decode the token
        const decoded = jwt.verify(token, JWT_SECRET) as { role: string };

        // Check if the user's role is 'admin'
        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access forbidden: Admins only' });
        }

        // If the role is admin, attach the decoded information to the request and proceed
        req.user = decoded;
        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ success: false, message: 'Token has expired' });
        }
        return res.status(500).json({ success: false, message: 'Failed to authenticate token' });
    }
};
