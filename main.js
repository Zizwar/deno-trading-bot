import DenoBot from './mod.js';
import { ENV } from './deps.js';
const { INTERVAL_TIME = 1 } = ENV;

const denoBot = new DenoBot();
const ping = await denoBot.ping;
console.log("isDenoBotConectToFutures=" + ping ? "conect denoBot :)" : "no conect denoBot :(")
denoBot.stratigy = "OnlyRsis";
//const balanceUSDT = await denoBot.getBalance("USDT");
//const balanceBUSD = await denoBot.getBalance("BUSD");
//console.info({balanceUSDT,balanceBUSD})
/*await denoBot.binance.futuresLeverage({
    symbol: 'BTCUSDT',
    leverage: 5,
})
*/
/*//spot
console.info(
   await denoBot.binance.order({
    symbol: 'BNBUSDT',
    side: 'SELL',
    //type:"MARKET",
    quantity: '0.05',
    price: '400',
  }))
  */
const tfx = (val) => +parseFloat(val).toFixed(5)
//const balanceUSDT = +(await denoBot.getBalance("USDT"));
//const quantity_ = balanceUSDT - balanceUSDT * 0.2;


const quantity = 0.3
/*
console.info(
    await denoBot.binance.futuresOrder({
        type: 'TAKE_PROFIT',
        symbol: 'BNBUSDT',
        side: 'SELL',
        //type:"MARKET",
        quantity,
        //price: '400',
       // callbackRate:  quantity - quantity * 0.2,//"STOP_LOSS",// STOP_LOSS, TAKE_PROFIT, TAKE_PROFIT_LIMIT.
         stopPrice:380,
        //activatePrice: 0.001 - 0.001 * 0.2,
    }).catch(console.error)
)
*/
//console.log(await denoBot.binance.withdrawHistory())
///*
function startDenoBot() {
    const _thisInterval = setInterval(async _ => {
        const options = {
            candeles: { symbol: "DOGEUSDT", interval: "5m" }
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
${action === "BUY" ? "⤴️" : "⤵️"} action=${action}
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
        const dataConnect = denoBot.dataConnect
        console.log({ action, dataConnect })
        if (dataConnect === "stop") {
            clearInterval(_thisInterval)
            console.warn('Stop  Deno Bot')
        }
        if (dataConnect === "play") {
            clearInterval(_thisInterval)
            startDenoBot();
            console.warn('Play  Deno Bot')
        } 
        //reset value
        denoBot.dataConnect = null;
        // denoBot.postMessageSlacK(action)
        //console.log({ action, ...listenMyCoins })
    }, INTERVAL_TIME * 5000)
}
startDenoBot();
//*/

