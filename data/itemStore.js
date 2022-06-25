export class ItemStore {
  constructor() {
    this.todoItems = [
      {
        id: 1,
        title: "aufräumen",
        description: "Wohnung aufräumen",
        creationDate: "2000-01-01",
        dueDate: "2000-01-14",
        importance: 1,
        finished: false,
      },
      {
        id: 2,
        title: "kochen",
        description: "Pizza kochen",
        creationDate: "2000-02-01",
        dueDate: "2000-02-28",
        importance: 2,
        finished: false,
      },
      {
        id: 3,
        title: "Wäsche waschen",
        description: "Rote Pulli ist schmutzig",
        creationDate: "2000-03-01",
        dueDate: "2000-04-01",
        importance: 3,
        finished: true,
      },
      {
        id: 4,
        title: "Netflix schauen",
        description: "Friends fertig schauen",
        creationDate: "2000-11-01",
        dueDate: "2000-12-01",
        importance: 5,
        finished: false,
      },
    ];
  }

  loadItems() {
    return this.todoItems;
  }

  update(req) {
    this.todoItems = this.todoItems.map((item) =>
      item.id !== Number(req.params.id)
        ? item
        : this.getTodoItemFromFormData(req)
    );
  }

  add(req) {
    this.todoItems.push(this.getTodoItemFromFormData(req));
  }

  getTodoItemFromFormData(req) {
    return {
      id: Number(req.params.id) || this.todoItems.length + 1,
      title: req.body.title || undefined,
      description: req.body.description || undefined,
      creationDate: req.body.creationDate || new Date(),
      dueDate: req.body.dueDate || undefined,
      importance: req.body.importance || undefined,
      finished: req.body.finished || false,
    };
  }
}
