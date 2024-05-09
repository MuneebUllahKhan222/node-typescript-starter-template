import jwt from "jsonwebtoken"
import { getEnv } from "../utils/env.js";
import { NextFunction, Request, Response } from "express";

export interface AddingDecoded extends Request {
  decoded?: any // or any other type
}


let checkToken = (req:AddingDecoded, res: Response, next: NextFunction) => {
  let token = req.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Auth token is not supplied",
    });
  }
};

export const checkResetToken = (req:AddingDecoded, res: Response, next: NextFunction) => {
  try {
    let token = req.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded:any) => {
      if (err) {
        return res.status(401).json({
          message: "Token is not valid",
        });
      } else {
        const email = req.body.email;
        if (email !== decoded.email) {
          return res.status(401).json({
            message: "Token is not valid",
          });
        }
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Auth token is not supplied",
    });
  }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong in verifying token",
    });
  }
}

export default checkToken;
