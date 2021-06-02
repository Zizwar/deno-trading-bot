let action = "wait...";
export const OnlyRsis = (args = []) => {
    const {
        rsi,
        upper,
        lower,
        sma,
        ema,
        close,
        stochRSI } = args
    //  console.log({ close, upper, lower, rsi ,ema})

    if (
        // close >= upper &&
        rsi > 65
        && stochRSI > 70
        && action !== "Sell"
    ) {
        //if (close >= upper && close < ema)   
        action = "Sell";
        return action;
    }

    // if (close <= lower && close > ema)
    if (
        //  close <= lower &&
        rsi < 45
        && stochRSI < 30
        && action !== "Buy"
    ) {
        action = "Buy";
        return action;
    }
    action = false;
    return action;
}