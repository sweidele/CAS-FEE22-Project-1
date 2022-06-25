/* eslint-disable import/extensions */
import { todoItemsStore } from "../services/todoItemsStore.js";

export class TodoItemsController {
  static getTodoItems = (req, res) => {
    res.json(todoItemsStore.getAllItemsSortedByCreationDate());
    res.end();
  };

  static createTodoItem = (req) => {
    todoItemsStore.add(req);
  };

  static updateTodoItem = (req) => {
    todoItemsStore.update(req);
  };
}

export default TodoItemsController;
