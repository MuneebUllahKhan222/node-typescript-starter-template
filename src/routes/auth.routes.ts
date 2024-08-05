import express from "express";
import { changePassword, login, refreshTokenHandler, signup } from "../controllers/auth.controller";
import { validate } from "../validators";
import checkToken from "../middlewares/jwt";
import { authValidator } from "../validators/auth.validator";

const authRoutes = express.Router();

authRoutes.post("/signup",
  authValidator.signUpValidator(),
  validate,
  signup);

authRoutes.post("/login",
  authValidator.loginValidator(),
  validate,
  login);


authRoutes.post("/change-password",
  checkToken,
  authValidator.changePasswordValidator(),
  validate,
  changePassword);

authRoutes.post("/refresh",
  authValidator.refreshTokenValidator(),
  validate,
  refreshTokenHandler);


export default authRoutes;
