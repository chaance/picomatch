import pm from "../index.js";

console.log(pm.makeRe("(a|b|c)"));
console.log(pm.makeRe("!(a|b|c)"));
console.log(pm.makeRe("*(a|b|c)"));
console.log(pm.makeRe("+(a|b|c)"));
console.log(pm.makeRe("?(a|b|c)"));
console.log(pm.makeRe("@(a|b|c)"));
console.log("---");
console.log();

console.log(pm.makeRe("(a|b|c)", { noext: true }));
console.log(pm.makeRe("!(a|b|c)", { noext: true }));
console.log(pm.makeRe("*(a|b|c)", { noext: true }));
console.log(pm.makeRe("+(a|b|c)", { noext: true }));
console.log(pm.makeRe("?(a|b|c)", { noext: true }));
console.log(pm.makeRe("@(a|b|c)", { noext: true }));
console.log("---");
console.log();
