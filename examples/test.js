import pm from "../index.js";

console.log(pm.test("foo/bar", /^(?:([^/]*?)\/([^/]*?))$/));
// { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
