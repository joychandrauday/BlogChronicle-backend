"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.authorizeRoles = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';
// Middleware to verify if the user has one of the allowed roles
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        try {
            // Extract token from the authorization header
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }
            // Extract token from header
            const token = authHeader.split(' ')[1];
            // Verify the token
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            // Attach user info to the request object
            req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
            // Check if the user's role is in the allowed roles
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ success: false, message: 'Forbidden: You do not have the required role' });
            }
            // Proceed to the next middleware if role matches
            next(); // Make sure this is called and not returning a value
        }
        catch (err) {
            // Handle any errors (e.g., token expired or invalid)
            if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return res.status(401).json({ success: false, message: 'Token expired' });
            }
            else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return res.status(403).json({ success: false, message: 'Invalid token' });
            }
            return res.status(500).json({ success: false, message: 'Authentication failed' });
        }
    };
};
exports.authorizeRoles = authorizeRoles;
const verifyAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        // Decode the token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Check if the user's role is 'admin'
        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access forbidden: Admins only' });
        }
        // If the role is admin, attach the decoded information to the request and proceed
        req.user = decoded;
        next();
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ success: false, message: 'Token has expired' });
        }
        return res.status(500).json({ success: false, message: 'Failed to authenticate token' });
    }
};
exports.verifyAdmin = verifyAdmin;
