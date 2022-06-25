import express from "express";
import { TodoItemsController } from "../controller/todoItemsController.js";

const router = express.Router();

router.get("/", TodoItemsController.getTodoItems);
router.post("/", TodoItemsController.createTodoItem);
router.put("/:id/", TodoItemsController.updateTodoItem);

export const todoItemsRoutes = router;
export default todoItemsRoutes;
