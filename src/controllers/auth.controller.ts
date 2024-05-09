import { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { signUpPayload, loginPayload } from "../types/auth.types";
import verifyRefresh from "../utils/refreshtoken";
import getAuthUserId from "../utils/authUserId";



export const signup = async (req: Request, res: Response): Promise<Object> => {
    const { email, password, firstName, lastName, role }:signUpPayload = req.body;
    const user = await User.findOne({email});
    if (user) {
      return res.status(400).json({message: "User already exists"});
    };
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.role = role;
    await newUser.save();
    return res.status(201).json({message: "User created successfully"});
};

export const login = async (req: Request, res: Response): Promise<Object> => {
    const { email, password }: loginPayload = req.body;
    const user = await User.findOne({email}).select("password role firstName lastName email");
    if (!user) {
      return res.status(400).json({message: "User does not exist"});
    };
    if (!user.validPassword(password, user.password)) {
      return res.status(400).json({message: "Invalid password"});
    };
    
    const token = jwt.sign({id: user._id, role: user.role, email:user.email}, process.env.JWT_SECRET as string, {expiresIn: "12h"});
    const refreshToken = jwt.sign({id: user._id, role: user.role, email:user.email}, process.env.JWT_REFRESH_SECRET as string, {expiresIn: "1d"});

    return res.status(200).json({message: "Login successful", token, refreshToken, user});
};

export const refreshTokenHandler = async (req: Request, res: Response): Promise<Object> => {
  const { email, refreshToken } = req.body;
  const isValid:boolean = verifyRefresh(email, refreshToken);
  if (!isValid) {
    res.status(401).json({message: "Invalid refresh token"});
  }
  const user = await User.findOne({email});
  const token = jwt.sign({id: user?._id, role: user?.role, email:user?.email}, process.env.JWT_SECRET as string, {expiresIn: "12h"});
  return res.status(200).json({ success: true, token });
};

export const changePassword = async (req: Request, res: Response): Promise<Object> => {
  const { oldPassword, newPassword } = req.body;
  const userId = await getAuthUserId(req);
  const user = await User.findById(userId).select("+password");
  
  if (!user) {
    return res.status(400).json({message: "User does not exist"});
  };

  if (!user.validPassword(oldPassword, user.password)) {
    return res.status(400).json({message: "Invalid password"});
  }
  user.password = user.encryptPassword(newPassword);
  await user.save();
  return res.status(200).json({message: "Password updated successfully"});
}