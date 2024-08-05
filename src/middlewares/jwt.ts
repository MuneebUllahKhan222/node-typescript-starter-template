import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import { encodedToken } from "../types/auth.types";

export interface DecodedRequest extends Request {
  decoded?: encodedToken // or any other type
};


let checkToken = (req:Request, res: Response, next: NextFunction) => {
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
        (req as DecodedRequest).decoded = decoded as encodedToken;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Auth token is not supplied",
    });
  }
};

export const checkResetToken = (req:Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Token is not valid",
          err: err
        });
      } else {
        const decodedToken = decoded as encodedToken;
        const email = req.body.email;
        if (email !== decodedToken.email) {
          return res.status(401).json({
            message: "Token is not valid",
          });
        }
        (req as DecodedRequest).decoded = decodedToken;
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

export const checkAdminAuth = (req:Request, res: Response, next: NextFunction) => {
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
        const decodedToken = decoded as encodedToken;
        if (decodedToken.role !== "admin") {
          return res.status(401).json({
            message: "Unauthorized to acess this route",
          });
        }
        (req as DecodedRequest).decoded = decodedToken;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Auth token is not supplied",
    });
  }
};

export default checkToken;
