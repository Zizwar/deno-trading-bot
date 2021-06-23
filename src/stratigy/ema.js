let action = "wait...";
export const Ema = (args = []) => {
    const {
        rsi,
        upper,
        lower,
        sma,
        ema,
        close,
        stochRSI } = args
    //  console.log({ close, upper, lower, rsi ,ema})

    if (close >= upper && close < ema) {
        //if (close >= upper && close < ema)   
        action = "SELL";
        return action;
    }

    if (close <= lower && close > ema) {
        action = "BUY";
        return action;
    }
    action = false;
    return action;
}