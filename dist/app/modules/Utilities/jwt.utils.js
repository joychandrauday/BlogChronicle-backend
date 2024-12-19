"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Use fallback values for JWT_SECRET and JWT_EXPIRY
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '10d';
// Function to generate JWT
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};
exports.generateToken = generateToken;
// Middleware to verify JWT
const verifyToken = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded; // Ensure `req.user` is properly typed
        console.log(decoded);
        next(); // Pass control to the next middleware
    }
    catch (err) {
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
exports.verifyToken = verifyToken;
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role !== 'admin') {
        // return to frontend
        res.status(403).json({
            success: false,
            message: "You are not authorized to Block a user",
            statusCode: 403,
        });
    }
    next();
});
exports.verifyAdmin = verifyAdmin;
