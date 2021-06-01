
import { TelegramBot, ENV } from "../deps.js";
const { ID_TELEGRAM, TOKEN_TELEGRAM } = ENV;

export const bot = new TelegramBot(TOKEN_TELEGRAM);
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

    if (text === "/start") {
        await ctx.reply("hello, Im DenoTradBot");
    }

    if (text === "/stars" || text === "/stars@DenoBot") {

        await ctx.reply(`Stars: :star:`);
    }

});

bot.launch();
