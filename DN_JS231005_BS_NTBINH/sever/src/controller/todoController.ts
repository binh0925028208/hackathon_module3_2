import express, { Request, Response } from "express";
import TodoService from "../service/todo.service";

const todoController = express.Router();
const todoService = new TodoService();

todoController.get("/", async (req: Request, res: Response) => {
  const result = await todoService.getAllTodo();
  res.status(200).json(result);
});

todoController.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await todoService.getOneTodo(id);
  res.status(200).json(result);
});

todoController.post("/", async (req: Request, res: Response) => {
  try {
    const newTodo = {
      id: req.body.id,
      content: req.body.content,
    };
    await todoService.createTodo(newTodo);
    res.status(201).json({ msg: "Create successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc tạo" });
  }
});

todoController.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result: any = await todoService.deleteTodoById(id);
    if (!result) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.status(201).json({ msg: "Delete successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc xóa" });
  }
});

todoController.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updateTodo = { ...req.body };
    const result = await todoService.updateTodo(id, updateTodo);
    if (result[0] == 0) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.status(201).json({ msg: "Update successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc cập nhật" });
  }
});

export default todoController;
