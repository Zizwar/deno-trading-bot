import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import DenoBot from './mod.js';

const denoBot = new DenoBot();
const ping = await denoBot.ping;
Deno.test("deno tading bot is conect to binance", () => {
    assertEquals(ping, true);
});

