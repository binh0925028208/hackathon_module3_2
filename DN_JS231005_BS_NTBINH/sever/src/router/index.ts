import { Express } from "express";
import todoController from "../controller/todoController";

const Router = (app: Express) => {
  app.use("/api/v1/notes", todoController);
};

export default Router;
