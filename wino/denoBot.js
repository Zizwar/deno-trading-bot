import { Binance } from '../deps.js';

//console.info(await Binance.futuresCandles({ symbol: 'BTCUSDT' }));

export default class DenoBot {

    constructor(){
        this.Binance = Binance;
    }
    get time(){
         return Binance.time()
    }
}
/*
const candlesticks = async (args: any = []) => {
    const { symbol = "BTCUSDT", interval = '5m', limit = 23 } = args as { symbol: string, interval: string, limit: number }
    // const hestory = await binance.promiseRequest('v1/time')
    //console.info(hestory)
    return new Promise((resolve_, reject_) => {
        binance.candlesticks(symbol, interval, (error: any, ticks: any, symbols: any) => {
            if (error) return reject_(error);
            resolve_({ ticks, symbols })

        }, { limit });
    })
    //console.info( await binance.futuresMarketBuy( 'BTCUSDT', 0.001 ) );
    //return;

}
*/


