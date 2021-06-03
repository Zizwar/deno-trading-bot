[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/Zizwar/deno-trad-bot)
# deno-trade-bot
deno trading bot
v0.1.3-alpha

1- https://deno.land/#installation

2- clone: 
```sh 
git clone https://github.com/Zizwar/deno-trad-bot.git 
```

3- rename file .env.exemple to .env and set  
```sh 
TOKEN_TELEGRAM = 
ID_TELEGRAM = 
TOKEN_SLACK =
SHANEL_SLACK =
API_KEY_BINANCE = 
API_SECRET_BINANCE = 
INTERVAL_TIME = 
```

4- run in terminal
```sh
deno run --allow-net --allow-env --allow-read app.js
```
## exemple

```ts
import DenoBot from './wino/denoBot.js';
import { ENV } from './deps.js';
const { INTERVAL_TIME = 1 } = ENV;

const denoBot = new DenoBot();
const ping = await denoBot.ping;
denoBot.stratigy = "onlyRsis"
setInterval(async _ => {
    const options = {
        candeles: { symbol: "DOGEUSDT" }
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
```
##  API (Incoming)
https://ibrahim.contact
