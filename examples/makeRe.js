import pm from "../index.js";

console.log(pm.makeRe("*"));
// /^(?:(?!\.)(?=.)[^\\\/]*?\/?)$/

console.log(pm.makeRe("*", { dot: true }));
// /^(?:(?!\.{1,2}(?:\/|$))(?=.)[^\\\/]*?\/?)$/
