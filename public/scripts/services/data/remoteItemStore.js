/* eslint-disable import/extensions */
import { HttpService } from "../http-service.js";

export class RemoteItemStore {
  // eslint-disable-next-line class-methods-use-this
  async loadItems() {
    return HttpService.ajax("GET", "/todoItems/", undefined);
  }

  async update(formData, todoItemId) {
    HttpService.ajax(
      "PUT",
      `/todoItems/${todoItemId}`,
      this.getTodoItemFromFormData(formData, todoItemId),
    );
  }

  async add(formData) {
    HttpService.ajax(
      "POST",
      "/todoItems/",
      this.getTodoItemFromFormData(formData),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getTodoItemFromFormData(formData, todoItemId) {
    return {
      id: todoItemId || undefined,
      title: formData.get("title") || undefined,
      description: formData.get("description") || undefined,
      creationDate: formData.get("creationDate") || undefined,
      dueDate: formData.get("dueDate") || undefined,
      importance: formData.get("importance") || undefined,
      finished: formData.get("finished") || false,
    };
  }
}

export default RemoteItemStore;
