import { Express } from "express";
import todoController from "./todoController";

const controller = (app: Express) => {
  app.use("/api/v1/notes/", todoController);
};

export default controller;
