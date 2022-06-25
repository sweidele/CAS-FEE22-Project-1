import { ItemStore } from "../data/itemStore.js";
export class TodoItemsStore {
  constructor() {
    this.storage = new ItemStore();
    this.loadedItems = [];
    this.loadData();
  }

  loadData() {
    this.loadedItems = this.storage.loadItems();
  }

  async add(req) {
    this.storage.add(req);
    await this.loadData();
  }

  async update(req) {
    this.storage.update(req);
    await this.loadData();
  }

  getAllItemsSortedByCreationDate() {
    return this.loadedItems.sort((a, b) =>
      a.creationDate > b.creationDate ? 1 : -1
    );
  }
}

export const todoItemsStore = new TodoItemsStore();
