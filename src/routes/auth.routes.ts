import express from "express";
import { changePassword, login, refreshTokenHandler, signup } from "../controllers/auth.controller";
import { changePasswordValidator, loginValidator, refreshTokenValidator, signUpValidator } from "../validators/auth.validator";
import { validate } from "../validators";
import checkToken from "../middlewares/jwt";

const authRoutes = express.Router();

authRoutes.post("/signup",
  signUpValidator(),
  validate,
  signup);

authRoutes.post("/login",
  loginValidator(),
  validate,
  login);


authRoutes.post("/change-password",
  checkToken,
  changePasswordValidator(),
  validate,
  changePassword);

authRoutes.post("/refresh",
  refreshTokenValidator(),
  validate,
  refreshTokenHandler);


export default authRoutes;
