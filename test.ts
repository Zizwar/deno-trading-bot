//technicalindicators
import {SMA} from 'https://esm.sh/technicalindicators'
//deno run --allow-net --allow-env --allow-read .\app.ts
console.info(SMA.calculate({period : 5, values : [1,2,3,4,5,6,7,8,9]}))