import express, { Express, Request, Response } from "express";
import "express-async-errors"; 
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import useRoutes from "./routes";
import connectDB from "./config/db";
// import { envConfig } from "./src/utils/env";

// envConfig();
dotenv.config();
connectDB();


const app: Express = express();
const port = process.env.PORT;

app
  .use(express.json())
  .use(cors())
  
  app.get("/test", (req: Request, res: Response) => {
    res.send("Express + TypeScript Serve");
  });
  
useRoutes(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});