'use strict';

import { utils } from './utils.service.js';

export const DbService = {
    query,
    get,
    delete: remove,
    post,
    put,
    insert
};

const ID_FIELD = '_id';

function query(collectionName) {
    let collection = utils.loadFromStorage(collectionName);
    if (!collection) collection = [];
    return Promise.resolve(collection);
}

async function get(collectionName, id) {
    let collection = await query(collectionName);
    return collection.find(curr => curr[ID_FIELD] === id);
}

async function remove(collectionName, id) {
    let collection = await query(collectionName);
    let idx = collection.findIndex(curr => curr[ID_FIELD] === id);
    if (idx === -1) throw new Error('something went wrong');
    collection.splice(idx, 1);

    utils.storeToStorage(collectionName, collection);
    return Promise.resolve();
}

async function post(collectionName, item) {
    let collection = await query(collectionName);
    item[ID_FIELD] = utils.getRandomId();
    collection.push(item);

    utils.storeToStorage(collectionName, collection);
    return Promise.resolve(item);
}

async function put(collectionName, item) {
    let collection = await query(collectionName);
    let idx = collection.findIndex(curr => curr[ID_FIELD] === item[ID_FIELD]);
    if (idx === -1) throw new Error('something went wrong');
    collection[idx] = item;

    utils.storeToStorage(collectionName, collection);
    return Promise.resolve(item);
}

async function insert(collectionName, items) {
    let collection = await query(collectionName);
    items.forEach(curr => curr[ID_FIELD] = utils.getRandomId());
    collection.push(...items);

    utils.storeToStorage(collectionName, collection);
    return Promise.resolve();
}
