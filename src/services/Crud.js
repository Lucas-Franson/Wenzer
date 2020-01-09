import {db} from '../services/Config';

function addItem (item, table) {
    db.ref('/' + table).push({
        name: item
    });
}

export {
    addItem
}
