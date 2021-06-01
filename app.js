import DenoBot from './wino/denoBot.js';

const denoBot = new DenoBot();
const ping = await denoBot.ping;
denoBot.stratigy = "onlyRsis"
setInterval(async _ => {
    const options = {
        candeles: { symbol: "DOGEUSDT" }
    }
    const listenMyCoins = await denoBot.listenCoins(options);
    const action = denoBot.action(listenMyCoins);
    denoBot.postMessageSlacK(action)
    console.log({ action, ...listenMyCoins })
}, 7000)

