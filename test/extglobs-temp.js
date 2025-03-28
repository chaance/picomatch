import assert from "node:assert";
import pm from "../index.js";
const { isMatch } = pm;

/**
 * Some of tests were converted from bash 4.3, 4.4, and minimatch unit tests.
 * This is called "temp" as a reminder to reorganize these test and remove duplicates.
 */

describe("extglobs", () => {
  describe("bash", () => {
    it("should match extended globs from the bash spec:", () => {
      assert(isMatch("bar", "!(foo)", { windows: true }));
      assert(isMatch("f", "!(foo)", { windows: true }));
      assert(isMatch("fa", "!(foo)", { windows: true }));
      assert(isMatch("fb", "!(foo)", { windows: true }));
      assert(isMatch("ff", "!(foo)", { windows: true }));
      assert(isMatch("fff", "!(foo)", { windows: true }));
      assert(isMatch("fo", "!(foo)", { windows: true }));
      assert(!isMatch("foo", "!(foo)", { windows: true }));
      assert(!isMatch("foo/bar", "!(foo)", { windows: true }));
      assert(!isMatch("foo/bar", "!(foo)/*", { windows: true }));
      assert(isMatch("foobar", "!(foo)", { windows: true }));
      assert(isMatch("foot", "!(foo)", { windows: true }));
      assert(isMatch("foox", "!(foo)", { windows: true }));
      assert(isMatch("o", "!(foo)", { windows: true }));
      assert(isMatch("of", "!(foo)", { windows: true }));
      assert(isMatch("ooo", "!(foo)", { windows: true }));
      assert(isMatch("ox", "!(foo)", { windows: true }));
      assert(isMatch("x", "!(foo)", { windows: true }));
      assert(isMatch("xx", "!(foo)", { windows: true }));

      assert(!isMatch("bar", "!(!(foo))", { windows: true }));
      assert(!isMatch("f", "!(!(foo))", { windows: true }));
      assert(!isMatch("fa", "!(!(foo))", { windows: true }));
      assert(!isMatch("fb", "!(!(foo))", { windows: true }));
      assert(!isMatch("ff", "!(!(foo))", { windows: true }));
      assert(!isMatch("fff", "!(!(foo))", { windows: true }));
      assert(!isMatch("fo", "!(!(foo))", { windows: true }));
      assert(isMatch("foo", "!(!(foo))", { windows: true }));
      assert(isMatch("foo/bar", "!(!(bar)/baz)", { windows: true }));
      assert(!isMatch("foo/bar", "!(!(foo))", { windows: true }));
      assert(!isMatch("foobar", "!(!(foo))", { windows: true }));
      assert(!isMatch("foot", "!(!(foo))", { windows: true }));
      assert(!isMatch("foox", "!(!(foo))", { windows: true }));
      assert(!isMatch("o", "!(!(foo))", { windows: true }));
      assert(!isMatch("of", "!(!(foo))", { windows: true }));
      assert(!isMatch("ooo", "!(!(foo))", { windows: true }));
      assert(!isMatch("ox", "!(!(foo))", { windows: true }));
      assert(!isMatch("x", "!(!(foo))", { windows: true }));
      assert(!isMatch("xx", "!(!(foo))", { windows: true }));

      assert(isMatch("bar", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("f", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("fa", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("fb", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("ff", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("fff", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("fo", "!(!(!(foo)))", { windows: true }));
      assert(!isMatch("foo", "!(!(!(foo)))", { windows: true }));
      assert(!isMatch("foo/bar", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("foobar", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("foot", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("foox", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("o", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("of", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("ooo", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("ox", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("x", "!(!(!(foo)))", { windows: true }));
      assert(isMatch("xx", "!(!(!(foo)))", { windows: true }));

      assert(!isMatch("bar", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("f", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("fa", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("fb", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("ff", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("fff", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("fo", "!(!(!(!(foo))))", { windows: true }));
      assert(isMatch("foo", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("foo/bar", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("foot", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("o", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("of", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("ooo", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("ox", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("x", "!(!(!(!(foo))))", { windows: true }));
      assert(!isMatch("xx", "!(!(!(!(foo))))", { windows: true }));

      assert(!isMatch("bar", "!(!(foo))*", { windows: true }));
      assert(!isMatch("f", "!(!(foo))*", { windows: true }));
      assert(!isMatch("fa", "!(!(foo))*", { windows: true }));
      assert(!isMatch("fb", "!(!(foo))*", { windows: true }));
      assert(!isMatch("ff", "!(!(foo))*", { windows: true }));
      assert(!isMatch("fff", "!(!(foo))*", { windows: true }));
      assert(!isMatch("fo", "!(!(foo))*", { windows: true }));
      assert(isMatch("foo", "!(!(foo))*", { windows: true }));
      assert(isMatch("foobar", "!(!(foo))*", { windows: true }));
      assert(isMatch("foot", "!(!(foo))*", { windows: true }));
      assert(isMatch("foox", "!(!(foo))*", { windows: true }));
      assert(!isMatch("o", "!(!(foo))*", { windows: true }));
      assert(!isMatch("of", "!(!(foo))*", { windows: true }));
      assert(!isMatch("ooo", "!(!(foo))*", { windows: true }));
      assert(!isMatch("ox", "!(!(foo))*", { windows: true }));
      assert(!isMatch("x", "!(!(foo))*", { windows: true }));
      assert(!isMatch("xx", "!(!(foo))*", { windows: true }));

      assert(isMatch("bar", "!(f!(o))", { windows: true }));
      assert(!isMatch("f", "!(f!(o))", { windows: true }));
      assert(!isMatch("fa", "!(f!(o))", { windows: true }));
      assert(!isMatch("fb", "!(f!(o))", { windows: true }));
      assert(!isMatch("ff", "!(f!(o))", { windows: true }));
      assert(!isMatch("fff", "!(f!(o))", { windows: true }));
      assert(isMatch("fo", "!(f!(o))", { windows: true }));
      assert(isMatch("foo", "!(!(foo))", { windows: true }));
      assert(!isMatch("foo", "!(f)!(o)!(o)", { windows: true }));
      assert(isMatch("foo", "!(fo)", { windows: true }));
      assert(isMatch("foo", "!(f!(o)*)", { windows: true }));
      assert(!isMatch("foo", "!(f!(o))", { windows: true }));
      assert(!isMatch("foo/bar", "!(f!(o))", { windows: true }));
      assert(!isMatch("foobar", "!(f!(o))", { windows: true }));
      assert(isMatch("o", "!(f!(o))", { windows: true }));
      assert(isMatch("of", "!(f!(o))", { windows: true }));
      assert(isMatch("ooo", "!(f!(o))", { windows: true }));
      assert(isMatch("ox", "!(f!(o))", { windows: true }));
      assert(isMatch("x", "!(f!(o))", { windows: true }));
      assert(isMatch("xx", "!(f!(o))", { windows: true }));

      assert(isMatch("bar", "!(f(o))", { windows: true }));
      assert(isMatch("f", "!(f(o))", { windows: true }));
      assert(isMatch("fa", "!(f(o))", { windows: true }));
      assert(isMatch("fb", "!(f(o))", { windows: true }));
      assert(isMatch("ff", "!(f(o))", { windows: true }));
      assert(isMatch("fff", "!(f(o))", { windows: true }));
      assert(!isMatch("fo", "!(f(o))", { windows: true }));
      assert(isMatch("foo", "!(f(o))", { windows: true }));
      assert(!isMatch("foo/bar", "!(f(o))", { windows: true }));
      assert(isMatch("foobar", "!(f(o))", { windows: true }));
      assert(isMatch("foot", "!(f(o))", { windows: true }));
      assert(isMatch("foox", "!(f(o))", { windows: true }));
      assert(isMatch("o", "!(f(o))", { windows: true }));
      assert(isMatch("of", "!(f(o))", { windows: true }));
      assert(isMatch("ooo", "!(f(o))", { windows: true }));
      assert(isMatch("ox", "!(f(o))", { windows: true }));
      assert(isMatch("x", "!(f(o))", { windows: true }));
      assert(isMatch("xx", "!(f(o))", { windows: true }));

      assert(isMatch("bar", "!(f)", { windows: true }));
      assert(!isMatch("f", "!(f)", { windows: true }));
      assert(isMatch("fa", "!(f)", { windows: true }));
      assert(isMatch("fb", "!(f)", { windows: true }));
      assert(isMatch("ff", "!(f)", { windows: true }));
      assert(isMatch("fff", "!(f)", { windows: true }));
      assert(isMatch("fo", "!(f)", { windows: true }));
      assert(isMatch("foo", "!(f)", { windows: true }));
      assert(!isMatch("foo/bar", "!(f)", { windows: true }));
      assert(isMatch("foobar", "!(f)", { windows: true }));
      assert(isMatch("foot", "!(f)", { windows: true }));
      assert(isMatch("foox", "!(f)", { windows: true }));
      assert(isMatch("o", "!(f)", { windows: true }));
      assert(isMatch("of", "!(f)", { windows: true }));
      assert(isMatch("ooo", "!(f)", { windows: true }));
      assert(isMatch("ox", "!(f)", { windows: true }));
      assert(isMatch("x", "!(f)", { windows: true }));
      assert(isMatch("xx", "!(f)", { windows: true }));

      assert(isMatch("bar", "!(f)", { windows: true }));
      assert(!isMatch("f", "!(f)", { windows: true }));
      assert(isMatch("fa", "!(f)", { windows: true }));
      assert(isMatch("fb", "!(f)", { windows: true }));
      assert(isMatch("ff", "!(f)", { windows: true }));
      assert(isMatch("fff", "!(f)", { windows: true }));
      assert(isMatch("fo", "!(f)", { windows: true }));
      assert(isMatch("foo", "!(f)", { windows: true }));
      assert(!isMatch("foo/bar", "!(f)", { windows: true }));
      assert(isMatch("foobar", "!(f)", { windows: true }));
      assert(isMatch("foot", "!(f)", { windows: true }));
      assert(isMatch("foox", "!(f)", { windows: true }));
      assert(isMatch("o", "!(f)", { windows: true }));
      assert(isMatch("of", "!(f)", { windows: true }));
      assert(isMatch("ooo", "!(f)", { windows: true }));
      assert(isMatch("ox", "!(f)", { windows: true }));
      assert(isMatch("x", "!(f)", { windows: true }));
      assert(isMatch("xx", "!(f)", { windows: true }));

      assert(isMatch("bar", "!(foo)", { windows: true }));
      assert(isMatch("f", "!(foo)", { windows: true }));
      assert(isMatch("fa", "!(foo)", { windows: true }));
      assert(isMatch("fb", "!(foo)", { windows: true }));
      assert(isMatch("ff", "!(foo)", { windows: true }));
      assert(isMatch("fff", "!(foo)", { windows: true }));
      assert(isMatch("fo", "!(foo)", { windows: true }));
      assert(!isMatch("foo", "!(foo)", { windows: true }));
      assert(!isMatch("foo/bar", "!(foo)", { windows: true }));
      assert(isMatch("foobar", "!(foo)", { windows: true }));
      assert(isMatch("foot", "!(foo)", { windows: true }));
      assert(isMatch("foox", "!(foo)", { windows: true }));
      assert(isMatch("o", "!(foo)", { windows: true }));
      assert(isMatch("of", "!(foo)", { windows: true }));
      assert(isMatch("ooo", "!(foo)", { windows: true }));
      assert(isMatch("ox", "!(foo)", { windows: true }));
      assert(isMatch("x", "!(foo)", { windows: true }));
      assert(isMatch("xx", "!(foo)", { windows: true }));

      assert(isMatch("bar", "!(foo)*", { windows: true }));
      assert(isMatch("f", "!(foo)*", { windows: true }));
      assert(isMatch("fa", "!(foo)*", { windows: true }));
      assert(isMatch("fb", "!(foo)*", { windows: true }));
      assert(isMatch("ff", "!(foo)*", { windows: true }));
      assert(isMatch("fff", "!(foo)*", { windows: true }));
      assert(isMatch("fo", "!(foo)*", { windows: true }));
      assert(!isMatch("foo", "!(foo)*", { windows: true }));
      assert(!isMatch("foo/bar", "!(foo)*", { windows: true }));
      assert(!isMatch("foobar", "!(foo)*", { windows: true }));
      assert(!isMatch("foot", "!(foo)*", { windows: true }));
      assert(!isMatch("foox", "!(foo)*", { windows: true }));
      assert(isMatch("o", "!(foo)*", { windows: true }));
      assert(isMatch("of", "!(foo)*", { windows: true }));
      assert(isMatch("ooo", "!(foo)*", { windows: true }));
      assert(isMatch("ox", "!(foo)*", { windows: true }));
      assert(isMatch("x", "!(foo)*", { windows: true }));
      assert(isMatch("xx", "!(foo)*", { windows: true }));

      assert(isMatch("bar", "!(x)", { windows: true }));
      assert(isMatch("f", "!(x)", { windows: true }));
      assert(isMatch("fa", "!(x)", { windows: true }));
      assert(isMatch("fb", "!(x)", { windows: true }));
      assert(isMatch("ff", "!(x)", { windows: true }));
      assert(isMatch("fff", "!(x)", { windows: true }));
      assert(isMatch("fo", "!(x)", { windows: true }));
      assert(isMatch("foo", "!(x)", { windows: true }));
      assert(!isMatch("foo/bar", "!(x)", { windows: true }));
      assert(isMatch("foobar", "!(x)", { windows: true }));
      assert(isMatch("foot", "!(x)", { windows: true }));
      assert(isMatch("foox", "!(x)", { windows: true }));
      assert(isMatch("o", "!(x)", { windows: true }));
      assert(isMatch("of", "!(x)", { windows: true }));
      assert(isMatch("ooo", "!(x)", { windows: true }));
      assert(isMatch("ox", "!(x)", { windows: true }));
      assert(!isMatch("x", "!(x)", { windows: true }));
      assert(isMatch("xx", "!(x)", { windows: true }));

      assert(isMatch("bar", "!(x)*", { windows: true }));
      assert(isMatch("f", "!(x)*", { windows: true }));
      assert(isMatch("fa", "!(x)*", { windows: true }));
      assert(isMatch("fb", "!(x)*", { windows: true }));
      assert(isMatch("ff", "!(x)*", { windows: true }));
      assert(isMatch("fff", "!(x)*", { windows: true }));
      assert(isMatch("fo", "!(x)*", { windows: true }));
      assert(isMatch("foo", "!(x)*", { windows: true }));
      assert(!isMatch("foo/bar", "!(x)*", { windows: true }));
      assert(isMatch("foobar", "!(x)*", { windows: true }));
      assert(isMatch("foot", "!(x)*", { windows: true }));
      assert(isMatch("foox", "!(x)*", { windows: true }));
      assert(isMatch("o", "!(x)*", { windows: true }));
      assert(isMatch("of", "!(x)*", { windows: true }));
      assert(isMatch("ooo", "!(x)*", { windows: true }));
      assert(isMatch("ox", "!(x)*", { windows: true }));
      assert(!isMatch("x", "!(x)*", { windows: true }));
      assert(!isMatch("xx", "!(x)*", { windows: true }));

      assert(isMatch("bar", "*(!(f))", { windows: true }));
      assert(!isMatch("f", "*(!(f))", { windows: true }));
      assert(isMatch("fa", "*(!(f))", { windows: true }));
      assert(isMatch("fb", "*(!(f))", { windows: true }));
      assert(isMatch("ff", "*(!(f))", { windows: true }));
      assert(isMatch("fff", "*(!(f))", { windows: true }));
      assert(isMatch("fo", "*(!(f))", { windows: true }));
      assert(isMatch("foo", "*(!(f))", { windows: true }));
      assert(!isMatch("foo/bar", "*(!(f))", { windows: true }));
      assert(isMatch("foobar", "*(!(f))", { windows: true }));
      assert(isMatch("foot", "*(!(f))", { windows: true }));
      assert(isMatch("foox", "*(!(f))", { windows: true }));
      assert(isMatch("o", "*(!(f))", { windows: true }));
      assert(isMatch("of", "*(!(f))", { windows: true }));
      assert(isMatch("ooo", "*(!(f))", { windows: true }));
      assert(isMatch("ox", "*(!(f))", { windows: true }));
      assert(isMatch("x", "*(!(f))", { windows: true }));
      assert(isMatch("xx", "*(!(f))", { windows: true }));

      assert(!isMatch("bar", "*((foo))", { windows: true }));
      assert(!isMatch("f", "*((foo))", { windows: true }));
      assert(!isMatch("fa", "*((foo))", { windows: true }));
      assert(!isMatch("fb", "*((foo))", { windows: true }));
      assert(!isMatch("ff", "*((foo))", { windows: true }));
      assert(!isMatch("fff", "*((foo))", { windows: true }));
      assert(!isMatch("fo", "*((foo))", { windows: true }));
      assert(isMatch("foo", "*((foo))", { windows: true }));
      assert(!isMatch("foo/bar", "*((foo))", { windows: true }));
      assert(!isMatch("foobar", "*((foo))", { windows: true }));
      assert(!isMatch("foot", "*((foo))", { windows: true }));
      assert(!isMatch("foox", "*((foo))", { windows: true }));
      assert(!isMatch("o", "*((foo))", { windows: true }));
      assert(!isMatch("of", "*((foo))", { windows: true }));
      assert(!isMatch("ooo", "*((foo))", { windows: true }));
      assert(!isMatch("ox", "*((foo))", { windows: true }));
      assert(!isMatch("x", "*((foo))", { windows: true }));
      assert(!isMatch("xx", "*((foo))", { windows: true }));

      assert(isMatch("bar", "+(!(f))", { windows: true }));
      assert(!isMatch("f", "+(!(f))", { windows: true }));
      assert(isMatch("fa", "+(!(f))", { windows: true }));
      assert(isMatch("fb", "+(!(f))", { windows: true }));
      assert(isMatch("ff", "+(!(f))", { windows: true }));
      assert(isMatch("fff", "+(!(f))", { windows: true }));
      assert(isMatch("fo", "+(!(f))", { windows: true }));
      assert(isMatch("foo", "+(!(f))", { windows: true }));
      assert(!isMatch("foo/bar", "+(!(f))", { windows: true }));
      assert(isMatch("foobar", "+(!(f))", { windows: true }));
      assert(isMatch("foot", "+(!(f))", { windows: true }));
      assert(isMatch("foox", "+(!(f))", { windows: true }));
      assert(isMatch("o", "+(!(f))", { windows: true }));
      assert(isMatch("of", "+(!(f))", { windows: true }));
      assert(isMatch("ooo", "+(!(f))", { windows: true }));
      assert(isMatch("ox", "+(!(f))", { windows: true }));
      assert(isMatch("x", "+(!(f))", { windows: true }));
      assert(isMatch("xx", "+(!(f))", { windows: true }));

      assert(isMatch("bar", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("f", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("fa", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("fb", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("ff", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("fff", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("fo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foo/bar", "@(!(z*/*)|*x)", { windows: true }));
      assert(!isMatch("foo/bar", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foobar", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foot", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foox", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("o", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("of", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("ooo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("ox", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("x", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("xx", "@(!(z*)|*x)", { windows: true }));

      assert(!isMatch("bar", "foo/!(foo)", { windows: true }));
      assert(!isMatch("f", "foo/!(foo)", { windows: true }));
      assert(!isMatch("fa", "foo/!(foo)", { windows: true }));
      assert(!isMatch("fb", "foo/!(foo)", { windows: true }));
      assert(!isMatch("ff", "foo/!(foo)", { windows: true }));
      assert(!isMatch("fff", "foo/!(foo)", { windows: true }));
      assert(!isMatch("fo", "foo/!(foo)", { windows: true }));
      assert(!isMatch("foo", "foo/!(foo)", { windows: true }));
      assert(isMatch("foo/bar", "foo/!(foo)", { windows: true }));
      assert(!isMatch("foobar", "foo/!(foo)", { windows: true }));
      assert(!isMatch("foot", "foo/!(foo)", { windows: true }));
      assert(!isMatch("foox", "foo/!(foo)", { windows: true }));
      assert(!isMatch("o", "foo/!(foo)", { windows: true }));
      assert(!isMatch("of", "foo/!(foo)", { windows: true }));
      assert(!isMatch("ooo", "foo/!(foo)", { windows: true }));
      assert(!isMatch("ox", "foo/!(foo)", { windows: true }));
      assert(!isMatch("x", "foo/!(foo)", { windows: true }));
      assert(!isMatch("xx", "foo/!(foo)", { windows: true }));

      assert(!isMatch("ffffffo", "(foo)bb", { windows: true }));
      assert(
        !isMatch("fffooofoooooffoofffooofff", "(foo)bb", { windows: true }),
      );
      assert(!isMatch("ffo", "(foo)bb", { windows: true }));
      assert(!isMatch("fofo", "(foo)bb", { windows: true }));
      assert(!isMatch("fofoofoofofoo", "(foo)bb", { windows: true }));
      assert(!isMatch("foo", "(foo)bb", { windows: true }));
      assert(!isMatch("foob", "(foo)bb", { windows: true }));
      assert(isMatch("foobb", "(foo)bb", { windows: true }));
      assert(!isMatch("foofoofo", "(foo)bb", { windows: true }));
      assert(!isMatch("fooofoofofooo", "(foo)bb", { windows: true }));
      assert(!isMatch("foooofo", "(foo)bb", { windows: true }));
      assert(!isMatch("foooofof", "(foo)bb", { windows: true }));
      assert(!isMatch("foooofofx", "(foo)bb", { windows: true }));
      assert(!isMatch("foooxfooxfoxfooox", "(foo)bb", { windows: true }));
      assert(!isMatch("foooxfooxfxfooox", "(foo)bb", { windows: true }));
      assert(!isMatch("foooxfooxofoxfooox", "(foo)bb", { windows: true }));
      assert(!isMatch("foot", "(foo)bb", { windows: true }));
      assert(!isMatch("foox", "(foo)bb", { windows: true }));
      assert(!isMatch("ofoofo", "(foo)bb", { windows: true }));
      assert(!isMatch("ofooofoofofooo", "(foo)bb", { windows: true }));
      assert(!isMatch("ofoooxoofxo", "(foo)bb", { windows: true }));
      assert(!isMatch("ofoooxoofxoofoooxoofxo", "(foo)bb", { windows: true }));
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "(foo)bb", { windows: true }),
      );
      assert(!isMatch("ofoooxoofxoofoooxoofxoo", "(foo)bb", { windows: true }));
      assert(
        !isMatch("ofoooxoofxoofoooxoofxooofxofxo", "(foo)bb", {
          windows: true,
        }),
      );
      assert(!isMatch("ofxoofxo", "(foo)bb", { windows: true }));
      assert(!isMatch("oofooofo", "(foo)bb", { windows: true }));
      assert(!isMatch("ooo", "(foo)bb", { windows: true }));
      assert(!isMatch("oxfoxfox", "(foo)bb", { windows: true }));
      assert(!isMatch("oxfoxoxfox", "(foo)bb", { windows: true }));
      assert(!isMatch("xfoooofof", "(foo)bb", { windows: true }));

      assert(isMatch("ffffffo", "*(*(f)*(o))", { windows: true }));
      assert(
        isMatch("fffooofoooooffoofffooofff", "*(*(f)*(o))", { windows: true }),
      );
      assert(isMatch("ffo", "*(*(f)*(o))", { windows: true }));
      assert(isMatch("fofo", "*(*(f)*(o))", { windows: true }));
      assert(isMatch("fofoofoofofoo", "*(*(f)*(o))", { windows: true }));
      assert(isMatch("foo", "*(*(f)*(o))", { windows: true }));
      assert(!isMatch("foob", "*(*(f)*(o))", { windows: true }));
      assert(!isMatch("foobb", "*(*(f)*(o))", { windows: true }));
      assert(isMatch("foofoofo", "*(*(f)*(o))", { windows: true }));
      assert(isMatch("fooofoofofooo", "*(*(f)*(o))", { windows: true }));
      assert(isMatch("foooofo", "*(*(f)*(o))", { windows: true }));
      assert(isMatch("foooofof", "*(*(f)*(o))", { windows: true }));
      assert(!isMatch("foooofofx", "*(*(f)*(o))", { windows: true }));
      assert(!isMatch("foooxfooxfoxfooox", "*(*(f)*(o))", { windows: true }));
      assert(!isMatch("foooxfooxfxfooox", "*(*(f)*(o))", { windows: true }));
      assert(!isMatch("foooxfooxofoxfooox", "*(*(f)*(o))", { windows: true }));
      assert(!isMatch("foot", "*(*(f)*(o))", { windows: true }));
      assert(!isMatch("foox", "*(*(f)*(o))", { windows: true }));
      assert(isMatch("ofoofo", "*(*(f)*(o))", { windows: true }));
      assert(isMatch("ofooofoofofooo", "*(*(f)*(o))", { windows: true }));
      assert(!isMatch("ofoooxoofxo", "*(*(f)*(o))", { windows: true }));
      assert(
        !isMatch("ofoooxoofxoofoooxoofxo", "*(*(f)*(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "*(*(f)*(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxoo", "*(*(f)*(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxooofxofxo", "*(*(f)*(o))", {
          windows: true,
        }),
      );
      assert(!isMatch("ofxoofxo", "*(*(f)*(o))", { windows: true }));
      assert(isMatch("oofooofo", "*(*(f)*(o))", { windows: true }));
      assert(isMatch("ooo", "*(*(f)*(o))", { windows: true }));
      assert(!isMatch("oxfoxfox", "*(*(f)*(o))", { windows: true }));
      assert(!isMatch("oxfoxoxfox", "*(*(f)*(o))", { windows: true }));
      assert(!isMatch("xfoooofof", "*(*(f)*(o))", { windows: true }));

      assert(!isMatch("ffffffo", "*(*(of*(o)x)o)", { windows: true }));
      assert(
        !isMatch("fffooofoooooffoofffooofff", "*(*(of*(o)x)o)", {
          windows: true,
        }),
      );
      assert(!isMatch("ffo", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("fofo", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("fofoofoofofoo", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("foo", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("foob", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("foobb", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("foofoofo", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("fooofoofofooo", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("foooofo", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("foooofof", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("foooofofx", "*(*(of*(o)x)o)", { windows: true }));
      assert(
        !isMatch("foooxfooxfoxfooox", "*(*(of*(o)x)o)", { windows: true }),
      );
      assert(!isMatch("foooxfooxfxfooox", "*(*(of*(o)x)o)", { windows: true }));
      assert(
        !isMatch("foooxfooxofoxfooox", "*(*(of*(o)x)o)", { windows: true }),
      );
      assert(!isMatch("foot", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("foox", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("ofoofo", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("ofooofoofofooo", "*(*(of*(o)x)o)", { windows: true }));
      assert(isMatch("ofoooxoofxo", "*(*(of*(o)x)o)", { windows: true }));
      assert(
        isMatch("ofoooxoofxoofoooxoofxo", "*(*(of*(o)x)o)", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "*(*(of*(o)x)o)", {
          windows: true,
        }),
      );
      assert(
        isMatch("ofoooxoofxoofoooxoofxoo", "*(*(of*(o)x)o)", { windows: true }),
      );
      assert(
        isMatch("ofoooxoofxoofoooxoofxooofxofxo", "*(*(of*(o)x)o)", {
          windows: true,
        }),
      );
      assert(isMatch("ofxoofxo", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("oofooofo", "*(*(of*(o)x)o)", { windows: true }));
      assert(isMatch("ooo", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("oxfoxfox", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("oxfoxoxfox", "*(*(of*(o)x)o)", { windows: true }));
      assert(!isMatch("xfoooofof", "*(*(of*(o)x)o)", { windows: true }));

      assert(isMatch("ffffffo", "*(f*(o))", { windows: true }));
      assert(
        isMatch("fffooofoooooffoofffooofff", "*(f*(o))", { windows: true }),
      );
      assert(isMatch("ffo", "*(f*(o))", { windows: true }));
      assert(isMatch("fofo", "*(f*(o))", { windows: true }));
      assert(isMatch("fofoofoofofoo", "*(f*(o))", { windows: true }));
      assert(isMatch("foo", "*(f*(o))", { windows: true }));
      assert(!isMatch("foob", "*(f*(o))", { windows: true }));
      assert(!isMatch("foobb", "*(f*(o))", { windows: true }));
      assert(isMatch("foofoofo", "*(f*(o))", { windows: true }));
      assert(isMatch("fooofoofofooo", "*(f*(o))", { windows: true }));
      assert(isMatch("foooofo", "*(f*(o))", { windows: true }));
      assert(isMatch("foooofof", "*(f*(o))", { windows: true }));
      assert(!isMatch("foooofofx", "*(f*(o))", { windows: true }));
      assert(!isMatch("foooxfooxfoxfooox", "*(f*(o))", { windows: true }));
      assert(!isMatch("foooxfooxfxfooox", "*(f*(o))", { windows: true }));
      assert(!isMatch("foooxfooxofoxfooox", "*(f*(o))", { windows: true }));
      assert(!isMatch("foot", "*(f*(o))", { windows: true }));
      assert(!isMatch("foox", "*(f*(o))", { windows: true }));
      assert(!isMatch("ofoofo", "*(f*(o))", { windows: true }));
      assert(!isMatch("ofooofoofofooo", "*(f*(o))", { windows: true }));
      assert(!isMatch("ofoooxoofxo", "*(f*(o))", { windows: true }));
      assert(!isMatch("ofoooxoofxoofoooxoofxo", "*(f*(o))", { windows: true }));
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "*(f*(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxoo", "*(f*(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxooofxofxo", "*(f*(o))", {
          windows: true,
        }),
      );
      assert(!isMatch("ofxoofxo", "*(f*(o))", { windows: true }));
      assert(!isMatch("oofooofo", "*(f*(o))", { windows: true }));
      assert(!isMatch("ooo", "*(f*(o))", { windows: true }));
      assert(!isMatch("oxfoxfox", "*(f*(o))", { windows: true }));
      assert(!isMatch("oxfoxoxfox", "*(f*(o))", { windows: true }));
      assert(!isMatch("xfoooofof", "*(f*(o))", { windows: true }));

      assert(!isMatch("ffffffo", "*(f*(o)x)", { windows: true }));
      assert(
        !isMatch("fffooofoooooffoofffooofff", "*(f*(o)x)", { windows: true }),
      );
      assert(!isMatch("ffo", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("fofo", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("fofoofoofofoo", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("foo", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("foob", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("foobb", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("foofoofo", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("fooofoofofooo", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("foooofo", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("foooofof", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("foooofofx", "*(f*(o)x)", { windows: true }));
      assert(isMatch("foooxfooxfoxfooox", "*(f*(o)x)", { windows: true }));
      assert(isMatch("foooxfooxfxfooox", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("foooxfooxofoxfooox", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("foot", "*(f*(o)x)", { windows: true }));
      assert(isMatch("foox", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("ofoofo", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("ofooofoofofooo", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("ofoooxoofxo", "*(f*(o)x)", { windows: true }));
      assert(
        !isMatch("ofoooxoofxoofoooxoofxo", "*(f*(o)x)", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "*(f*(o)x)", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxoo", "*(f*(o)x)", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxooofxofxo", "*(f*(o)x)", {
          windows: true,
        }),
      );
      assert(!isMatch("ofxoofxo", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("oofooofo", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("ooo", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("oxfoxfox", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("oxfoxoxfox", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("xfoooofof", "*(f*(o)x)", { windows: true }));

      assert(!isMatch("ffffffo", "*(f+(o))", { windows: true }));
      assert(
        !isMatch("fffooofoooooffoofffooofff", "*(f+(o))", { windows: true }),
      );
      assert(!isMatch("ffo", "*(f+(o))", { windows: true }));
      assert(isMatch("fofo", "*(f+(o))", { windows: true }));
      assert(isMatch("fofoofoofofoo", "*(f+(o))", { windows: true }));
      assert(isMatch("foo", "*(f+(o))", { windows: true }));
      assert(!isMatch("foob", "*(f+(o))", { windows: true }));
      assert(!isMatch("foobb", "*(f+(o))", { windows: true }));
      assert(isMatch("foofoofo", "*(f+(o))", { windows: true }));
      assert(isMatch("fooofoofofooo", "*(f+(o))", { windows: true }));
      assert(isMatch("foooofo", "*(f+(o))", { windows: true }));
      assert(!isMatch("foooofof", "*(f+(o))", { windows: true }));
      assert(!isMatch("foooofofx", "*(f+(o))", { windows: true }));
      assert(!isMatch("foooxfooxfoxfooox", "*(f+(o))", { windows: true }));
      assert(!isMatch("foooxfooxfxfooox", "*(f+(o))", { windows: true }));
      assert(!isMatch("foooxfooxofoxfooox", "*(f+(o))", { windows: true }));
      assert(!isMatch("foot", "*(f+(o))", { windows: true }));
      assert(!isMatch("foox", "*(f+(o))", { windows: true }));
      assert(!isMatch("ofoofo", "*(f+(o))", { windows: true }));
      assert(!isMatch("ofooofoofofooo", "*(f+(o))", { windows: true }));
      assert(!isMatch("ofoooxoofxo", "*(f+(o))", { windows: true }));
      assert(!isMatch("ofoooxoofxoofoooxoofxo", "*(f+(o))", { windows: true }));
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "*(f+(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxoo", "*(f+(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxooofxofxo", "*(f+(o))", {
          windows: true,
        }),
      );
      assert(!isMatch("ofxoofxo", "*(f+(o))", { windows: true }));
      assert(!isMatch("oofooofo", "*(f+(o))", { windows: true }));
      assert(!isMatch("ooo", "*(f+(o))", { windows: true }));
      assert(!isMatch("oxfoxfox", "*(f+(o))", { windows: true }));
      assert(!isMatch("oxfoxoxfox", "*(f+(o))", { windows: true }));
      assert(!isMatch("xfoooofof", "*(f+(o))", { windows: true }));

      assert(!isMatch("ffffffo", "*(of+(o))", { windows: true }));
      assert(
        !isMatch("fffooofoooooffoofffooofff", "*(of+(o))", { windows: true }),
      );
      assert(!isMatch("ffo", "*(of+(o))", { windows: true }));
      assert(!isMatch("fofo", "*(of+(o))", { windows: true }));
      assert(!isMatch("fofoofoofofoo", "*(of+(o))", { windows: true }));
      assert(!isMatch("foo", "*(of+(o))", { windows: true }));
      assert(!isMatch("foob", "*(of+(o))", { windows: true }));
      assert(!isMatch("foobb", "*(of+(o))", { windows: true }));
      assert(!isMatch("foofoofo", "*(of+(o))", { windows: true }));
      assert(!isMatch("fooofoofofooo", "*(of+(o))", { windows: true }));
      assert(!isMatch("foooofo", "*(of+(o))", { windows: true }));
      assert(!isMatch("foooofof", "*(of+(o))", { windows: true }));
      assert(!isMatch("foooofofx", "*(of+(o))", { windows: true }));
      assert(!isMatch("foooxfooxfoxfooox", "*(of+(o))", { windows: true }));
      assert(!isMatch("foooxfooxfxfooox", "*(of+(o))", { windows: true }));
      assert(!isMatch("foooxfooxofoxfooox", "*(of+(o))", { windows: true }));
      assert(!isMatch("foot", "*(of+(o))", { windows: true }));
      assert(!isMatch("foox", "*(of+(o))", { windows: true }));
      assert(isMatch("ofoofo", "*(of+(o))", { windows: true }));
      assert(!isMatch("ofooofoofofooo", "*(of+(o))", { windows: true }));
      assert(!isMatch("ofoooxoofxo", "*(of+(o))", { windows: true }));
      assert(
        !isMatch("ofoooxoofxoofoooxoofxo", "*(of+(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "*(of+(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxoo", "*(of+(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxooofxofxo", "*(of+(o))", {
          windows: true,
        }),
      );
      assert(!isMatch("ofxoofxo", "*(of+(o))", { windows: true }));
      assert(!isMatch("oofooofo", "*(of+(o))", { windows: true }));
      assert(!isMatch("ooo", "*(of+(o))", { windows: true }));
      assert(!isMatch("oxfoxfox", "*(of+(o))", { windows: true }));
      assert(!isMatch("oxfoxoxfox", "*(of+(o))", { windows: true }));
      assert(!isMatch("xfoooofof", "*(of+(o))", { windows: true }));

      assert(!isMatch("ffffffo", "*(of+(o)|f)", { windows: true }));
      assert(
        !isMatch("fffooofoooooffoofffooofff", "*(of+(o)|f)", { windows: true }),
      );
      assert(!isMatch("ffo", "*(of+(o)|f)", { windows: true }));
      assert(isMatch("fofo", "*(of+(o)|f)", { windows: true }));
      assert(isMatch("fofoofoofofoo", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("foo", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("foob", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("foobb", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("foofoofo", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("fooofoofofooo", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("foooofo", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("foooofof", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("foooofofx", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("foooxfooxfoxfooox", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("foooxfooxfxfooox", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("foooxfooxofoxfooox", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("foot", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("foox", "*(of+(o)|f)", { windows: true }));
      assert(isMatch("ofoofo", "*(of+(o)|f)", { windows: true }));
      assert(isMatch("ofooofoofofooo", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("ofoooxoofxo", "*(of+(o)|f)", { windows: true }));
      assert(
        !isMatch("ofoooxoofxoofoooxoofxo", "*(of+(o)|f)", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "*(of+(o)|f)", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxoo", "*(of+(o)|f)", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxooofxofxo", "*(of+(o)|f)", {
          windows: true,
        }),
      );
      assert(!isMatch("ofxoofxo", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("oofooofo", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("ooo", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("oxfoxfox", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("oxfoxoxfox", "*(of+(o)|f)", { windows: true }));
      assert(!isMatch("xfoooofof", "*(of+(o)|f)", { windows: true }));

      assert(!isMatch("ffffffo", "*(of|oof+(o))", { windows: true }));
      assert(
        !isMatch("fffooofoooooffoofffooofff", "*(of|oof+(o))", {
          windows: true,
        }),
      );
      assert(!isMatch("ffo", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("fofo", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("fofoofoofofoo", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("foo", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("foob", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("foobb", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("foofoofo", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("fooofoofofooo", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("foooofo", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("foooofof", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("foooofofx", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("foooxfooxfoxfooox", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("foooxfooxfxfooox", "*(of|oof+(o))", { windows: true }));
      assert(
        !isMatch("foooxfooxofoxfooox", "*(of|oof+(o))", { windows: true }),
      );
      assert(!isMatch("foot", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("foox", "*(of|oof+(o))", { windows: true }));
      assert(isMatch("ofoofo", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("ofooofoofofooo", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("ofoooxoofxo", "*(of|oof+(o))", { windows: true }));
      assert(
        !isMatch("ofoooxoofxoofoooxoofxo", "*(of|oof+(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "*(of|oof+(o))", {
          windows: true,
        }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxoo", "*(of|oof+(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxooofxofxo", "*(of|oof+(o))", {
          windows: true,
        }),
      );
      assert(!isMatch("ofxoofxo", "*(of|oof+(o))", { windows: true }));
      assert(isMatch("oofooofo", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("ooo", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("oxfoxfox", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("oxfoxoxfox", "*(of|oof+(o))", { windows: true }));
      assert(!isMatch("xfoooofof", "*(of|oof+(o))", { windows: true }));

      assert(!isMatch("ffffffo", "*(oxf+(ox))", { windows: true }));
      assert(
        !isMatch("fffooofoooooffoofffooofff", "*(oxf+(ox))", { windows: true }),
      );
      assert(!isMatch("ffo", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("fofo", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("fofoofoofofoo", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("foo", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("foob", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("foobb", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("foofoofo", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("fooofoofofooo", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("foooofo", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("foooofof", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("foooofofx", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("foooxfooxfoxfooox", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("foooxfooxfxfooox", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("foooxfooxofoxfooox", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("foot", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("foox", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("ofoofo", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("ofooofoofofooo", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("ofoooxoofxo", "*(oxf+(ox))", { windows: true }));
      assert(
        !isMatch("ofoooxoofxoofoooxoofxo", "*(oxf+(ox))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "*(oxf+(ox))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxoo", "*(oxf+(ox))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxooofxofxo", "*(oxf+(ox))", {
          windows: true,
        }),
      );
      assert(!isMatch("ofxoofxo", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("oofooofo", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("ooo", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("oxfoxfox", "*(oxf+(ox))", { windows: true }));
      assert(isMatch("oxfoxoxfox", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("xfoooofof", "*(oxf+(ox))", { windows: true }));

      assert(isMatch("ffffffo", "@(!(z*)|*x)", { windows: true }));
      assert(
        isMatch("fffooofoooooffoofffooofff", "@(!(z*)|*x)", { windows: true }),
      );
      assert(isMatch("ffo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("fofo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("fofoofoofofoo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foob", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foobb", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foofoofo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("fooofoofofooo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foooofo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foooofof", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foooofofx", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foooxfooxfoxfooox", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foooxfooxfxfooox", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foooxfooxofoxfooox", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foot", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foox", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("ofoofo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("ofooofoofofooo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("ofoooxoofxo", "@(!(z*)|*x)", { windows: true }));
      assert(
        isMatch("ofoooxoofxoofoooxoofxo", "@(!(z*)|*x)", { windows: true }),
      );
      assert(
        isMatch("ofoooxoofxoofoooxoofxofo", "@(!(z*)|*x)", { windows: true }),
      );
      assert(
        isMatch("ofoooxoofxoofoooxoofxoo", "@(!(z*)|*x)", { windows: true }),
      );
      assert(
        isMatch("ofoooxoofxoofoooxoofxooofxofxo", "@(!(z*)|*x)", {
          windows: true,
        }),
      );
      assert(isMatch("ofxoofxo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("oofooofo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("ooo", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("oxfoxfox", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("oxfoxoxfox", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("xfoooofof", "@(!(z*)|*x)", { windows: true }));

      assert(!isMatch("ffffffo", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(
        !isMatch("fffooofoooooffoofffooofff", "@(foo|f|fo)*(f|of+(o))", {
          windows: true,
        }),
      );
      assert(!isMatch("ffo", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(isMatch("fofo", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(
        isMatch("fofoofoofofoo", "@(foo|f|fo)*(f|of+(o))", { windows: true }),
      );
      assert(isMatch("foo", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(!isMatch("foob", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(!isMatch("foobb", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(isMatch("foofoofo", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(
        isMatch("fooofoofofooo", "@(foo|f|fo)*(f|of+(o))", { windows: true }),
      );
      assert(!isMatch("foooofo", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(!isMatch("foooofof", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(
        !isMatch("foooofofx", "@(foo|f|fo)*(f|of+(o))", { windows: true }),
      );
      assert(
        !isMatch("foooxfooxfoxfooox", "@(foo|f|fo)*(f|of+(o))", {
          windows: true,
        }),
      );
      assert(
        !isMatch("foooxfooxfxfooox", "@(foo|f|fo)*(f|of+(o))", {
          windows: true,
        }),
      );
      assert(
        !isMatch("foooxfooxofoxfooox", "@(foo|f|fo)*(f|of+(o))", {
          windows: true,
        }),
      );
      assert(!isMatch("foot", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(!isMatch("foox", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(!isMatch("ofoofo", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(
        !isMatch("ofooofoofofooo", "@(foo|f|fo)*(f|of+(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxo", "@(foo|f|fo)*(f|of+(o))", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxo", "@(foo|f|fo)*(f|of+(o))", {
          windows: true,
        }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "@(foo|f|fo)*(f|of+(o))", {
          windows: true,
        }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxoo", "@(foo|f|fo)*(f|of+(o))", {
          windows: true,
        }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxooofxofxo", "@(foo|f|fo)*(f|of+(o))", {
          windows: true,
        }),
      );
      assert(!isMatch("ofxoofxo", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(!isMatch("oofooofo", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(!isMatch("ooo", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(!isMatch("oxfoxfox", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(
        !isMatch("oxfoxoxfox", "@(foo|f|fo)*(f|of+(o))", { windows: true }),
      );
      assert(
        !isMatch("xfoooofof", "@(foo|f|fo)*(f|of+(o))", { windows: true }),
      );

      assert(isMatch("aaac", "*(@(a))a@(c)", { windows: true }));
      assert(isMatch("aac", "*(@(a))a@(c)", { windows: true }));
      assert(isMatch("ac", "*(@(a))a@(c)", { windows: true }));
      assert(!isMatch("abbcd", "*(@(a))a@(c)", { windows: true }));
      assert(!isMatch("abcd", "*(@(a))a@(c)", { windows: true }));
      assert(!isMatch("acd", "*(@(a))a@(c)", { windows: true }));
      assert(!isMatch("baaac", "*(@(a))a@(c)", { windows: true }));
      assert(!isMatch("c", "*(@(a))a@(c)", { windows: true }));
      assert(!isMatch("foo", "*(@(a))a@(c)", { windows: true }));

      assert(!isMatch("aaac", "@(ab|a*(b))*(c)d", { windows: true }));
      assert(!isMatch("aac", "@(ab|a*(b))*(c)d", { windows: true }));
      assert(!isMatch("ac", "@(ab|a*(b))*(c)d", { windows: true }));
      assert(isMatch("abbcd", "@(ab|a*(b))*(c)d", { windows: true }));
      assert(isMatch("abcd", "@(ab|a*(b))*(c)d", { windows: true }));
      assert(isMatch("acd", "@(ab|a*(b))*(c)d", { windows: true }));
      assert(!isMatch("baaac", "@(ab|a*(b))*(c)d", { windows: true }));
      assert(!isMatch("c", "@(ab|a*(b))*(c)d", { windows: true }));
      assert(!isMatch("foo", "@(ab|a*(b))*(c)d", { windows: true }));

      assert(!isMatch("aaac", "?@(a|b)*@(c)d", { windows: true }));
      assert(!isMatch("aac", "?@(a|b)*@(c)d", { windows: true }));
      assert(!isMatch("ac", "?@(a|b)*@(c)d", { windows: true }));
      assert(isMatch("abbcd", "?@(a|b)*@(c)d", { windows: true }));
      assert(isMatch("abcd", "?@(a|b)*@(c)d", { windows: true }));
      assert(!isMatch("acd", "?@(a|b)*@(c)d", { windows: true }));
      assert(!isMatch("baaac", "?@(a|b)*@(c)d", { windows: true }));
      assert(!isMatch("c", "?@(a|b)*@(c)d", { windows: true }));
      assert(!isMatch("foo", "?@(a|b)*@(c)d", { windows: true }));

      assert(!isMatch("aaac", "@(ab|a*@(b))*(c)d", { windows: true }));
      assert(!isMatch("aac", "@(ab|a*@(b))*(c)d", { windows: true }));
      assert(!isMatch("ac", "@(ab|a*@(b))*(c)d", { windows: true }));
      assert(isMatch("abbcd", "@(ab|a*@(b))*(c)d", { windows: true }));
      assert(isMatch("abcd", "@(ab|a*@(b))*(c)d", { windows: true }));
      assert(!isMatch("acd", "@(ab|a*@(b))*(c)d", { windows: true }));
      assert(!isMatch("baaac", "@(ab|a*@(b))*(c)d", { windows: true }));
      assert(!isMatch("c", "@(ab|a*@(b))*(c)d", { windows: true }));
      assert(!isMatch("foo", "@(ab|a*@(b))*(c)d", { windows: true }));

      assert(!isMatch("aac", "*(@(a))b@(c)", { windows: true }));
    });
  });

  describe("other", () => {
    it("should support backtracking in alternation matches", () => {
      assert(isMatch("fofoofoofofoo", "*(fo|foo)", { windows: true }));
      assert(!isMatch("ffffffo", "*(fo|foo)", { windows: true }));
      assert(
        !isMatch("fffooofoooooffoofffooofff", "*(fo|foo)", { windows: true }),
      );
      assert(!isMatch("ffo", "*(fo|foo)", { windows: true }));
      assert(isMatch("fofo", "*(fo|foo)", { windows: true }));
      assert(isMatch("fofoofoofofoo", "*(fo|foo)", { windows: true }));
      assert(isMatch("foo", "*(fo|foo)", { windows: true }));
      assert(!isMatch("foob", "*(fo|foo)", { windows: true }));
      assert(!isMatch("foobb", "*(fo|foo)", { windows: true }));
      assert(isMatch("foofoofo", "*(fo|foo)", { windows: true }));
      assert(!isMatch("fooofoofofooo", "*(fo|foo)", { windows: true }));
      assert(!isMatch("foooofo", "*(fo|foo)", { windows: true }));
      assert(!isMatch("foooofof", "*(fo|foo)", { windows: true }));
      assert(!isMatch("foooofofx", "*(fo|foo)", { windows: true }));
      assert(!isMatch("foooxfooxfoxfooox", "*(fo|foo)", { windows: true }));
      assert(!isMatch("foooxfooxfxfooox", "*(fo|foo)", { windows: true }));
      assert(!isMatch("foooxfooxofoxfooox", "*(fo|foo)", { windows: true }));
      assert(!isMatch("foot", "*(fo|foo)", { windows: true }));
      assert(!isMatch("foox", "*(fo|foo)", { windows: true }));
      assert(!isMatch("ofoofo", "*(fo|foo)", { windows: true }));
      assert(!isMatch("ofooofoofofooo", "*(fo|foo)", { windows: true }));
      assert(!isMatch("ofoooxoofxo", "*(fo|foo)", { windows: true }));
      assert(
        !isMatch("ofoooxoofxoofoooxoofxo", "*(fo|foo)", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "*(fo|foo)", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxoo", "*(fo|foo)", { windows: true }),
      );
      assert(
        !isMatch("ofoooxoofxoofoooxoofxooofxofxo", "*(fo|foo)", {
          windows: true,
        }),
      );
      assert(!isMatch("ofxoofxo", "*(fo|foo)", { windows: true }));
      assert(!isMatch("oofooofo", "*(fo|foo)", { windows: true }));
      assert(!isMatch("ooo", "*(fo|foo)", { windows: true }));
      assert(!isMatch("oxfoxfox", "*(fo|foo)", { windows: true }));
      assert(!isMatch("oxfoxoxfox", "*(fo|foo)", { windows: true }));
      assert(!isMatch("xfoooofof", "*(fo|foo)", { windows: true }));
    });

    it("should support exclusions", () => {
      assert(!isMatch("foob", "!(foo)b*", { windows: true }));
      assert(!isMatch("foobb", "!(foo)b*", { windows: true }));
      assert(!isMatch("foo", "!(foo)b*", { windows: true }));
      assert(isMatch("bar", "!(foo)b*", { windows: true }));
      assert(isMatch("baz", "!(foo)b*", { windows: true }));
      assert(!isMatch("foobar", "!(foo)b*", { windows: true }));

      assert(!isMatch("foo", "*(!(foo))", { windows: true }));
      assert(isMatch("bar", "*(!(foo))", { windows: true }));
      assert(isMatch("baz", "*(!(foo))", { windows: true }));
      assert(isMatch("foobar", "*(!(foo))", { windows: true }));

      // Bash 4.3 says this should match `foo` and `foobar`, which makes no sense
      assert(!isMatch("foo", "!(foo)*", { windows: true }));
      assert(!isMatch("foobar", "!(foo)*", { windows: true }));
      assert(isMatch("bar", "!(foo)*", { windows: true }));
      assert(isMatch("baz", "!(foo)*", { windows: true }));

      assert(!isMatch("moo.cow", "!(*.*)", { windows: true }));
      assert(isMatch("moo", "!(*.*)", { windows: true }));
      assert(isMatch("cow", "!(*.*)", { windows: true }));

      assert(isMatch("moo.cow", "!(a*).!(b*)", { windows: true }));
      assert(!isMatch("moo.cow", "!(*).!(*)", { windows: true }));
      assert(!isMatch("moo.cow.moo.cow", "!(*.*).!(*.*)", { windows: true }));
      assert(!isMatch("mad.moo.cow", "!(*.*).!(*.*)", { windows: true }));

      assert(!isMatch("moo.cow", "!(*.*).", { windows: true }));
      assert(!isMatch("moo", "!(*.*).", { windows: true }));
      assert(!isMatch("cow", "!(*.*).", { windows: true }));

      assert(!isMatch("moo.cow", ".!(*.*)", { windows: true }));
      assert(!isMatch("moo", ".!(*.*)", { windows: true }));
      assert(!isMatch("cow", ".!(*.*)", { windows: true }));

      assert(
        !isMatch("mucca.pazza", "mu!(*(c))?.pa!(*(z))?", { windows: true }),
      );

      assert(
        isMatch("effgz", "@(b+(c)d|e*(f)g?|?(h)i@(j|k))", { windows: true }),
      );
      assert(
        isMatch("efgz", "@(b+(c)d|e*(f)g?|?(h)i@(j|k))", { windows: true }),
      );
      assert(
        isMatch("egz", "@(b+(c)d|e*(f)g?|?(h)i@(j|k))", { windows: true }),
      );
      assert(
        !isMatch("egz", "@(b+(c)d|e+(f)g?|?(h)i@(j|k))", { windows: true }),
      );
      assert(
        isMatch("egzefffgzbcdij", "*(b+(c)d|e*(f)g?|?(h)i@(j|k))", {
          windows: true,
        }),
      );
    });

    it("valid numbers", () => {
      assert(
        isMatch("/dev/udp/129.22.8.102/45", "/dev/@(tcp|udp)/*/*", {
          windows: true,
        }),
      );

      assert(!isMatch("0", "[1-6]([0-9])", { windows: true }));
      assert(isMatch("12", "[1-6]([0-9])", { windows: true }));
      assert(!isMatch("1", "[1-6]([0-9])", { windows: true }));
      assert(!isMatch("12abc", "[1-6]([0-9])", { windows: true }));
      assert(!isMatch("555", "[1-6]([0-9])", { windows: true }));

      assert(!isMatch("0", "[1-6]*([0-9])", { windows: true }));
      assert(isMatch("12", "[1-6]*([0-9])", { windows: true }));
      assert(isMatch("1", "[1-6]*([0-9])", { windows: true }));
      assert(!isMatch("12abc", "[1-6]*([0-9])", { windows: true }));
      assert(isMatch("555", "[1-6]*([0-9])", { windows: true }));

      assert(!isMatch("0", "[1-5]*([6-9])", { windows: true }));
      assert(!isMatch("12", "[1-5]*([6-9])", { windows: true }));
      assert(isMatch("1", "[1-5]*([6-9])", { windows: true }));
      assert(!isMatch("12abc", "[1-5]*([6-9])", { windows: true }));
      assert(!isMatch("555", "[1-5]*([6-9])", { windows: true }));

      assert(isMatch("0", "0|[1-6]*([0-9])", { windows: true }));
      assert(isMatch("12", "0|[1-6]*([0-9])", { windows: true }));
      assert(isMatch("1", "0|[1-6]*([0-9])", { windows: true }));
      assert(!isMatch("12abc", "0|[1-6]*([0-9])", { windows: true }));
      assert(isMatch("555", "0|[1-6]*([0-9])", { windows: true }));

      assert(isMatch("07", "+([0-7])", { windows: true }));
      assert(isMatch("0377", "+([0-7])", { windows: true }));
      assert(!isMatch("09", "+([0-7])", { windows: true }));
    });

    it("check extended globbing in pattern removal", () => {
      assert(isMatch("a", "+(a|abc)", { windows: true }));
      assert(isMatch("abc", "+(a|abc)", { windows: true }));

      assert(!isMatch("abcd", "+(a|abc)", { windows: true }));
      assert(!isMatch("abcde", "+(a|abc)", { windows: true }));
      assert(!isMatch("abcedf", "+(a|abc)", { windows: true }));

      assert(isMatch("f", "+(def|f)", { windows: true }));
      assert(isMatch("def", "+(f|def)", { windows: true }));

      assert(!isMatch("cdef", "+(f|def)", { windows: true }));
      assert(!isMatch("bcdef", "+(f|def)", { windows: true }));
      assert(!isMatch("abcedf", "+(f|def)", { windows: true }));

      assert(isMatch("abcd", "*(a|b)cd", { windows: true }));

      assert(!isMatch("a", "*(a|b)cd", { windows: true }));
      assert(!isMatch("ab", "*(a|b)cd", { windows: true }));
      assert(!isMatch("abc", "*(a|b)cd", { windows: true }));

      assert(!isMatch("a", '"*(a|b)cd"', { windows: true }));
      assert(!isMatch("ab", '"*(a|b)cd"', { windows: true }));
      assert(!isMatch("abc", '"*(a|b)cd"', { windows: true }));
      assert(!isMatch("abcde", '"*(a|b)cd"', { windows: true }));
      assert(!isMatch("abcdef", '"*(a|b)cd"', { windows: true }));
    });

    it("More tests derived from a bug report (in bash) concerning extended glob patterns following a *", () => {
      assert(
        isMatch("/dev/udp/129.22.8.102/45", "/dev\\/@(tcp|udp)\\/*\\/*", {
          windows: true,
        }),
      );
      assert(!isMatch("123abc", "(a+|b)*", { windows: true }));
      assert(isMatch("ab", "(a+|b)*", { windows: true }));
      assert(isMatch("abab", "(a+|b)*", { windows: true }));
      assert(isMatch("abcdef", "(a+|b)*", { windows: true }));
      assert(isMatch("accdef", "(a+|b)*", { windows: true }));
      assert(isMatch("abcfefg", "(a+|b)*", { windows: true }));
      assert(isMatch("abef", "(a+|b)*", { windows: true }));
      assert(isMatch("abcfef", "(a+|b)*", { windows: true }));
      assert(isMatch("abd", "(a+|b)*", { windows: true }));
      assert(isMatch("acd", "(a+|b)*", { windows: true }));

      assert(!isMatch("123abc", "(a+|b)+", { windows: true }));
      assert(isMatch("ab", "(a+|b)+", { windows: true }));
      assert(isMatch("abab", "(a+|b)+", { windows: true }));
      assert(!isMatch("abcdef", "(a+|b)+", { windows: true }));
      assert(!isMatch("accdef", "(a+|b)+", { windows: true }));
      assert(!isMatch("abcfefg", "(a+|b)+", { windows: true }));
      assert(!isMatch("abef", "(a+|b)+", { windows: true }));
      assert(!isMatch("abcfef", "(a+|b)+", { windows: true }));
      assert(!isMatch("abd", "(a+|b)+", { windows: true }));
      assert(!isMatch("acd", "(a+|b)+", { windows: true }));

      assert(!isMatch("123abc", "a(b*(foo|bar))d", { windows: true }));
      assert(!isMatch("ab", "a(b*(foo|bar))d", { windows: true }));
      assert(!isMatch("abab", "a(b*(foo|bar))d", { windows: true }));
      assert(!isMatch("abcdef", "a(b*(foo|bar))d", { windows: true }));
      assert(!isMatch("accdef", "a(b*(foo|bar))d", { windows: true }));
      assert(!isMatch("abcfefg", "a(b*(foo|bar))d", { windows: true }));
      assert(!isMatch("abef", "a(b*(foo|bar))d", { windows: true }));
      assert(!isMatch("abcfef", "a(b*(foo|bar))d", { windows: true }));
      assert(isMatch("abd", "a(b*(foo|bar))d", { windows: true }));
      assert(!isMatch("acd", "a(b*(foo|bar))d", { windows: true }));

      assert(!isMatch("123abc", "ab*(e|f)", { windows: true }));
      assert(isMatch("ab", "ab*(e|f)", { windows: true }));
      assert(!isMatch("abab", "ab*(e|f)", { windows: true }));
      assert(!isMatch("abcdef", "ab*(e|f)", { windows: true }));
      assert(!isMatch("accdef", "ab*(e|f)", { windows: true }));
      assert(!isMatch("abcfefg", "ab*(e|f)", { windows: true }));
      assert(isMatch("abef", "ab*(e|f)", { windows: true }));
      assert(!isMatch("abcfef", "ab*(e|f)", { windows: true }));
      assert(!isMatch("abd", "ab*(e|f)", { windows: true }));
      assert(!isMatch("acd", "ab*(e|f)", { windows: true }));

      assert(!isMatch("123abc", "ab**(e|f)", { windows: true }));
      assert(isMatch("ab", "ab**(e|f)", { windows: true }));
      assert(isMatch("abab", "ab**(e|f)", { windows: true }));
      assert(isMatch("abcdef", "ab**(e|f)", { windows: true }));
      assert(!isMatch("accdef", "ab**(e|f)", { windows: true }));
      assert(isMatch("abcfefg", "ab**(e|f)", { windows: true }));
      assert(isMatch("abef", "ab**(e|f)", { windows: true }));
      assert(isMatch("abcfef", "ab**(e|f)", { windows: true }));
      assert(isMatch("abd", "ab**(e|f)", { windows: true }));
      assert(!isMatch("acd", "ab**(e|f)", { windows: true }));

      assert(!isMatch("123abc", "ab**(e|f)g", { windows: true }));
      assert(!isMatch("ab", "ab**(e|f)g", { windows: true }));
      assert(!isMatch("abab", "ab**(e|f)g", { windows: true }));
      assert(!isMatch("abcdef", "ab**(e|f)g", { windows: true }));
      assert(!isMatch("accdef", "ab**(e|f)g", { windows: true }));
      assert(isMatch("abcfefg", "ab**(e|f)g", { windows: true }));
      assert(!isMatch("abef", "ab**(e|f)g", { windows: true }));
      assert(!isMatch("abcfef", "ab**(e|f)g", { windows: true }));
      assert(!isMatch("abd", "ab**(e|f)g", { windows: true }));
      assert(!isMatch("acd", "ab**(e|f)g", { windows: true }));

      assert(!isMatch("123abc", "ab***ef", { windows: true }));
      assert(!isMatch("ab", "ab***ef", { windows: true }));
      assert(!isMatch("abab", "ab***ef", { windows: true }));
      assert(isMatch("abcdef", "ab***ef", { windows: true }));
      assert(!isMatch("accdef", "ab***ef", { windows: true }));
      assert(!isMatch("abcfefg", "ab***ef", { windows: true }));
      assert(isMatch("abef", "ab***ef", { windows: true }));
      assert(isMatch("abcfef", "ab***ef", { windows: true }));
      assert(!isMatch("abd", "ab***ef", { windows: true }));
      assert(!isMatch("acd", "ab***ef", { windows: true }));

      assert(!isMatch("123abc", "ab*+(e|f)", { windows: true }));
      assert(!isMatch("ab", "ab*+(e|f)", { windows: true }));
      assert(!isMatch("abab", "ab*+(e|f)", { windows: true }));
      assert(isMatch("abcdef", "ab*+(e|f)", { windows: true }));
      assert(!isMatch("accdef", "ab*+(e|f)", { windows: true }));
      assert(!isMatch("abcfefg", "ab*+(e|f)", { windows: true }));
      assert(isMatch("abef", "ab*+(e|f)", { windows: true }));
      assert(isMatch("abcfef", "ab*+(e|f)", { windows: true }));
      assert(!isMatch("abd", "ab*+(e|f)", { windows: true }));
      assert(!isMatch("acd", "ab*+(e|f)", { windows: true }));

      assert(!isMatch("123abc", "ab*d*(e|f)", { windows: true }));
      assert(!isMatch("ab", "ab*d*(e|f)", { windows: true }));
      assert(!isMatch("abab", "ab*d*(e|f)", { windows: true }));
      assert(isMatch("abcdef", "ab*d*(e|f)", { windows: true }));
      assert(!isMatch("accdef", "ab*d*(e|f)", { windows: true }));
      assert(!isMatch("abcfefg", "ab*d*(e|f)", { windows: true }));
      assert(!isMatch("abef", "ab*d*(e|f)", { windows: true }));
      assert(!isMatch("abcfef", "ab*d*(e|f)", { windows: true }));
      assert(isMatch("abd", "ab*d*(e|f)", { windows: true }));
      assert(!isMatch("acd", "ab*d*(e|f)", { windows: true }));

      assert(!isMatch("123abc", "ab*d+(e|f)", { windows: true }));
      assert(!isMatch("ab", "ab*d+(e|f)", { windows: true }));
      assert(!isMatch("abab", "ab*d+(e|f)", { windows: true }));
      assert(isMatch("abcdef", "ab*d+(e|f)", { windows: true }));
      assert(!isMatch("accdef", "ab*d+(e|f)", { windows: true }));
      assert(!isMatch("abcfefg", "ab*d+(e|f)", { windows: true }));
      assert(!isMatch("abef", "ab*d+(e|f)", { windows: true }));
      assert(!isMatch("abcfef", "ab*d+(e|f)", { windows: true }));
      assert(!isMatch("abd", "ab*d+(e|f)", { windows: true }));
      assert(!isMatch("acd", "ab*d+(e|f)", { windows: true }));

      assert(!isMatch("123abc", "ab?*(e|f)", { windows: true }));
      assert(!isMatch("ab", "ab?*(e|f)", { windows: true }));
      assert(!isMatch("abab", "ab?*(e|f)", { windows: true }));
      assert(!isMatch("abcdef", "ab?*(e|f)", { windows: true }));
      assert(!isMatch("accdef", "ab?*(e|f)", { windows: true }));
      assert(!isMatch("abcfefg", "ab?*(e|f)", { windows: true }));
      assert(isMatch("abef", "ab?*(e|f)", { windows: true }));
      assert(isMatch("abcfef", "ab?*(e|f)", { windows: true }));
      assert(isMatch("abd", "ab?*(e|f)", { windows: true }));
      assert(!isMatch("acd", "ab?*(e|f)", { windows: true }));
    });

    it("bug in all versions up to and including bash-2.05b", () => {
      assert(isMatch("123abc", "*?(a)bc", { windows: true }));
    });

    it("should work with character classes", () => {
      const opts = { posix: true };
      assert(isMatch("a.b", "a[^[:alnum:]]b", opts));
      assert(isMatch("a,b", "a[^[:alnum:]]b", opts));
      assert(isMatch("a:b", "a[^[:alnum:]]b", opts));
      assert(isMatch("a-b", "a[^[:alnum:]]b", opts));
      assert(isMatch("a;b", "a[^[:alnum:]]b", opts));
      assert(isMatch("a b", "a[^[:alnum:]]b", opts));
      assert(isMatch("a_b", "a[^[:alnum:]]b", opts));

      assert(isMatch("a.b", "a[-.,:\\;\\ _]b", { windows: true }));
      assert(isMatch("a,b", "a[-.,:\\;\\ _]b", { windows: true }));
      assert(isMatch("a:b", "a[-.,:\\;\\ _]b", { windows: true }));
      assert(isMatch("a-b", "a[-.,:\\;\\ _]b", { windows: true }));
      assert(isMatch("a;b", "a[-.,:\\;\\ _]b", { windows: true }));
      assert(isMatch("a b", "a[-.,:\\;\\ _]b", { windows: true }));
      assert(isMatch("a_b", "a[-.,:\\;\\ _]b", { windows: true }));

      assert(isMatch("a.b", "a@([^[:alnum:]])b", opts));
      assert(isMatch("a,b", "a@([^[:alnum:]])b", opts));
      assert(isMatch("a:b", "a@([^[:alnum:]])b", opts));
      assert(isMatch("a-b", "a@([^[:alnum:]])b", opts));
      assert(isMatch("a;b", "a@([^[:alnum:]])b", opts));
      assert(isMatch("a b", "a@([^[:alnum:]])b", opts));
      assert(isMatch("a_b", "a@([^[:alnum:]])b", opts));

      assert(isMatch("a.b", "a@([-.,:; _])b", { windows: true }));
      assert(isMatch("a,b", "a@([-.,:; _])b", { windows: true }));
      assert(isMatch("a:b", "a@([-.,:; _])b", { windows: true }));
      assert(isMatch("a-b", "a@([-.,:; _])b", { windows: true }));
      assert(isMatch("a;b", "a@([-.,:; _])b", { windows: true }));
      assert(isMatch("a b", "a@([-.,:; _])b", { windows: true }));
      assert(isMatch("a_b", "a@([-.,:; _])b", { windows: true }));

      assert(isMatch("a.b", "a@([.])b", { windows: true }));
      assert(!isMatch("a,b", "a@([.])b", { windows: true }));
      assert(!isMatch("a:b", "a@([.])b", { windows: true }));
      assert(!isMatch("a-b", "a@([.])b", { windows: true }));
      assert(!isMatch("a;b", "a@([.])b", { windows: true }));
      assert(!isMatch("a b", "a@([.])b", { windows: true }));
      assert(!isMatch("a_b", "a@([.])b", { windows: true }));

      assert(!isMatch("a.b", "a@([^.])b", { windows: true }));
      assert(isMatch("a,b", "a@([^.])b", { windows: true }));
      assert(isMatch("a:b", "a@([^.])b", { windows: true }));
      assert(isMatch("a-b", "a@([^.])b", { windows: true }));
      assert(isMatch("a;b", "a@([^.])b", { windows: true }));
      assert(isMatch("a b", "a@([^.])b", { windows: true }));
      assert(isMatch("a_b", "a@([^.])b", { windows: true }));

      assert(isMatch("a.b", "a@([^x])b", { windows: true }));
      assert(isMatch("a,b", "a@([^x])b", { windows: true }));
      assert(isMatch("a:b", "a@([^x])b", { windows: true }));
      assert(isMatch("a-b", "a@([^x])b", { windows: true }));
      assert(isMatch("a;b", "a@([^x])b", { windows: true }));
      assert(isMatch("a b", "a@([^x])b", { windows: true }));
      assert(isMatch("a_b", "a@([^x])b", { windows: true }));

      assert(isMatch("a.b", "a+([^[:alnum:]])b", opts));
      assert(isMatch("a,b", "a+([^[:alnum:]])b", opts));
      assert(isMatch("a:b", "a+([^[:alnum:]])b", opts));
      assert(isMatch("a-b", "a+([^[:alnum:]])b", opts));
      assert(isMatch("a;b", "a+([^[:alnum:]])b", opts));
      assert(isMatch("a b", "a+([^[:alnum:]])b", opts));
      assert(isMatch("a_b", "a+([^[:alnum:]])b", opts));

      assert(isMatch("a.b", "a@(.|[^[:alnum:]])b", opts));
      assert(isMatch("a,b", "a@(.|[^[:alnum:]])b", opts));
      assert(isMatch("a:b", "a@(.|[^[:alnum:]])b", opts));
      assert(isMatch("a-b", "a@(.|[^[:alnum:]])b", opts));
      assert(isMatch("a;b", "a@(.|[^[:alnum:]])b", opts));
      assert(isMatch("a b", "a@(.|[^[:alnum:]])b", opts));
      assert(isMatch("a_b", "a@(.|[^[:alnum:]])b", opts));
    });

    it("should support POSIX character classes in extglobs", () => {
      const opts = { posix: true };
      assert(isMatch("a.c", "+([[:alpha:].])", opts));
      assert(isMatch("a.c", "+([[:alpha:].])+([[:alpha:].])", opts));
      assert(isMatch("a.c", "*([[:alpha:].])", opts));
      assert(isMatch("a.c", "*([[:alpha:].])*([[:alpha:].])", opts));
      assert(
        isMatch("a.c", "?([[:alpha:].])?([[:alpha:].])?([[:alpha:].])", opts),
      );
      assert(
        isMatch("a.c", "@([[:alpha:].])@([[:alpha:].])@([[:alpha:].])", opts),
      );
      assert(!isMatch(".", "!(\\.)", opts));
      assert(!isMatch(".", "!([[:alpha:].])", opts));
      assert(isMatch(".", "?([[:alpha:].])", opts));
      assert(isMatch(".", "@([[:alpha:].])", opts));
    });

    // ported from http://www.bashcookbook.com/bashinfo/source/bash-4.3/tests/extglob2.tests
    it("should pass extglob2 tests", () => {
      assert(!isMatch("baaac", "*(@(a))a@(c)", { windows: true }));
      assert(!isMatch("c", "*(@(a))a@(c)", { windows: true }));
      assert(
        !isMatch("egz", "@(b+(c)d|e+(f)g?|?(h)i@(j|k))", { windows: true }),
      );
      assert(!isMatch("foooofof", "*(f+(o))", { windows: true }));
      assert(!isMatch("foooofofx", "*(f*(o))", { windows: true }));
      assert(!isMatch("foooxfooxofoxfooox", "*(f*(o)x)", { windows: true }));
      assert(!isMatch("ofooofoofofooo", "*(f*(o))", { windows: true }));
      assert(
        !isMatch("ofoooxoofxoofoooxoofxofo", "*(*(of*(o)x)o)", {
          windows: true,
        }),
      );
      assert(!isMatch("oxfoxfox", "*(oxf+(ox))", { windows: true }));
      assert(!isMatch("xfoooofof", "*(f*(o))", { windows: true }));
      assert(isMatch("aaac", "*(@(a))a@(c)", { windows: true }));
      assert(isMatch("aac", "*(@(a))a@(c)", { windows: true }));
      assert(isMatch("abbcd", "@(ab|a*(b))*(c)d", { windows: true }));
      assert(isMatch("abcd", "?@(a|b)*@(c)d", { windows: true }));
      assert(isMatch("abcd", "@(ab|a*@(b))*(c)d", { windows: true }));
      assert(isMatch("ac", "*(@(a))a@(c)", { windows: true }));
      assert(isMatch("acd", "@(ab|a*(b))*(c)d", { windows: true }));
      assert(
        isMatch("effgz", "@(b+(c)d|e*(f)g?|?(h)i@(j|k))", { windows: true }),
      );
      assert(
        isMatch("efgz", "@(b+(c)d|e*(f)g?|?(h)i@(j|k))", { windows: true }),
      );
      assert(
        isMatch("egz", "@(b+(c)d|e*(f)g?|?(h)i@(j|k))", { windows: true }),
      );
      assert(
        isMatch("egzefffgzbcdij", "*(b+(c)d|e*(f)g?|?(h)i@(j|k))", {
          windows: true,
        }),
      );
      assert(
        isMatch("fffooofoooooffoofffooofff", "*(*(f)*(o))", { windows: true }),
      );
      assert(isMatch("ffo", "*(f*(o))", { windows: true }));
      assert(isMatch("fofo", "*(f*(o))", { windows: true }));
      assert(isMatch("foofoofo", "@(foo|f|fo)*(f|of+(o))", { windows: true }));
      assert(isMatch("fooofoofofooo", "*(f*(o))", { windows: true }));
      assert(isMatch("foooofo", "*(f*(o))", { windows: true }));
      assert(isMatch("foooofof", "*(f*(o))", { windows: true }));
      assert(isMatch("foooxfooxfoxfooox", "*(f*(o)x)", { windows: true }));
      assert(isMatch("foooxfooxfxfooox", "*(f*(o)x)", { windows: true }));
      assert(isMatch("ofoofo", "*(of+(o))", { windows: true }));
      assert(isMatch("ofoofo", "*(of+(o)|f)", { windows: true }));
      assert(isMatch("ofoooxoofxo", "*(*(of*(o)x)o)", { windows: true }));
      assert(
        isMatch("ofoooxoofxoofoooxoofxo", "*(*(of*(o)x)o)", { windows: true }),
      );
      assert(
        isMatch("ofoooxoofxoofoooxoofxoo", "*(*(of*(o)x)o)", { windows: true }),
      );
      assert(
        isMatch("ofoooxoofxoofoooxoofxooofxofxo", "*(*(of*(o)x)o)", {
          windows: true,
        }),
      );
      assert(isMatch("ofxoofxo", "*(*(of*(o)x)o)", { windows: true }));
      assert(isMatch("oofooofo", "*(of|oof+(o))", { windows: true }));
      assert(isMatch("oxfoxoxfox", "*(oxf+(ox))", { windows: true }));
    });

    it("should support exclusions", () => {
      assert(!isMatch("f", "!(f)", { windows: true }));
      assert(!isMatch("f", "*(!(f))", { windows: true }));
      assert(!isMatch("f", "+(!(f))", { windows: true }));
      assert(!isMatch("foo", "!(foo)", { windows: true }));
      assert(!isMatch("foob", "!(foo)b*", { windows: true }));
      assert(!isMatch("mad.moo.cow", "!(*.*).!(*.*)", { windows: true }));
      assert(
        !isMatch("mucca.pazza", "mu!(*(c))?.pa!(*(z))?", { windows: true }),
      );
      assert(!isMatch("zoot", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("fff", "!(f)", { windows: true }));
      assert(isMatch("fff", "*(!(f))", { windows: true }));
      assert(isMatch("fff", "+(!(f))", { windows: true }));
      assert(isMatch("foo", "!(f)", { windows: true }));
      assert(isMatch("foo", "!(x)", { windows: true }));
      assert(isMatch("foo", "!(x)*", { windows: true }));
      assert(isMatch("foo", "*(!(f))", { windows: true }));
      assert(isMatch("foo", "+(!(f))", { windows: true }));
      assert(isMatch("foobar", "!(foo)", { windows: true }));
      assert(isMatch("foot", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("foox", "@(!(z*)|*x)", { windows: true }));
      assert(isMatch("ooo", "!(f)", { windows: true }));
      assert(isMatch("ooo", "*(!(f))", { windows: true }));
      assert(isMatch("ooo", "+(!(f))", { windows: true }));
      assert(isMatch("zoox", "@(!(z*)|*x)", { windows: true }));
    });
  });
});
