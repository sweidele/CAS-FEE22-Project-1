/* eslint-disable max-classes-per-file */
import Datastore from 'nedb-promises';

export class TodoItem {
    constructor(name, descripton, dueDate, importance) {
        this.name = name;
        this.descripton = descripton;
        this.creationDate = new Date();
        this.dueDate = dueDate;
        this.importance = importance;
        this.finished = false;
    }
}

// id: 1, name: 'aufräumen', descripton: 'Wohnung aufräumen',
// creationDate: '1.1.2000', dueDate: '1.1.2000', importance: 3, finished: false,

export class TodoItemsStore {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: '../data/todoItems.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async add(name, descripton, dueDate, importance) {
                console.log("in add");

        const todoItem = new TodoItem(name, descripton, dueDate, importance);
        return this.db.insert(todoItem);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return this.get(id);
    }

    async get(id) {
                        console.log("in get");

        return this.db.findOne({_id: id});
    }

    // async getAllItemsSortedByName() {
    //     return this.db.find({finished : false}).sort(item1, item2 => item1.name - item2.name).exec();
    // }

    async getAllItemsSortedByCreationDate() {
        console.log("in db file");
        console.log(this.db);

        return this.db.find({finished : false}).sort({ creationDate: -1 }).exec();
    }

    // async getAllItemsSortedByDueDate() {
    //     return this.db.find({finished : false}).sort({ dueDate: -1 }).exec();
    // }

    // async getAllItemsSortedByImportance() {
    //     return this.db.find({finished : false}).sort(item1, item2 => item1.importance - item2.importance).exec();
    // }

    // async getAllCompleadesItems() {
    //     return this.db.find({finished : true}).sort(item1, item2 => item1.name - item2.name).exec();
    // }


    // async all(currentUser) {
    //     return this.db.find({orderedBy : currentUser}).sort({ orderDate: -1 }).exec();
    // }
}

export const todoItemsStore = new TodoItemsStore();
