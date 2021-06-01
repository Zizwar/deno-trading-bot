import DenoBot  from './wino/denoBot.js';

const denoBot = new DenoBot();
const ping = await denoBot.ping;
const coins = await denoBot.listenCoins()
console.log({ping},{coins})

