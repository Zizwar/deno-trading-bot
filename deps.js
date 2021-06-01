import { config } from "https://deno.land/x/dotenv/mod.ts";
export const ENV = config();
//
export * as Technicalindicators from 'https://esm.sh/technicalindicators';
const { APIKEY, APISECRET } = ENV;

import binanceApi from 'https://esm.sh/binance-api-node';

export const Binance = binanceApi({
    apiKey: APIKEY,
    apiSecret: APISECRET,

})

