import DenoBot  from './wino/denoBot.js';

const denoBot = new DenoBot();
const time = await denoBot.time;
console.log({time})

