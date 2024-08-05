import { Response } from "express";
import { DecodedRequest } from "../middlewares/jwt";
import { User } from "../models/user.model";
import getAuthUserId from "../utils/authUserId";

export const updateUser = async (req: DecodedRequest, res: Response): Promise<Object> => {
    const userId = await getAuthUserId(req);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({message: "User does not exist"});
    };
    const { firstName, lastName } = req.body;
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    return res.status(200).json({message: "User updated successfully"});
}