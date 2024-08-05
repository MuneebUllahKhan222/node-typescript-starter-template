import { body, ValidationChain } from "express-validator";


const updateUserValidator = (): ValidationChain[] => ([
  body('firstName').notEmpty().withMessage('first name is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);

export const userValidator = {
  updateUserValidator,
};