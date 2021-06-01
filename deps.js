import { config } from "https://deno.land/x/dotenv/mod.ts";

import BinanceApi from 'https://esm.sh/binance-api-node';
import { WebClient as SlackApi } from "https://deno.land/x/slack_web_api@1.0.3/mod.ts"
import { Bot as TelegramBot } from "https://deno.land/x/telegram@v0.0.3/mod.ts";

import * as Technicalindicators from 'https://esm.sh/technicalindicators';
const ENV = config();
export { BinanceApi, SlackApi,Technicalindicators,TelegramBot,ENV }

