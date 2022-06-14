import {todoItemsStore} from '../services/todoItemsStore.js'

export class TodoItemsController {
    getTodoItems = async (req, res) => {
        res.json((await todoItemsStore.getAllItemsSortedByCreationDate() || []));
    };

    createTodoItem = async (req, res) => {
        res.json(await todoItemsStore.add(req.body.name, req.body.descripton, req.body.dueDate, req.body.mportance));
    };

    getTodoItem = async (req, res) => {

                        console.log("in get item");

        res.json(await todoItemsStore.add("eq.body.name", "test", "", ""));

        // res.json(await todoItemsStore.get(req.params.id));
    };

    deleteTodoItem = async (req, res) => {
        res.json(await todoItemsStore.delete(req.params.id)); // TODO should return 402 if not ok
    };
}

// async add(name, descripton, dueDate, importance) {
// async delete(id) {
// async get(id) {
// async getAllItemsSortedByCreationDate() {

export const todoItemsController = new TodoItemsController();
