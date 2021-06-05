import DenoBot from './mod.js';
import { ENV } from './deps.js';
const { INTERVAL_TIME = 1 } = ENV;

const denoBot = new DenoBot();
const ping = await denoBot.ping;
denoBot.stratigy = "onlyRsis";
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

