import { config } from "https://deno.land/x/dotenv/mod.ts";
export const ENV = config();
//
export * as technicalindicators from 'https://esm.sh/technicalindicators';
const { APIKEY, APISECRET } = ENV;

import Binance from 'https://esm.sh/binance-api-node';

export const binance = Binance({
  apiKey: APIKEY,
  apiSecret: APISECRET,
  
})


const candlesticks = async (args=[]) => {
    const { symbol = "BTCUSDT", interval = '5m', limit = 23 } = args 
    // const hestory = await binance.promiseRequest('v1/time')
    //console.info(hestory)
    return new Promise((resolve_, reject_) => {
        binance.candles(symbol, interval, (error, ticks, symbols) => {
            if (error) return reject_(error);
            resolve_({ ticks, symbols })

        }, { limit });
    })
    //console.info( await binance.futuresMarketBuy( 'BTCUSDT', 0.001 ) );
    //return;

}

console.info(await binance.futuresCandles({ symbol: 'BTCUSDT',interval:"5m" }))
// console.log(await binance.time())
/*
//binance API Node
import Binance from 'https://esm.sh/node-binance-api';
const { APIKEY, APISECRET } = ENV;
console.log({ENV})
export const binance = new Binance().options({
    APIKEY,
    APISECRET,
    useServerTime: true,
    test: true

});
//

*/
