import DenoBot from './mod.js';
import { ENV } from './deps.js';
const { INTERVAL_TIME = 1 } = ENV;

const denoBot = new DenoBot();
const ping = await denoBot.ping;
denoBot.stratigy = "onlyRsis";
//const balanceUSDT = await denoBot.getBalance("USDT");
//const balanceBUSD = await denoBot.getBalance("BUSD");
//console.info({balanceUSDT,balanceBUSD})
console.info(await denoBot.binance.futuresLeverage({
    symbol: 'BTCBUSD',
    leverage: 5,
}))
//console.log(await denoBot.binance.withdrawHistory())
/*
setInterval(async _ => {
    const options = {
        candeles: { symbol: "DOGEUSDT",interval:"3m" }
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

//*/

