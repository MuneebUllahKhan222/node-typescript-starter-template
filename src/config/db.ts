import mongoose from "mongoose";
import { getEnv } from '../utils/env'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(getEnv('MONGO_URI'), {});
    console.info(`MongoDB Connected ${conn.connection.host}`);
  } catch (error:any) {
    console.log(`Error: ${error.message}`);
    process.exit(1)
  }
}

export default connectDB