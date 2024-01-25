import { Op } from "sequelize";
import Todo from "../model/todo.model";

class TodoRepository {
  async getAllTodo() {
    return await Todo.findAll();
  }

  async getOneTodo(id: number) {
    return await Todo.findOne({
      where: {
        id,
      },
    });
  }

  async createTodo(formRequest: any) {
    return await Todo.create(formRequest);
  }

  async deleteById(id: number) {
    return await Todo.destroy({
      where: {
        id,
      },
    });
  }

  async updateTodo(id: number, formUpdate: any) {
    return await Todo.update(formUpdate, {
      where: {
        id,
      },
    });
  }
}

export default TodoRepository;
