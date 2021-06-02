import DenoBot from './wino/denoBot.js';
import { ENV } from './deps.js';
const { INTERVAL_TIME = 1 } = ENV;

const denoBot = new DenoBot();
const ping = await denoBot.ping;
denoBot.stratigy = "onlyRsis"
setInterval(async _ => {
    const options = {
        candeles: { symbol: "DOGEUSDT",inerval:"5m"}
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
            const tfx = (val) => parseFloat(val).toFixed(5)
            const message = `
${action === "Buy" ? "⤴️" : "⤵️"} action=${action}
symbol=${symbol}
price=${close}
rsi=${rsi}
stochRSI=${tfx(stochRSI)}
sma=${tfx(sma)}
ema=${tfx(ema)} 
stratigy=${stratigy}
`;
            denoBot.postMessageTelegram(message)
        } catch (error) {
            console.error(error)
        }
    }
    // denoBot.postMessageSlacK(action)
    console.log({ action, ...listenMyCoins })
}, INTERVAL_TIME * 1000)

