import express from "express";
import { userValidator } from "../validators/user.validator";
import { validate } from "../validators";
import { getUsers, updateUser } from "../controllers/user.controller";
import checkToken, { checkAdminAuth } from "../middlewares/jwt";


const userRoutes = express.Router();

userRoutes.get("/get",
  checkAdminAuth,
  getUsers
);

userRoutes.put("/update",
  checkToken,
  userValidator.updateUserValidator(),
  validate,
  updateUser
);

export default userRoutes;