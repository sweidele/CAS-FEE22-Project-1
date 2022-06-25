import { httpService } from "../http-service.js";

export class ItemStore {
  constructor() {}

  async loadItems() {
    return await httpService.ajax("GET", "/todoItems/", undefined);
  }

  async update(id, formData) {
    httpService.ajax(
      "PUT",
      "/todoItems/" + id,
      this.getTodoItemFromFormData(formData, id)
    );
  }

  async add(formData) {
    httpService.ajax(
      "POST",
      "/todoItems/",
      this.getTodoItemFromFormData(formData)
    );
  }

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
