import mongoose from "mongoose";
import {compareSync, hashSync, genSaltSync} from "bcrypt";
const Schema = mongoose.Schema;

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  encryptPassword(password:string):string;
  validPassword(reqPassword:string, UserPassword:string):boolean;
}

const userSchema = new Schema<User> (
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.encryptPassword = function (password:string): string {
  return hashSync(password, genSaltSync(10));
};

userSchema.methods.validPassword = function (reqPassword:string, UserPassword:string): boolean {
  return compareSync(reqPassword, UserPassword);
};

export const User = mongoose.model("User", userSchema);
