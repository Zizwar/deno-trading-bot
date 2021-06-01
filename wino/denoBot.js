import { Binance, Technicalindicators, Boll } from '../deps.js';

//console.info(await Binance.futuresCandles({ symbol: 'BTCUSDT' }));
const { SMA, EMA, BollingerBands, RSI, StochasticRSI } = Technicalindicators;

export default class DenoBot {

    constructor() {
        this.binance = Binance;
    }
    get ping() {
        return this.binance.time()
    }
    futuresCandles(args = []) {
        const { symbol = "BTCUSDT", interval = '5m', limit = 30 } = args
        return this.binance.futuresCandles({ symbol, interval, limit })
    }
    //
    async listenCoins(args = []) {
        try {
            const candles = await this.futuresCandles(args)
            /*
                    const [, , , , lastClose, , , , , ,] = candles[candles.length - 1];
                    const r = RSI.calculate({
                        period: 20, values: [34414.84, 34286.9, 34582.3,
                            34547.98, 34650.08, 34531.82,
                            34468.14, 34402.92, 34290.83,
                            34535.69, 34391.43, 34559.64,
                            34432.38, 34465.46, 34382.21,
                            34264.05, 34467.84, 34258.58,
                            34343.08, 34384.99, 34519.9,]
                    });
                    console.info({ r, lastClose })
                    return;
                    */
            const closesPrice = candles.map(({ close }) => close)
            //   console.log({closesPrice})

            const RS = RSI.calculate({ period: 5, values: closesPrice });//RSI({ period: 99, values: closesPrice })
            const SM = SMA.calculate({ period: 5, values: closesPrice });
            const EM = EMA.calculate({ period: 5, values: closesPrice });
            // const BB = BollingerBands.calculate({ period: 30, stdDev: 3, values: closesPrice });
            const BB = Boll(closesPrice, 30, 2)
           
            const inputStochRSI = {
                values: closesPrice,
                rsiPeriod: 9,
                stochasticPeriod: 5,
                kPeriod: 3,
                dPeriod: 3,
            };
            const _stochRSI = StochasticRSI.calculate(inputStochRSI);

            const lastArr = (val) => val?.slice(-1)[0] || []
            //const lowerAndUpperPriceBB = BB?.slice(-1) ;

            console.info(BB)
            const { stochRSI } = lastArr(_stochRSI) || undefined
            const resault = ({
                rsi: lastArr(RS),
                stochRSI,
                sma: lastArr(SM),
                ema: lastArr(EM),
                // upper,
                //lower,
                close: lastArr(closesPrice)
            })
            console.info(resault)
            return resault
            //console.info( await binance.futuresMarketBuy( 'BTCUSDT', 0.001 ) );
        }
        catch (error) {
            console.error("ERR:", error)
        }
    }
}
/*
const candlescandles = async (args: any = []) => {
    const { symbol = "BTCUSDT", interval = '5m', limit = 23 } = args as { symbol: string, interval: string, limit: number }
    // const hestory = await binance.promiseRequest('v1/time')
    //console.info(hestory)
    return new Promise((resolve_, reject_) => {
        binance.candlescandles(symbol, interval, (error: any, candles: any, symbols: any) => {
            if (error) return reject_(error);
            resolve_({ candles, symbols })

        }, { limit });
    })
    //console.info( await binance.futuresMarketBuy( 'BTCUSDT', 0.001 ) );
    //return;

}
*/


