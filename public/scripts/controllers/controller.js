    // const container = document.getElementById("container");
    // const songsListTemplateSource = document.getElementById("songs-list-template").innerHTML;
    // const createSongsListHtmlString = Handlebars.compile(songsListTemplateSource);

    // function bubbledClickEventHandler(event) {
    //     const buttonSongId = event.target.dataset.songId;
    //     if (buttonSongId) {
    //         const buttonDelta = Number(event.target.dataset.delta);
    //         rate(buttonSongId, buttonDelta);
    //     }
    // }

    // function rate(id, delta) {
    //     rateSong(id, delta);
    //     renderSongs();
    // }

    // function renderSongs() {
    //     container.innerHTML = createSongsListHtmlString(songsSorted());
    // }

    // function init() {
    //     renderSongs();
    //     container.addEventListener("click", bubbledClickEventHandler);
    // }

    // init();


import {loadItems} from '../services/data/itemStore.js';

export class Controller {
    constructor() {
        this.todoItemsTemplateCompiled = Handlebars.compile(document.getElementById('todoItemsTemplate').innerHTML);

        this.createItemButton = document.getElementById('createItemButton');
        this.backButton = document.getElementById('backButton');
        this.toogleStyleButton = document.getElementById('toogleStyleButton');
        this.filterNameButton = document.getElementById('filterNameButton');
        this.filterDueDateButton = document.getElementById('filterDueDateButton');
        this.filterCreationDateButton = document.getElementById('filterCreationDateButton');
        this.filterImportanceButton = document.getElementById('filterImportanceButton');
        this.filterCompletedButton = document.getElementById('filterCompletedButton');
        this.todoListContainer = document.getElementById('todoListContainer');
        this.addItemContainer = document.getElementById('addItemContainer');

    }

    showAnimals() {
        this.animalContainer.innerHTML = this.animalTemplateCompiled(
            {animals: animalService.animals},
            {allowProtoPropertiesByDefault: true});
    }

    showFood() {
        this.foodContainer.innerHTML = this.foodTemplateCompiled(
            {food: foodService.food},
            {allowProtoPropertiesByDefault: true});
    }

    initEventHandlers() {

        this.foodContainer.addEventListener('click', (event) => {
            const foodId = Number(event.target.dataset.foodId);

            if (!isNaN(foodId)) {
                event.target.setAttribute('disabled', true);

                foodService.orderFoodById(foodId);
                this.showFood();
                event.target.removeAttribute('disabled');
            }
        });

        this.animalContainer.addEventListener('click', (event) => {
            const animalId = Number(event.target.dataset.animalId);

            if (!isNaN(animalId)) {
                const feedingSucceeded = animalService.animals[animalId].feed(
                    {food: foodService.food, animals: animalService.animals},
                    () => this.renderZooView());

                if (feedingSucceeded) {
                    this.renderZooView();
                } else {
                    event.target.value = 'Feed (No foood!)';
                }
            }
        });

        this.newAnimalForm.addEventListener('submit', (event) => {
            const createAction = document.activeElement.dataset.action;
            if (document.activeElement && animalService[createAction]) {
                animalService[createAction](this.newAnimalName.value);
                this.showAnimals();
            }
            event.preventDefault();
        });
    }

    renderZooView() {
        this.showAnimals();
        this.showFood();
    }

    initialize() {
        this.initEventHandlers();
        foodService.loadData();
        this.renderZooView();
    }
}

// create one-and-only instance
new ZooController().initialize();


