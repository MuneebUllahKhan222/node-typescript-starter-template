import { body } from "express-validator";

export const signUpValidator = () => ([
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage("Password is required").isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
  body('firstName').notEmpty().withMessage('first name is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);

export const loginValidator = () => ([
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage("Password is required"),
]);

export const refreshTokenValidator = () => ([
  body('email').isEmail().withMessage('Invalid email address'),
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
]);

export const changePasswordValidator = (): any => ([
  body('oldPassword').notEmpty().withMessage('Old password is required').isLength({ min: 4 }).withMessage('Old Password must be at least 4 characters long'),
  body('newPassword').notEmpty().withMessage('New password is required').isLength({ min: 4 }).withMessage('New Password must be at least 4 characters long'),
]);  