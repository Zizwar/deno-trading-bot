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
    if (action) {
        try {
            const {
                symbol,
                rsi,
                stochRSI,
                sma,
                ema,
                upper,
                lower,
                close,
                stratigy
            } = listenMyCoins;
            denoBot.postMessageTelegram(`
            ${action === "Buy" ? "⤴️" : "⤵️"} action=${action}\n
            symbol=${symbol}\n
            price=${close}\n
            rsi=${rsi}\n
            stochRSI=${stochRSI}\n
            sma=${sma}\n
            ema=${ema}\n 
            stratigy=${stratigy}\n
           `)
        } catch (error) {
            console.error(error)
        }


    }
    // denoBot.postMessageSlacK(action)
    console.log({ action, ...listenMyCoins })
}, 7000)

