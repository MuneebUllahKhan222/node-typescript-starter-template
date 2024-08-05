import { errorHandler } from "../middlewares/errorHandler";
import authRoutes from "./auth.routes"
import  { Express } from "express";
import userRoutes from "./user.routes";

const useRoutes = (app:Express) => {
  app.use('/api/auth', authRoutes);

  app.use('/api/user', userRoutes);

  app.use(errorHandler);
}
export default useRoutes;