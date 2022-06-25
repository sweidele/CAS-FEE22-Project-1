import { todoItemsStore } from "../services/todoItemsStore.js";

export class TodoItemsController {
  getTodoItems = (req, res) => {
    console.log("in getTodoItems");
    res.json(todoItemsStore.getAllItemsSortedByCreationDate());
    res.end();
  };

  createTodoItem = (req, res) => {
    console.log("in createTodoItem");

    todoItemsStore.add(
      req.body.title,
      req.body.descripton,
      req.body.dueDate,
      req.body.importance
    );
  };

  updateTodoItem = (req, res) => {
    console.log("in updateTodoItem");
    todoItemsStore.update(
      req.body.title,
      req.body.description,
      req.body.creationDate,
      req.body.dueDate,
      req.body.importance,
      req.body.finished,
      Number(req.params.id)
    );
  };
}

export const todoItemsController = new TodoItemsController();
