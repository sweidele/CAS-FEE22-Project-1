/* eslint-disable max-classes-per-file */
import {ItemStore} from '../data/itemStore.js';
export class TodoItemsStore {
    constructor() {
        this.storage = new ItemStore();
        this.loadedItems = [ ];
        this.loadData();
    }

    loadData(){
        this.loadedItems = this.storage.loadItems();
    }

    add(title, description, dueDate, importance) {
        this.storage.add(title, description, dueDate, importance, false);
        this.loadData();
        console.log("neues Item Hinzugefügt");
    }

    update(title, description, creationDate, dueDate, importance, finished, id) {

        this.storage.update(title, description, dueDate, importance, finished, creationDate, id);
        this.loadData();
        console.log("bestehendes Item editiert");

    }

    getAllItemsSortedByCreationDate() {
        console.log("in getAllItemsSortedByCreationDate");
        return this.loadedItems.sort((a, b) => (a.creationDate > b.creationDate ? 1 : -1));
    }

    getTodoItemFromFormData(title, description, creationDate, dueDate, importance, finished, id){
        return {
                    id: id || this.loadedItems.length + 1, 
                    title: title, 
                    description: description, 
                    creationDate: creationDate, 
                    dueDate: dueDate, 
                    importance: importance, 
                    finished: finished
                };
    }
}

export const todoItemsStore = new TodoItemsStore();
