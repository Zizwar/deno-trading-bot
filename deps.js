import { config } from "https://deno.land/x/dotenv/mod.ts";
export const ENV = config();
import binanceApi from 'https://esm.sh/binance-api-node';
//
export * as Technicalindicators from 'https://esm.sh/technicalindicators';
import Boll from 'https://esm.sh/bollinger-bands'



///
const { APIKEY, APISECRET } = ENV;
const Binance = binanceApi({
    apiKey: APIKEY,
    apiSecret: APISECRET,

})
export { Boll, Binance }

