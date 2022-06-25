/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { TodoItemModel } from "../services/todoItemModel.js";

class Controller {
  constructor() {
    this.todoItemModel = new TodoItemModel();

    this.body = document.querySelector("body");

    // todo item view
    this.todoItemsTemplateCompiled = Handlebars.compile(document.getElementById("todoItemsTemplate").innerHTML);

    this.createItemButton = document.getElementById("createItemButton");
    this.toogleStyleButton = document.getElementById("toogleStyleButton");
    this.filterTitleButton = document.getElementById("filterTitleButton");
    this.filterDueDateButton = document.getElementById("filterDueDateButton");
    this.filterCreationDateButton = document.getElementById("filterCreationDateButton");
    this.filterImportanceButton = document.getElementById("filterImportanceButton");
    this.filterCompletedButton = document.getElementById("filterCompletedButton");

    // update item view
    this.updateTodoTemplateCompiled = Handlebars.compile(document.getElementById("updateTodoTemplate").innerHTML);
    this.backButton = document.getElementById("backButton");
    this.overviewButton = undefined; // will initialized after rendering
    this.updateTodoContainer = document.getElementById("updateTodoContainer");
    this.todoListNav = document.getElementById("todoListNav");
    this.todoListContainer = document.getElementById("todoListContainer");
  }

  showTodoListView() {
    this.createItemButton.classList.remove("disable-element");
    this.todoListContainer.classList.remove("disable-element");
    this.todoListNav.classList.remove("disable-element");

    this.backButton.classList.add("disable-element");
    this.updateTodoContainer.classList.add("disable-element");
  }

  showUpdateTodoView() {
    this.backButton.classList.remove("disable-element");
    this.updateTodoContainer.classList.remove("disable-element");

    this.createItemButton.classList.add("disable-element");
    this.todoListContainer.classList.add("disable-element");
    this.todoListNav.classList.add("disable-element");
  }

  showTodoList(todoList = this.todoItemModel.itemsSortedByTitle()) {
    this.showTodoListView();

    this.todoListContainer.innerHTML = this.todoItemsTemplateCompiled(todoList);
  }

  showUpdateTodo(
    todoList = {
      id: undefined,
      title: undefined,
      description: undefined,
      creationDate: new Date(),
      dueDate: undefined,
      importance: 1,
      finished: false,
    },
  ) {
    this.showUpdateTodoView();

    this.updateTodoContainer.innerHTML = this.updateTodoTemplateCompiled({
      title: todoList.title,
      dueDate: todoList.dueDate,
      creationDate: todoList.creationDate,
      importance: todoList.importance,
      finished: todoList.finished,
      description: todoList.description,
      id: todoList.id,
    });

    this.initOverviewButtonEventHandler();
  }

  initOverviewButtonEventHandler() {
    this.overviewButton = document.getElementById("overviewButton");
    this.overviewButton.addEventListener("click", () => {
      this.showTodoList();
    });
  }

  initEventHandlers() {
    this.initMainNavEventHandlers();
    this.initSubNavEventHandlers();
    this.initEditButtonEventHandler();
    this.initUpdateItemEventHandlers();
  }

  initMainNavEventHandlers() {
    this.createItemButton.addEventListener("click", () => {
      this.showUpdateTodo();
    });

    this.backButton.addEventListener("click", () => {
      this.showTodoList();
    });

    this.toogleStyleButton.addEventListener("click", () => {
      this.body.classList.toggle("funny-skin");
    });
  }

  initSubNavEventHandlers() {
    this.filterTitleButton.addEventListener("click", () => {
      this.showTodoList(this.todoItemModel.itemsSortedByTitle());
    });

    this.filterDueDateButton.addEventListener("click", () => {
      this.showTodoList(this.todoItemModel.itemsSortedByDueDate());
    });

    this.filterCreationDateButton.addEventListener("click", () => {
      this.showTodoList(this.todoItemModel.itemsSortedByCreationDate());
    });

    this.filterImportanceButton.addEventListener("click", () => {
      this.showTodoList(this.todoItemModel.itemsSortedByImportance());
    });

    this.filterCompletedButton.addEventListener("click", () => {
      this.showTodoList(this.todoItemModel.itemsCompleated());
    });
  }

  initEditButtonEventHandler() {
    this.todoListContainer.addEventListener("click", (event) => {
      const todoItemId = Number(event.target.dataset.todoItemId);
      if (Number.isInteger(todoItemId)) {
        this.showUpdateTodo(this.todoItemModel.getItemById(todoItemId));
      }
    });
  }

  async initUpdateItemEventHandlers() {
    this.updateTodoContainer.addEventListener("submit", async (event) => {
      event.preventDefault();

      const { buttonType } = event.submitter.dataset;
      const todoItemId = Number(event.submitter.dataset.todoItemId);

      const formData = new FormData(document.getElementById("updateTodoForm"));

      if (!Number.isInteger(todoItemId) || todoItemId === 0) {
        await this.todoItemModel.addNewItem(formData);
      } else {
        await this.todoItemModel.updateItem(formData, todoItemId);
      }

      if (buttonType === "updateOverview") {
        this.showTodoList();
      }
    });
  }

  renderInitialTodoView() {
    this.showUpdateTodo();
    this.showTodoList();
  }

  initialize() {
    this.todoItemModel.loadData();
    this.renderInitialTodoView();
    this.initEventHandlers();
    setTimeout(() => this.showTodoList(), 500);
  }
}

// create one-and-only instance
export default new Controller().initialize();
