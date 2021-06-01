import { BinanceApi, Technicalindicators, SlackApi, ENV } from '../deps.js';
import { OnlyRsis } from './stratigy/index.js'
import {bot as TelegramBot  } from "../lib/telegram.js";
const { APIKEY, APISECRET, TOKEN_SLACK, CHANEL_SLACK } = ENV;
//console.info(await Binance.futuresCandles({ symbol: 'BTCUSDT' }));
const { SMA, EMA, BollingerBands, RSI, StochasticRSI } = Technicalindicators;

export default class DenoBot {
    constructor() {
        this._stratigy = "onlyRsis"
        //
        this.binance = BinanceApi({
            apiKey: APIKEY,
            apiSecret: APISECRET,
            useServerTime: true,
            test: true
        });
        //
        this.slack = new SlackApi(TOKEN_SLACK)
        this.telegram =  TelegramBot


    }
     postMessageSlacK(text) {
         this.slack.chat.postMessage({
            channel: CHANEL_SLACK,
            text
        })
    }
       postMessageTelegram(text) {
         this.slack.chat.postMessage({
            channel: CHANEL_SLACK,
            text
        })
    }
    get ping() {
        return this.binance.time()
    }
    futuresCandles(args = []) {
        const { symbol = "BTCUSDT", interval = '1m', limit = 30 } = args
        return this.binance.futuresCandles({ symbol, interval, limit })
    }

    async listenCoins(args = []) {
        const { candeles: optionCandeles = [], indicator = [] } = args;
        try {
            const candles = await this.futuresCandles(optionCandeles);
            const closesPrice = candles.map(({ close }) => +close)
            //console.log({closesPrice})
            const { rsi = [], sma = [], ema = [], bb = [] } = indicator;
            const { period: rsiPeriod = 5 } = rsi;
            const { period: smaPeriod = 5 } = sma;
            const { period: emaPeriod = 5 } = ema;
            const { period: bbPeriod = 5, stdDev: bbStdDev = 3 } = bb;

            const RS = RSI.calculate({ period: rsiPeriod, values: closesPrice });
            const SM = SMA.calculate({ period: smaPeriod, values: closesPrice });
            const EM = EMA.calculate({ period: emaPeriod, values: closesPrice });
            const BB = BollingerBands.calculate({ period: bbPeriod, stdDev: bbStdDev, values: closesPrice });

            const inputStochRSI = {
                values: closesPrice,
                rsiPeriod: 9,
                stochasticPeriod: 5,
                kPeriod: 3,
                dPeriod: 3,
            };
            const _stochRSI = StochasticRSI.calculate(inputStochRSI);

            const lastArr = (val) => val?.slice(-1)[0] || []
            const lowerAndUpperPriceBB = BB?.slice(-1) || [];

            console.info(lowerAndUpperPriceBB)
            const [{ upper = NaN, lower = NaN }] = lowerAndUpperPriceBB;
            const { stochRSI } = lastArr(_stochRSI) || NaN;
            const { symbol } = optionCandeles;
            const properties = ({
                symbol,
                rsi: lastArr(RS),
                stochRSI,
                sma: lastArr(SM),
                ema: lastArr(EM),
                upper,
                lower,
                close: lastArr(closesPrice),
                stratigy: this._stratigy
            })
            return properties;
            //console.info(resault)
            /*
                        switch (this._stratigy) {
                            case "onlyRsis": return OnlyRsis(properties);
                                break;
                            case "9mr": return OnlyRsis(properties);
                                break;
                            default: return OnlyRsis(properties);
                                break;
                        }
            */
            //console.info( await binance.futuresMarketBuy( 'BTCUSDT', 0.001 ) );
        }
        catch (error) {
            console.error("ERR:", error)
        }
    }
    set stratigy(stratigy) {
        this._stratigy = stratigy
    }
    get stratigy() {
        return this._stratigy
    }
    action(properties) {
        switch (this._stratigy) {
            case "onlyRsis": return OnlyRsis(properties);
                break;
            case "9mr": return OnlyRsis(properties);
                break;
            default: return OnlyRsis(properties);
                break;
        }
    }
}



