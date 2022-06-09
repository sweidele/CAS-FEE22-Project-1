const todoItems = [
    {
        id: 1, name: 'aufräumen', descriptoon: 'Wohnung aufräumen', creationDate: '1.1.2000', dueDate: '1.1.2000', importance: 3, finished: false,
    },
    {
        id: 2, name: 'kochen', descriptoon: 'Pizza kochen', creationDate: '1.2.2000', dueDate: '28.2.2000', importance: 3, finished: false,
    },
    {
        id: 3, name: 'Wäsche waschen', descriptoon: 'Rote Pulli ist schmutzig', creationDate: '1.3.2000', dueDate: '1.4.2000', importance: 3, finished: false,
    },
    {
        id: 4, name: 'Netflix schauen', descriptoon: 'Friends fertig schauen', creationDate: '1.11.2000', dueDate: '1.12.2000', importance: 3, finished: false,
    },
];
function loadItems() {
    return [...todoItems];
}

export default { loadItems };
