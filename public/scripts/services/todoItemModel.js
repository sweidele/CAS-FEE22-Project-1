import { ItemStore } from "./data/itemRemoteStore.js";

export class TodoItemModel {
  constructor(storage) {
    this.storage = storage || new ItemStore();
    this.loadedItems = [];
  }

  async loadData() {
    this.loadedItems = await this.storage.loadItems();
    console.log("load item: " + this.loadedItems[0].title);
  }

  itemsSortedByTitle() {
    return this.loadedItems.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  itemsSortedByDueDate() {
    return this.loadedItems.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
  }

  itemsSortedBCreationDate() {
    return this.loadedItems.sort((a, b) =>
      a.creationDate > b.creationDate ? 1 : -1
    );
  }

  itemsSortedByImportance() {
    return this.loadedItems.sort((a, b) =>
      a.importance > b.importance ? 1 : -1
    );
  }

  itemsCompleated() {
    return this.loadedItems.filter((item) => item.finished === true);
  }

  getItemById(id) {
    return this.loadedItems.find((item) => item.id === id);
  }

  async updateItem(id, formData) {
    this.storage.update(id, formData);
    await this.loadData();
    console.log("bestehendes Item editiert");
    console.log("update item: " + this.loadedItems[0].title);
  }

  async addNewItem(formData) {
    console.log(formData.get("title"));
    this.storage.add(formData);
    await this.loadData();
    console.log("neues Item Hinzugefügt");
    console.log("add item: " + this.loadedItems[0].title);
  }
}
