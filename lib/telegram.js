
import { TelegramBot, ENV } from "../deps.js";
const { TOKEN_TELEGRAM } = ENV;
export default (hooks) => {
    const bot = new TelegramBot(TOKEN_TELEGRAM);
    // Error handler
    bot.use(async (ctx, next) => {
        try {
            await next(ctx);
        } catch (err) {
            console.error(err.message);
        }
    });

    bot.on("text", async (ctx) => {
        const text = ctx.message?.text;

        //console.info(ctx.message)
        /*
        {
          message_id: 64,
          from: {
            id: 1664500170,
            is_bot: false,
            first_name: "Bot",
            last_name: "Js",
            username: "bot_js",
            language_code: "fr"
          },
          chat: {
            id: 1664500170,
            first_name: "Bot",
            last_name: "Js",
            username: "bot_js",
            type: "private"
          },
          date: 1622945574,
          text: "hfhghh"
        }
        */
        if (text === "/start") {
            hooks.dataConnect = text;
            await ctx.reply("HI, Im Deno Trading Bot \n https://github.com/Zizwar/deno-trading-bot");
        }

        if (text === "/stars" || text === "/stars@DenoBot")
            await ctx.reply(`Stars: :star:`);

        const has = (val) => text.includes(val)
        if (has('$sudo')) {

            if (has("buy"))
                hooks.dataConnect = 'BUY';
                
            if (has("stop"))
                hooks.dataConnect = "stop"
            if (has("play"))
                hooks.dataConnect = "play"
        }

    });

    bot.launch();
    return bot;
}
