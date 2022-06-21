import {ItemStore} from './data/itemRemoteStore.js';

export class TodoItemModel {
    
    constructor(storage) {
        this.storage = storage || new ItemStore();
        this.loadedItems = [ ];
    }

    async loadData(){
        this.loadedItems = await this.storage.loadItems();
    }

    itemsSortedByTitle() {
        return this.loadedItems.sort((a, b) => (a.title > b.title ? 1 : -1));
    }

    itemsSortedByDueDate() {
        return this.loadedItems.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
    }

    itemsSortedBCreationDate() {
        return this.loadedItems.sort((a, b) => (a.creationDate > b.creationDate ? 1 : -1));

    }

    itemsSortedByImportance() {
        return this.loadedItems.sort((a, b) => (a.importance > b.importance ? 1 : -1));
    }

    itemsCompleated() {
        return this.loadedItems.filter(item => item.finished === true);
    }

    getItemById(id){
        return this.loadedItems.find(item => item.id === id);
    }

    async updateItem(id, formData){
        await this.storage.update(id, formData);
        this.loadData();
        console.log("bestehendes Item editiert");

    }

    async addNewItem(formData){
                console.log(formData.get("title"));
        await this.storage.add(formData);
        this.loadData();
        console.log("neues Item Hinzugefügt");
    }
}
