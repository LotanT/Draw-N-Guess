'use strict';

import { DbService } from './db-service.js';

const KEY = 'canvas';

export const canvasService = {
    save,
    get,
    reset,
};

setCanvas()
async function setCanvas(){
    let canvas = await DbService.query(KEY)
    if(canvas.length === 0){
        canvas = [{img: ''}]
        await DbService.insert(KEY,canvas)
    }
}

async function save(canvasImg){
    let canvas = await DbService.query(KEY);
    canvas[0].img = canvasImg
    await DbService.put(KEY,canvas[0])
}

async function get() {
    let canvas = await DbService.query(KEY);
    return canvas[0].img
}

async function reset() {
    let canvas = await DbService.query(KEY);
    canvas[0].img = ''
    await DbService.put(KEY,canvas[0])
}
