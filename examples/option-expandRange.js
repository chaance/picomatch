import fill from "fill-range";
import pm from "../index.js";
const regex = pm.makeRe("foo/{01..25}/bar", {
  expandRange(a, b) {
    return `(${fill(a, b, { toRegex: true })})`;
  },
});

console.log(regex);
//=> /^(?:foo\/((?:0[1-9]|1[0-9]|2[0-5]))\/bar)$/

console.log(regex.test("foo/00/bar")); // false
console.log(regex.test("foo/01/bar")); // true
console.log(regex.test("foo/10/bar")); // true
console.log(regex.test("foo/22/bar")); // true
console.log(regex.test("foo/25/bar")); // true
console.log(regex.test("foo/26/bar")); // false
