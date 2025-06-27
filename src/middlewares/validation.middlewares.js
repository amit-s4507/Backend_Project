// src/middlewares/validation.middlewares.js
import Joi from 'joi';
import { ApiError } from '../utils/ApiError.js';

// Video validation schema
const videoUploadSchema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().min(10).max(2000).required(),
    category: Joi.string().valid(
        'Education', 'Technology', 'Science', 'Programming', 
        'Mathematics', 'Physics', 'Chemistry', 'Biology',
        'History', 'Literature', 'Languages', 'Business',
        'Art', 'Music', 'General'
    ).required(),
    tags: Joi.array().items(Joi.string().max(50)).max(10).optional(),
    isPublished: Joi.boolean().optional()
});

// User registration validation
const userRegistrationSchema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required()
        .messages({
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character'
        })
});

// User login validation
const userLoginSchema = Joi.object({
    email: Joi.string().email().optional(),
    username: Joi.string().alphanum().min(3).max(30).optional(),
    password: Joi.string().required()
}).or('email', 'username');

// AI processing validation
const aiProcessingSchema = Joi.object({
    videoId: Joi.string().hex().length(24).required(),
    processType: Joi.string().valid('transcript', 'summary', 'quiz', 'chapters').required()
});

// Quiz submission validation
const quizSubmissionSchema = Joi.object({
    videoId: Joi.string().hex().length(24).required(),
    answers: Joi.array().items(Joi.number().integer().min(0).max(3)).required(),
    timeSpent: Joi.number().positive().optional()
});

// Generic validation middleware
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            throw new ApiError(400, `Validation Error: ${errorMessage}`);
        }
        
        next();
    };
};

// Specific validation middlewares
export const validateVideoUpload = validate(videoUploadSchema);
export const validateUserRegistration = validate(userRegistrationSchema);
export const validateUserLogin = validate(userLoginSchema);
export const validateAIProcessing = validate(aiProcessingSchema);
export const validateQuizSubmission = validate(quizSubmissionSchema);

// File validation middleware
export const validateVideoFile = (req, res, next) => {
    if (!req.files || !req.files.videoFile) {
        throw new ApiError(400, "Video file is required");
    }

    const videoFile = req.files.videoFile[0];
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mkv', 'video/mov', 'video/wmv'];
    const maxSize = 500 * 1024 * 1024; // 500MB

    if (!allowedTypes.includes(videoFile.mimetype)) {
        throw new ApiError(400, "Invalid video format. Supported formats: MP4, AVI, MKV, MOV, WMV");
    }

    if (videoFile.size > maxSize) {
        throw new ApiError(400, "Video file size should not exceed 500MB");
    }

    next();
};

// Thumbnail validation middleware
export const validateThumbnail = (req, res, next) => {
    if (!req.files || !req.files.thumbnail) {
        throw new ApiError(400, "Thumbnail is required");
    }

    const thumbnail = req.files.thumbnail[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(thumbnail.mimetype)) {
        throw new ApiError(400, "Invalid thumbnail format. Supported formats: JPEG, JPG, PNG, WEBP");
    }

    if (thumbnail.size > maxSize) {
        throw new ApiError(400, "Thumbnail size should not exceed 5MB");
    }

    next();
};