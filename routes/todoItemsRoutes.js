import express from "express";
import { todoItemsController } from "../controller/todoItemsController.js";

const router = express.Router();

router.get("/", todoItemsController.getTodoItems);
router.post("/", todoItemsController.createTodoItem);
router.put("/:id/", todoItemsController.updateTodoItem);

export const todoItemsRoutes = router;
