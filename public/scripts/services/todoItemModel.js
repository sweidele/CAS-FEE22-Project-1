import {loadItems} from '../services/data/itemStore.js';


function itemsSortedByName() {
    return [...loadItems].sort(item1, item2 => item1.name - item2.name);
}

function itemsSortedByDueDate() {
    return [...loadItems].sort(item1, item2 => item1.dueDate - item2.dueDate);
}

function itemsSortedBCreationDate() {
    return [...loadItems].sort(item1, item2 => item1.creationDate - item2.creationDate);
}

function itemsSortedByImportance() {
    return [...loadItems].sort(item1, item2 => item1.importance - item2.importance);
}

function itemsCompleated() {
    return [...loadItems].filter(item => item.finished === true);
}

        // id: 1, title: 'aufräumen', descriptoon: 'Wohnung aufräumen', creationDate: '1.1.2000', dueDate: '1.1.2000', importance: 3, finished: false,

// function compareSongs(s1, s2) {
//   return s2.rating - s1.rating;
// }
export default {itemsSortedByName, songsSorted};
