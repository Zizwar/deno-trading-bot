import { BinanceApi, Technicalindicators, SlackApi, ENV } from '../deps.js';
import * as Stratigy from './stratigy/index.js'
import TelegramBot from "../lib/telegram.js";
const { API_KEY_BINANCE, API_SECRET_BINANCE, TOKEN_SLACK, CHANEL_SLACK, ID_CHAT_TELEGRAM } = ENV;
//console.info(await Binance.futuresCandles({ symbol: 'BTCUSDT' }));
const { SMA, EMA, BollingerBands, RSI, StochasticRSI } = Technicalindicators;

export default class DenoBot {
    constructor(props) {
        const { API_KEY_BINANCE, API_SECRET_BINANCE, TOKEN_SLACK, CHANEL_SLACK, ID_CHAT_TELEGRAM } = props || ENV;
        this._stratigy = "OnlyRsis";
        //
        this._binance = BinanceApi({
            apiKey: API_KEY_BINANCE,
            apiSecret: API_SECRET_BINANCE,
            useServerTime: true,
            test: true
        });
        //
        this.slack = new SlackApi(TOKEN_SLACK);
        this._dataConnect = [];
        this._telegramBot = TelegramBot(this);
        
    }
    async getBalance(symbol = "USDT") {
        const balancFutures = await this._binance.futuresAccountBalance();
        return +balancFutures?.find(({ asset }) => asset === symbol)?.balance || [];
    }
    postMessageSlacK(text) {
        this.slack.chat.postMessage({
            channel: CHANEL_SLACK,
            text
        })
    }
    postMessageTelegram(text) {
        return this._telegramBot.telegram.sendMessage({
            chat_id: ID_CHAT_TELEGRAM,
            text,
        })
    }
    //deno binance api from node-binance-api
    get ping() {
        return this._binance.futuresPing()
    }
    get binance() {
        return this._binance;
    }

    futuresCandles(args = []) {
        const { symbol = "BTCUSDT", interval = '5m', limit = 30 } = args
        return this._binance.futuresCandles({ symbol, interval, limit })
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

            //console.info(lowerAndUpperPriceBB)
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
    set dataConnect(_dataConnect) {
        this.__dataConnect = _dataConnect
    }
    get dataConnect() {
        return this.__dataConnect
    }
    action(properties) {
        return Stratigy[this._stratigy](properties)
    }
}



