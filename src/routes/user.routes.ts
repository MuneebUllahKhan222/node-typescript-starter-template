import express from "express";
import { userValidator } from "../validators/user.validator";
import { validate } from "../validators";
import { updateUser } from "../controllers/user.controller";
import checkToken from "../middlewares/jwt";


const userRoutes = express.Router();

userRoutes.put("/update",
  checkToken,
  userValidator.updateUserValidator(),
  validate,
  updateUser
);