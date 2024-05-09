import { errorHandler } from "../middlewares/errorHandler";
import authRoutes from "./auth.routes"
import  { Express } from "express";

const useRoutes = (app:Express) => {
  app.use('/api/auth', authRoutes);

  app.use(errorHandler);
}
export default useRoutes;