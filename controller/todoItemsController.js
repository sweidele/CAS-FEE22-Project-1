import { todoItemsStore } from "../services/todoItemsStore.js";

export class TodoItemsController {
  getTodoItems = (req, res) => {
    res.json(todoItemsStore.getAllItemsSortedByCreationDate());
    res.end();
  };

  createTodoItem = (req, res) => {
    todoItemsStore.add(req);
  };

  updateTodoItem = (req, res) => {
    todoItemsStore.update(req);
  };
}

export const todoItemsController = new TodoItemsController();
