import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validate =  (req:Request, res:Response, next:NextFunction) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return response with validation errors
    return res.status(400).json({ message: "Invalid payload",errors: errors.array() });
  }
  next();
}