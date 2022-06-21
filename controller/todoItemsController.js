import {todoItemsStore} from '../services/todoItemsStore.js'

export class TodoItemsController {
    getTodoItems = (req, res) => {
        console.log("in getTodoItems");
        res.json((todoItemsStore.getAllItemsSortedByCreationDate()));
        res.end();
    };

    createTodoItem = (req, res) => {
        console.log("in createTodoItem");

        res.json(todoItemsStore.add(req.body.title, req.body.descripton, req.body.dueDate, req.body.importance));
        res.end();
    };

    updateTodoItem = (req, res) => {
        console.log("in updateTodoItem");
        res.json(todoItemsStore.update(
            req.body.title, 
            req.body.description, 
            req.body.creationDate, 
            req.body.dueDate, 
            req.body.importance, 
            req.body.finished,
            req.params.id));
        res.end();
    };

}

export const todoItemsController = new TodoItemsController();
