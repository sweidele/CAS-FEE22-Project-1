import {TodoItemModel} from '../services/todoItemModel.js';
export class Controller {
    constructor() {
        this.todoItemModel = new TodoItemModel();

        this.todoItemsTemplateCompiled = Handlebars.compile(document.getElementById('todoItemsTemplate').innerHTML);
        this.updateTodoTemplateCompiled = Handlebars.compile(document.getElementById('updateTodoTemplate').innerHTML);

        this.createItemButton = document.getElementById('createItemButton');
        this.backButton = document.getElementById('backButton');
        this.toogleStyleButton = document.getElementById('toogleStyleButton');
        this.filterTitleButton = document.getElementById('filterTitleButton');
        this.filterDueDateButton = document.getElementById('filterDueDateButton');
        this.filterCreationDateButton = document.getElementById('filterCreationDateButton');
        this.filterImportanceButton = document.getElementById('filterImportanceButton');
        this.filterCompletedButton = document.getElementById('filterCompletedButton');

        this.overviewButton = undefined; // will initialized after rendering
        this.updateTodoContainer = document.getElementById('updateTodoContainer');

        this.todoListNav = document.getElementById('todoListNav');
        this.todoListContainer = document.getElementById('todoListContainer');

        this.body = document.querySelector("body");
    }

    showCreateButton() {
        this.backButton.classList.add("disable-element");
        this.createItemButton.classList.remove("disable-element");
    }

    showBackButton() {
        this.createItemButton.classList.add("disable-element");
        this.backButton.classList.remove("disable-element");
    }

    showTodoList(todoList = this.todoItemModel.itemsSortedByTitle()) {
        this.showCreateButton();

        this.updateTodoContainer.classList.add("disable-element");
        this.todoListContainer.classList.remove("disable-element");

        this.todoListNav.classList.remove("disable-element");

        this.todoListContainer.innerHTML = this.todoItemsTemplateCompiled( 
            todoList
        );
    }

    showUpdateTodo(todoList = {id: undefined, title: undefined, description: undefined, creationDate: undefined, dueDate: undefined, importance: undefined, finished: false}) {
        this.showBackButton();

        this.todoListContainer.classList.add("disable-element");
        this.todoListNav.classList.add("disable-element");

        this.updateTodoContainer.classList.remove("disable-element");

        this.updateTodoContainer.innerHTML = this.updateTodoTemplateCompiled(

            { title: todoList.title ,
             dueDate: todoList.dueDate ,
             creationDate: todoList.creationDate ,
             importance: todoList.importance ,
             finished: todoList.finished ,
             description: todoList.description ,
             id: todoList.id }
        );
        this.initOverviewButtonEventHandler();
    }

    initEventHandlers() {
        this.createItemButton.addEventListener('click', (event) => {
            this.showUpdateTodo();
            console.log("createItemButton klicked");
        });

        this.backButton.addEventListener('click', (event) => {
            this.showTodoList();
            console.log("backButton klicked");
        });

        this.toogleStyleButton.addEventListener('click', (event) => {

             this.body.classList.toggle("funny-skin");
            console.log("toogleStyleButton klicked");
        });

        this.todoListContainer.addEventListener('click', (event) => {
            const todoItemId = Number(event.target.dataset.todoItemId);
            if(!isNaN(todoItemId)){
                this.showUpdateTodo(this.todoItemModel.getItemById(todoItemId));
                console.log("todoListContainer klicked");
            }
        });

        this.initSubNavEventHandlers();
        this.initUpdateItemEventHandlers();
    }

    initSubNavEventHandlers() {
        this.filterTitleButton.addEventListener('click', (event) => {
            this.showTodoList(this.todoItemModel.itemsSortedByTitle());
            console.log("filterTitleButton klicked");
        });

        this.filterDueDateButton.addEventListener('click', (event) => {
            this.showTodoList(this.todoItemModel.itemsSortedByDueDate());
            console.log("filterDueDateButton klicked");
        });

        this.filterCreationDateButton.addEventListener('click', (event) => {
            this.showTodoList(this.todoItemModel.itemsSortedBCreationDate());
            console.log("filterCreationDateButton klicked");
        });

        this.filterImportanceButton.addEventListener('click', (event) => {
            this.showTodoList(this.todoItemModel.itemsSortedByImportance());
            console.log("filterImportanceButton klicked");
        });

        this.filterCompletedButton.addEventListener('click', (event) => {
            this.showTodoList(this.todoItemModel.itemsCompleated());
            console.log("filterCompletedButton klicked");
        });
    }

    initUpdateItemEventHandlers() {
        this.updateTodoContainer.addEventListener('submit', async (event) => {

            const buttonType = event.submitter.dataset.buttonType;
            const todoItemId = Number(event.submitter.dataset.todoItemId);

            let formData = new FormData(document.getElementById('updateTodoForm'));

            if(isNaN(todoItemId) || todoItemId === 0){
                this.todoItemModel.addNewItem(formData);
            } else{
                this.todoItemModel.updateItem(todoItemId, formData);
            }

            if(buttonType == "updateOverview"){
                this.showTodoList();
            }
            console.log("updateTodoContainer klicked");
            event.preventDefault();
        });
    }

    initOverviewButtonEventHandler(){
        this.overviewButton = document.getElementById('overviewButton');
        this.overviewButton.addEventListener('click', (event) => {
            this.showTodoList();
            console.log("overviewButton klicked");
        });
    }

    renderTodoView() {
        this.showUpdateTodo();
        this.showTodoList();
    }

    initialize() {
        this.todoItemModel.loadData();
        this.renderTodoView();
        this.initEventHandlers();
        setTimeout(() => this.showTodoList(), 500);
    }
}

// create one-and-only instance
new Controller().initialize();
