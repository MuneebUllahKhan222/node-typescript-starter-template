import jwt from "jsonwebtoken";
import { Request } from "express";

const getAuthUserId = async (req:Request) => {
  let token: string =req.headers["authorization"]!;
  token = token?.split(" ")[1];
  const decoded:any = jwt.verify(token, process.env.JWT_SECRET as string);
  const authId = decoded?.id;

  if (!authId) {
    return null;
  } else {
    return authId;
  }
};

export default getAuthUserId;
