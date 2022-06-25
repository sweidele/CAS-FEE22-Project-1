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
    return this.loadedItems.sort((a, b) => (
      a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1
    ));
  }

  itemsSortedByDueDate() {
    return this.loadedItems.sort((a, b) => this.sortDate(a.dueDate, b.dueDate));
  }

  itemsSortedByCreationDate() {
    return this.loadedItems.sort((a, b) => this.sortDate(
      a.creationDate,
      b.creationDate,
    ));
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

  // eslint-disable-next-line class-methods-use-this
  sortDate(a, b) {
    const aDate = new Date(a);
    const bDate = new Date(b);
    return aDate.getTime() > bDate.getTime() ? 1 : -1;
  }
}

export default TodoItemModel;
