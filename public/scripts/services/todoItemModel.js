import { RemoteItemStore } from "./data/remoteItemStore.js";

export class TodoItemModel {
  constructor(storage) {
    this.storage = storage || new RemoteItemStore();
    this.loadedItems = [];
  }

  async loadData() {
    this.loadedItems = await this.storage.loadItems();
  }

  async updateItem(formData, todoItemId) {
    this.storage.update(formData, todoItemId);
    await this.loadData();
  }

  async addNewItem(formData) {
    this.storage.add(formData);
    await this.loadData();
  }

  itemsSortedByTitle() {
    return this.loadedItems.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  itemsSortedByDueDate() {
    return this.loadedItems.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
  }

  itemsSortedByCreationDate() {
    return this.loadedItems.sort((a, b) => (a.creationDate > b.creationDate ? 1 : -1));
  }

  itemsSortedByImportance() {
    return this.loadedItems.sort((a, b) => (a.importance < b.importance ? 1 : -1));
  }

  itemsCompleated() {
    return this.loadedItems.filter((item) => item.finished === true);
  }

  getItemById(id) {
    return this.loadedItems.find((item) => item.id === id);
  }
}

export default TodoItemModel;
