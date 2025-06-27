// src/middlewares/rateLimit.middlewares.js
import rateLimit from 'express-rate-limit';
import { ApiError } from '../utils/ApiError.js';

// General API rate limiting
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: "Too many requests from this IP, please try again later.",
        retryAfter: "15 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        throw new ApiError(429, "Too many requests from this IP, please try again later.");
    }
});

// Strict rate limiting for authentication endpoints
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        error: "Too many authentication attempts, please try again later.",
        retryAfter: "15 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        throw new ApiError(429, "Too many authentication attempts, please try again later.");
    }
});

// AI processing rate limiting (more restrictive due to cost)
export const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Limit each IP to 20 AI requests per hour
    message: {
        error: "AI processing limit exceeded. Please try again later.",
        retryAfter: "1 hour"
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        throw new ApiError(429, "AI processing limit exceeded. Please try again later.");
    }
});

// Video upload rate limiting
export const uploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 uploads per hour
    message: {
        error: "Upload limit exceeded. Please try again later.",
        retryAfter: "1 hour"
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        throw new ApiError(429, "Upload limit exceeded. Please try again later.");
    }
});

// Comment/interaction rate limiting
export const interactionLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 30, // Limit each IP to 30 interactions per 5 minutes
    message: {
        error: "Too many interactions, please slow down.",
        retryAfter: "5 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        throw new ApiError(429, "Too many interactions, please slow down.");
    }
});

// Search rate limiting
export const searchLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20, // Limit each IP to 20 searches per minute
    message: {
        error: "Too many search requests, please try again later.",
        retryAfter: "1 minute"
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        throw new ApiError(429, "Too many search requests, please try again later.");
    }
});

// Custom rate limiter for specific routes
export const createCustomLimiter = (windowMs, max, message) => {
    return rateLimit({
        windowMs,
        max,
        message: {
            error: message,
            retryAfter: `${windowMs / 1000 / 60} minutes`
        },
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            throw new ApiError(429, message);
        }
    });
};