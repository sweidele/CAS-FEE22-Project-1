import express from 'express';
import { todoItemsController } from '../controller/todoItemsController.js';

const router = express.Router();

router.get("/", todoItemsController.getTodoItems);
router.post("/", todoItemsController.createTodoItem);
router.get("/:id/", todoItemsController.getTodoItem);
router.delete("/:id/", todoItemsController.deleteTodoItem);

export const todoItemsRoutes = router;
