export class ItemStore {
    constructor() {
        this.todoItems = [
            {
                id: 1, title: 'aufräumen', description: 'Wohnung aufräumen', creationDate: '2000-01-01', dueDate: '2000-01-14', importance: 1, finished: false,
            },
            {
                id: 2, title: 'kochen', description: 'Pizza kochen', creationDate: '2000-02-01', dueDate: '2000-02-28', importance: 2, finished: false,
            },
            {
                id: 3, title: 'Wäsche waschen', description: 'Rote Pulli ist schmutzig', creationDate: '2000-03-01', dueDate: '2000-04-01', importance: 3, finished: true,
            },
            {
                id: 4, title: 'Netflix schauen', description: 'Friends fertig schauen', creationDate: '2000-11-01', dueDate: '2000-12-01', importance: 5, finished: false,
            }
        ];
    }

    loadItems() {
        return this.todoItems;
    }

    update(title, description, dueDate, importance, finished, creationDate, id){
        this.todoItems = this.todoItems.map(item => item.id !== id ? item : this.getTodoItemFromFormData(title, description, dueDate, importance, finished, creationDate, id));
    }

    add(title, description, dueDate, importance, finished){
        this.todoItems.push(this.getTodoItemFromFormData(title, description, dueDate, importance, finished, new Date(), this.todoItems.length + 1));
    }

    getTodoItemFromFormData(title, description, dueDate, importance, finished, creationDate, id){
        return {
                    id: id || undefined, 
                    title: title || undefined, 
                    description: description || undefined, 
                    creationDate: creationDate || undefined, 
                    dueDate: dueDate || undefined, 
                    importance: importance || undefined, 
                    finished: finished || false
                };
    }
}