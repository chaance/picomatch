import assert from "node:assert";
import pm from "../index.js";
const { isMatch } = pm;

describe("slash handling - posix", () => {
  it("should match a literal string", () => {
    assert(!isMatch("a/a", "(a/b)"));
    assert(isMatch("a/b", "(a/b)"));
    assert(!isMatch("a/c", "(a/b)"));
    assert(!isMatch("b/a", "(a/b)"));
    assert(!isMatch("b/b", "(a/b)"));
    assert(!isMatch("b/c", "(a/b)"));

    assert(!isMatch("a/a", "a/b"));
    assert(isMatch("a/b", "a/b"));
    assert(!isMatch("a/c", "a/b"));
    assert(!isMatch("b/a", "a/b"));
    assert(!isMatch("b/b", "a/b"));
    assert(!isMatch("b/c", "a/b"));
  });

  it("should match an array of literal strings", () => {
    assert(!isMatch("a/a", "a/b"));
    assert(isMatch("a/b", "a/b"));
    assert(!isMatch("a/c", "a/b"));
    assert(!isMatch("b/a", "a/b"));
    assert(!isMatch("b/b", "a/b"));
    assert(isMatch("b/b", "b/b"));
    assert(!isMatch("b/c", "a/b"));
  });

  it("should support regex logical or", () => {
    assert(isMatch("a/a", "a/(a|c)"));
    assert(!isMatch("a/b", "a/(a|c)"));
    assert(isMatch("a/c", "a/(a|c)"));

    assert(isMatch("a/a", "a/(a|b|c)"));
    assert(isMatch("a/b", "a/(a|b|c)"));
    assert(isMatch("a/c", "a/(a|b|c)"));
  });

  it("should support regex ranges", () => {
    assert(!isMatch("a/a", "a/[b-c]"));
    assert(isMatch("a/b", "a/[b-c]"));
    assert(isMatch("a/c", "a/[b-c]"));

    assert(isMatch("a/a", "a/[a-z]"));
    assert(isMatch("a/b", "a/[a-z]"));
    assert(isMatch("a/c", "a/[a-z]"));
    assert(!isMatch("a/x/y", "a/[a-z]"));
    assert(isMatch("a/x", "a/[a-z]"));
  });

  it("should support single globs (*)", () => {
    assert(isMatch("a", "*"));
    assert(isMatch("b", "*"));
    assert(!isMatch("a/a", "*"));
    assert(!isMatch("a/b", "*"));
    assert(!isMatch("a/c", "*"));
    assert(!isMatch("a/x", "*"));
    assert(!isMatch("a/a/a", "*"));
    assert(!isMatch("a/a/b", "*"));
    assert(!isMatch("a/a/a/a", "*"));
    assert(!isMatch("a/a/a/a/a", "*"));
    assert(!isMatch("x/y", "*"));
    assert(!isMatch("z/z", "*"));

    assert(!isMatch("a", "*/*"));
    assert(!isMatch("b", "*/*"));
    assert(isMatch("a/a", "*/*"));
    assert(isMatch("a/b", "*/*"));
    assert(isMatch("a/c", "*/*"));
    assert(isMatch("a/x", "*/*"));
    assert(!isMatch("a/a/a", "*/*"));
    assert(!isMatch("a/a/b", "*/*"));
    assert(!isMatch("a/a/a/a", "*/*"));
    assert(!isMatch("a/a/a/a/a", "*/*"));
    assert(isMatch("x/y", "*/*"));
    assert(isMatch("z/z", "*/*"));

    assert(!isMatch("a", "*/*/*"));
    assert(!isMatch("b", "*/*/*"));
    assert(!isMatch("a/a", "*/*/*"));
    assert(!isMatch("a/b", "*/*/*"));
    assert(!isMatch("a/c", "*/*/*"));
    assert(!isMatch("a/x", "*/*/*"));
    assert(isMatch("a/a/a", "*/*/*"));
    assert(isMatch("a/a/b", "*/*/*"));
    assert(!isMatch("a/a/a/a", "*/*/*"));
    assert(!isMatch("a/a/a/a/a", "*/*/*"));
    assert(!isMatch("x/y", "*/*/*"));
    assert(!isMatch("z/z", "*/*/*"));

    assert(!isMatch("a", "*/*/*/*"));
    assert(!isMatch("b", "*/*/*/*"));
    assert(!isMatch("a/a", "*/*/*/*"));
    assert(!isMatch("a/b", "*/*/*/*"));
    assert(!isMatch("a/c", "*/*/*/*"));
    assert(!isMatch("a/x", "*/*/*/*"));
    assert(!isMatch("a/a/a", "*/*/*/*"));
    assert(!isMatch("a/a/b", "*/*/*/*"));
    assert(isMatch("a/a/a/a", "*/*/*/*"));
    assert(!isMatch("a/a/a/a/a", "*/*/*/*"));
    assert(!isMatch("x/y", "*/*/*/*"));
    assert(!isMatch("z/z", "*/*/*/*"));

    assert(!isMatch("a", "*/*/*/*/*"));
    assert(!isMatch("b", "*/*/*/*/*"));
    assert(!isMatch("a/a", "*/*/*/*/*"));
    assert(!isMatch("a/b", "*/*/*/*/*"));
    assert(!isMatch("a/c", "*/*/*/*/*"));
    assert(!isMatch("a/x", "*/*/*/*/*"));
    assert(!isMatch("a/a/a", "*/*/*/*/*"));
    assert(!isMatch("a/a/b", "*/*/*/*/*"));
    assert(!isMatch("a/a/a/a", "*/*/*/*/*"));
    assert(isMatch("a/a/a/a/a", "*/*/*/*/*"));
    assert(!isMatch("x/y", "*/*/*/*/*"));
    assert(!isMatch("z/z", "*/*/*/*/*"));

    assert(!isMatch("a", "a/*"));
    assert(!isMatch("b", "a/*"));
    assert(isMatch("a/a", "a/*"));
    assert(isMatch("a/b", "a/*"));
    assert(isMatch("a/c", "a/*"));
    assert(isMatch("a/x", "a/*"));
    assert(!isMatch("a/a/a", "a/*"));
    assert(!isMatch("a/a/b", "a/*"));
    assert(!isMatch("a/a/a/a", "a/*"));
    assert(!isMatch("a/a/a/a/a", "a/*"));
    assert(!isMatch("x/y", "a/*"));
    assert(!isMatch("z/z", "a/*"));

    assert(!isMatch("a", "a/*/*"));
    assert(!isMatch("b", "a/*/*"));
    assert(!isMatch("a/a", "a/*/*"));
    assert(!isMatch("a/b", "a/*/*"));
    assert(!isMatch("a/c", "a/*/*"));
    assert(!isMatch("a/x", "a/*/*"));
    assert(isMatch("a/a/a", "a/*/*"));
    assert(isMatch("a/a/b", "a/*/*"));
    assert(!isMatch("a/a/a/a", "a/*/*"));
    assert(!isMatch("a/a/a/a/a", "a/*/*"));
    assert(!isMatch("x/y", "a/*/*"));
    assert(!isMatch("z/z", "a/*/*"));

    assert(!isMatch("a", "a/*/*/*"));
    assert(!isMatch("b", "a/*/*/*"));
    assert(!isMatch("a/a", "a/*/*/*"));
    assert(!isMatch("a/b", "a/*/*/*"));
    assert(!isMatch("a/c", "a/*/*/*"));
    assert(!isMatch("a/x", "a/*/*/*"));
    assert(!isMatch("a/a/a", "a/*/*/*"));
    assert(!isMatch("a/a/b", "a/*/*/*"));
    assert(isMatch("a/a/a/a", "a/*/*/*"));
    assert(!isMatch("a/a/a/a/a", "a/*/*/*"));
    assert(!isMatch("x/y", "a/*/*/*"));
    assert(!isMatch("z/z", "a/*/*/*"));

    assert(!isMatch("a", "a/*/*/*/*"));
    assert(!isMatch("b", "a/*/*/*/*"));
    assert(!isMatch("a/a", "a/*/*/*/*"));
    assert(!isMatch("a/b", "a/*/*/*/*"));
    assert(!isMatch("a/c", "a/*/*/*/*"));
    assert(!isMatch("a/x", "a/*/*/*/*"));
    assert(!isMatch("a/a/a", "a/*/*/*/*"));
    assert(!isMatch("a/a/b", "a/*/*/*/*"));
    assert(!isMatch("a/a/a/a", "a/*/*/*/*"));
    assert(isMatch("a/a/a/a/a", "a/*/*/*/*"));
    assert(!isMatch("x/y", "a/*/*/*/*"));
    assert(!isMatch("z/z", "a/*/*/*/*"));

    assert(!isMatch("a", "a/*/a"));
    assert(!isMatch("b", "a/*/a"));
    assert(!isMatch("a/a", "a/*/a"));
    assert(!isMatch("a/b", "a/*/a"));
    assert(!isMatch("a/c", "a/*/a"));
    assert(!isMatch("a/x", "a/*/a"));
    assert(isMatch("a/a/a", "a/*/a"));
    assert(!isMatch("a/a/b", "a/*/a"));
    assert(!isMatch("a/a/a/a", "a/*/a"));
    assert(!isMatch("a/a/a/a/a", "a/*/a"));
    assert(!isMatch("x/y", "a/*/a"));
    assert(!isMatch("z/z", "a/*/a"));

    assert(!isMatch("a", "a/*/b"));
    assert(!isMatch("b", "a/*/b"));
    assert(!isMatch("a/a", "a/*/b"));
    assert(!isMatch("a/b", "a/*/b"));
    assert(!isMatch("a/c", "a/*/b"));
    assert(!isMatch("a/x", "a/*/b"));
    assert(!isMatch("a/a/a", "a/*/b"));
    assert(isMatch("a/a/b", "a/*/b"));
    assert(!isMatch("a/a/a/a", "a/*/b"));
    assert(!isMatch("a/a/a/a/a", "a/*/b"));
    assert(!isMatch("x/y", "a/*/b"));
    assert(!isMatch("z/z", "a/*/b"));
  });

  it("should support globstars (**)", () => {
    assert(isMatch("a", "a"));
    assert(!isMatch("a/", "a"));
    assert(!isMatch("a/a", "a"));
    assert(!isMatch("a/b", "a"));
    assert(!isMatch("a/c", "a"));
    assert(!isMatch("a/x", "a"));
    assert(!isMatch("a/x/y", "a"));
    assert(!isMatch("a/x/y/z", "a"));

    assert(isMatch("a", "*"));
    assert(isMatch("a/", "*", { relaxSlashes: true }));
    assert(isMatch("a/", "*{,/}"));
    assert(!isMatch("a/a", "*"));
    assert(!isMatch("a/b", "*"));
    assert(!isMatch("a/c", "*"));
    assert(!isMatch("a/x", "*"));
    assert(!isMatch("a/x/y", "*"));
    assert(!isMatch("a/x/y/z", "*"));

    assert(!isMatch("a", "*/"));
    assert(isMatch("a/", "*/"));
    assert(!isMatch("a/a", "*/"));
    assert(!isMatch("a/b", "*/"));
    assert(!isMatch("a/c", "*/"));
    assert(!isMatch("a/x", "*/"));
    assert(!isMatch("a/x/y", "*/"));
    assert(!isMatch("a/x/y/z", "*/"));

    assert(!isMatch("a", "*/*"));
    assert(!isMatch("a/", "*/*"));
    assert(isMatch("a/a", "*/*"));
    assert(isMatch("a/b", "*/*"));
    assert(isMatch("a/c", "*/*"));
    assert(isMatch("a/x", "*/*"));
    assert(!isMatch("a/x/y", "*/*"));
    assert(!isMatch("a/x/y/z", "*/*"));

    assert(isMatch("a", "**"));
    assert(isMatch("a/", "**"));
    assert(isMatch("a/a", "**"));
    assert(isMatch("a/b", "**"));
    assert(isMatch("a/c", "**"));
    assert(isMatch("a/x", "**"));
    assert(isMatch("a/x/y", "**"));
    assert(isMatch("a/x/y/z", "**"));

    assert(!isMatch("a/", "**/a"));
    assert(!isMatch("a/b", "**/a"));
    assert(!isMatch("a/c", "**/a"));
    assert(!isMatch("a/x", "**/a"));
    assert(!isMatch("a/x/y/z", "**/a"));
    assert(isMatch("a/x/y/z/a", "**/a"));
    assert(isMatch("a", "**/a"));
    assert(isMatch("a/a", "**/a"));

    assert(!isMatch("a", "a/*"));
    assert(!isMatch("a/", "a/*"));
    assert(isMatch("a/a", "a/*"));
    assert(isMatch("a/b", "a/*"));
    assert(isMatch("a/c", "a/*"));
    assert(isMatch("a/x", "a/*"));
    assert(!isMatch("a/x/y", "a/*"));
    assert(!isMatch("a/x/y/z", "a/*"));

    assert(isMatch("a", "a/**"));
    assert(isMatch("a/", "a/**"));
    assert(isMatch("a/a", "a/**"));
    assert(isMatch("a/b", "a/**"));
    assert(isMatch("a/c", "a/**"));
    assert(isMatch("a/x", "a/**"));
    assert(isMatch("a/x/y", "a/**"));
    assert(isMatch("a/x/y/z", "a/**"));

    assert(!isMatch("a", "a/**/*"));
    assert(!isMatch("a/", "a/**/*"));
    assert(isMatch("a/a", "a/**/*"));
    assert(isMatch("a/b", "a/**/*"));
    assert(isMatch("a/c", "a/**/*"));
    assert(isMatch("a/x", "a/**/*"));
    assert(isMatch("a/x/y", "a/**/*"));
    assert(isMatch("a/x/y/z", "a/**/*"));

    assert(!isMatch("a", "a/**/**/*"));
    assert(!isMatch("a/", "a/**/**/*"));
    assert(isMatch("a/a", "a/**/**/*"));
    assert(isMatch("a/b", "a/**/**/*"));
    assert(isMatch("a/c", "a/**/**/*"));
    assert(isMatch("a/x", "a/**/**/*"));
    assert(isMatch("a/x/y", "a/**/**/*"));
    assert(isMatch("a/x/y/z", "a/**/**/*"));

    assert(isMatch("a/b/foo/bar/baz.qux", "a/b/**/bar/**/*.*"));
    assert(isMatch("a/b/bar/baz.qux", "a/b/**/bar/**/*.*"));
  });

  it("should support negation patterns", () => {
    assert(isMatch("a/a", "!a/b"));
    assert(!isMatch("a/b", "!a/b"));
    assert(isMatch("a/c", "!a/b"));
    assert(isMatch("b/a", "!a/b"));
    assert(isMatch("b/b", "!a/b"));
    assert(isMatch("b/c", "!a/b"));

    assert(isMatch("a/a", ["*/*", "!a/b", "!*/c"]));
    assert(isMatch("a/b", ["*/*", "!a/b", "!*/c"]));
    assert(isMatch("a/c", ["*/*", "!a/b", "!*/c"]));
    assert(isMatch("b/a", ["*/*", "!a/b", "!*/c"]));
    assert(isMatch("b/b", ["*/*", "!a/b", "!*/c"]));
    assert(isMatch("b/c", ["*/*", "!a/b", "!*/c"]));

    assert(isMatch("a/a", ["!a/b", "!*/c"]));
    assert(isMatch("a/b", ["!a/b", "!*/c"]));
    assert(isMatch("a/c", ["!a/b", "!*/c"]));
    assert(isMatch("b/a", ["!a/b", "!*/c"]));
    assert(isMatch("b/b", ["!a/b", "!*/c"]));
    assert(isMatch("b/c", ["!a/b", "!*/c"]));

    assert(isMatch("a/a", ["!a/b", "!a/c"]));
    assert(isMatch("a/b", ["!a/b", "!a/c"]));
    assert(isMatch("a/c", ["!a/b", "!a/c"]));
    assert(isMatch("b/a", ["!a/b", "!a/c"]));
    assert(isMatch("b/b", ["!a/b", "!a/c"]));
    assert(isMatch("b/c", ["!a/b", "!a/c"]));

    assert(isMatch("a/a", "!a/(b)"));
    assert(!isMatch("a/b", "!a/(b)"));
    assert(isMatch("a/c", "!a/(b)"));
    assert(isMatch("b/a", "!a/(b)"));
    assert(isMatch("b/b", "!a/(b)"));
    assert(isMatch("b/c", "!a/(b)"));

    assert(isMatch("a/a", "!(a/b)"));
    assert(!isMatch("a/b", "!(a/b)"));
    assert(isMatch("a/c", "!(a/b)"));
    assert(isMatch("b/a", "!(a/b)"));
    assert(isMatch("b/b", "!(a/b)"));
    assert(isMatch("b/c", "!(a/b)"));
  });

  it("should work with file extensions", () => {
    assert(!isMatch("a.txt", "a/**/*.txt"));
    assert(isMatch("a/b.txt", "a/**/*.txt"));
    assert(isMatch("a/x/y.txt", "a/**/*.txt"));
    assert(!isMatch("a/x/y/z", ["a/**/*.txt"]));

    assert(!isMatch("a.txt", "a/*.txt"));
    assert(isMatch("a/b.txt", "a/*.txt"));
    assert(!isMatch("a/x/y.txt", "a/*.txt"));
    assert(!isMatch("a/x/y/z", "a/*.txt"));

    assert(isMatch("a.txt", "a*.txt"));
    assert(!isMatch("a/b.txt", "a*.txt"));
    assert(!isMatch("a/x/y.txt", "a*.txt"));
    assert(!isMatch("a/x/y/z", "a*.txt"));

    assert(isMatch("a.txt", "*.txt"));
    assert(!isMatch("a/b.txt", "*.txt"));
    assert(!isMatch("a/x/y.txt", "*.txt"));
    assert(!isMatch("a/x/y/z", "*.txt"));
  });

  it("should match one directory level with a single star (*)", () => {
    assert(!isMatch("/a", "*/"));
    assert(!isMatch("/a", "*/*/*"));
    assert(!isMatch("/a", "*/*/*/*"));
    assert(!isMatch("/a", "*/*/*/*/*"));
    assert(!isMatch("/a", "/*/"));
    assert(!isMatch("/a", "a/*"));
    assert(!isMatch("/a", "a/*/*"));
    assert(!isMatch("/a", "a/*/*/*"));
    assert(!isMatch("/a", "a/*/*/*/*"));
    assert(!isMatch("/a", "a/*/a"));
    assert(!isMatch("/a", "a/*/b"));
    assert(!isMatch("/a/", "*"));
    assert(!isMatch("/a/", "**/*", { strictSlashes: true }));
    assert(!isMatch("/a/", "*/"));
    assert(!isMatch("/a/", "*/*", { strictSlashes: true }));
    assert(!isMatch("/a/", "*/*/*"));
    assert(!isMatch("/a/", "*/*/*/*"));
    assert(!isMatch("/a/", "*/*/*/*/*"));
    assert(!isMatch("/a/", "/*", { strictSlashes: true }));
    assert(!isMatch("/a/", "a/*"));
    assert(!isMatch("/a/", "a/*/*"));
    assert(!isMatch("/a/", "a/*/*/*"));
    assert(!isMatch("/a/", "a/*/*/*/*"));
    assert(!isMatch("/a/", "a/*/a"));
    assert(!isMatch("/a/", "a/*/b"));
    assert(!isMatch("/ab", "*"));
    assert(!isMatch("/abc", "*"));
    assert(!isMatch("/b", "*"));
    assert(!isMatch("/b", "*/"));
    assert(!isMatch("/b", "*/*/*"));
    assert(!isMatch("/b", "*/*/*/*"));
    assert(!isMatch("/b", "*/*/*/*/*"));
    assert(!isMatch("/b", "/*/"));
    assert(!isMatch("/b", "a/*"));
    assert(!isMatch("/b", "a/*/*"));
    assert(!isMatch("/b", "a/*/*/*"));
    assert(!isMatch("/b", "a/*/*/*/*"));
    assert(!isMatch("/b", "a/*/a"));
    assert(!isMatch("/b", "a/*/b"));
    assert(!isMatch("a", "*/"));
    assert(!isMatch("a", "*/*"));
    assert(!isMatch("a", "*/*/*"));
    assert(!isMatch("a", "*/*/*/*"));
    assert(!isMatch("a", "*/*/*/*/*"));
    assert(!isMatch("a", "/*"));
    assert(!isMatch("a", "/*/"));
    assert(!isMatch("a", "a/*"));
    assert(!isMatch("a", "a/*/*"));
    assert(!isMatch("a", "a/*/*/*"));
    assert(!isMatch("a", "a/*/*/*/*"));
    assert(!isMatch("a", "a/*/a"));
    assert(!isMatch("a", "a/*/b"));
    assert(!isMatch("a/", "*", { strictSlashes: true }));
    assert(!isMatch("a/", "**/*", { strictSlashes: true }));
    assert(!isMatch("a/", "*/*", { strictSlashes: true }));
    assert(!isMatch("a/", "*/*/*/*", { strictSlashes: true }));
    assert(!isMatch("a/", "*/*/*/*/*", { strictSlashes: true }));
    assert(!isMatch("a/", "/*", { strictSlashes: true }));
    assert(!isMatch("a/", "/*/", { strictSlashes: true }));
    assert(!isMatch("a/", "a/*", { strictSlashes: true }));
    assert(!isMatch("a/", "a/*/*", { strictSlashes: true }));
    assert(!isMatch("a/", "a/*/*/*", { strictSlashes: true }));
    assert(!isMatch("a/", "a/*/*/*/*", { strictSlashes: true }));
    assert(!isMatch("a/", "a/*/a", { strictSlashes: true }));
    assert(!isMatch("a/", "a/*/b", { strictSlashes: true }));
    assert(!isMatch("a/a", "*"));
    assert(!isMatch("a/a", "*/"));
    assert(!isMatch("a/a", "*/*/*"));
    assert(!isMatch("a/a", "*/*/*/*"));
    assert(!isMatch("a/a", "*/*/*/*/*"));
    assert(!isMatch("a/a", "/*"));
    assert(!isMatch("a/a", "/*/"));
    assert(!isMatch("a/a", "a/*/*"));
    assert(!isMatch("a/a", "a/*/*/*"));
    assert(!isMatch("a/a", "a/*/*/*/*"));
    assert(!isMatch("a/a", "a/*/a"));
    assert(!isMatch("a/a", "a/*/b"));
    assert(!isMatch("a/a/a", "*"));
    assert(!isMatch("a/a/a", "*/"));
    assert(!isMatch("a/a/a", "*/*"));
    assert(!isMatch("a/a/a", "*/*/*/*"));
    assert(!isMatch("a/a/a", "*/*/*/*/*"));
    assert(!isMatch("a/a/a", "/*"));
    assert(!isMatch("a/a/a", "/*/"));
    assert(!isMatch("a/a/a", "a/*"));
    assert(!isMatch("a/a/a", "a/*/*/*"));
    assert(!isMatch("a/a/a", "a/*/*/*/*"));
    assert(!isMatch("a/a/a", "a/*/b"));
    assert(!isMatch("a/a/a/a", "*"));
    assert(!isMatch("a/a/a/a", "*/"));
    assert(!isMatch("a/a/a/a", "*/*"));
    assert(!isMatch("a/a/a/a", "*/*/*"));
    assert(!isMatch("a/a/a/a", "*/*/*/*/*"));
    assert(!isMatch("a/a/a/a", "/*"));
    assert(!isMatch("a/a/a/a", "/*/"));
    assert(!isMatch("a/a/a/a", "a/*"));
    assert(!isMatch("a/a/a/a", "a/*/*"));
    assert(!isMatch("a/a/a/a", "a/*/*/*/*"));
    assert(!isMatch("a/a/a/a", "a/*/a"));
    assert(!isMatch("a/a/a/a", "a/*/b"));
    assert(!isMatch("a/a/a/a/a", "*"));
    assert(!isMatch("a/a/a/a/a", "*/"));
    assert(!isMatch("a/a/a/a/a", "*/*"));
    assert(!isMatch("a/a/a/a/a", "*/*/*"));
    assert(!isMatch("a/a/a/a/a", "*/*/*/*"));
    assert(!isMatch("a/a/a/a/a", "/*"));
    assert(!isMatch("a/a/a/a/a", "/*/"));
    assert(!isMatch("a/a/a/a/a", "a/*"));
    assert(!isMatch("a/a/a/a/a", "a/*/*"));
    assert(!isMatch("a/a/a/a/a", "a/*/*/*"));
    assert(!isMatch("a/a/a/a/a", "a/*/a"));
    assert(!isMatch("a/a/a/a/a", "a/*/b"));
    assert(!isMatch("a/a/b", "*"));
    assert(!isMatch("a/a/b", "*/"));
    assert(!isMatch("a/a/b", "*/*"));
    assert(!isMatch("a/a/b", "*/*/*/*"));
    assert(!isMatch("a/a/b", "*/*/*/*/*"));
    assert(!isMatch("a/a/b", "/*"));
    assert(!isMatch("a/a/b", "/*/"));
    assert(!isMatch("a/a/b", "a/*"));
    assert(!isMatch("a/a/b", "a/*/*/*"));
    assert(!isMatch("a/a/b", "a/*/*/*/*"));
    assert(!isMatch("a/a/b", "a/*/a"));
    assert(!isMatch("a/b", "*"));
    assert(!isMatch("a/b", "*/"));
    assert(!isMatch("a/b", "*/*/*/*"));
    assert(!isMatch("a/b", "*/*/*/*/*"));
    assert(!isMatch("a/b", "/*"));
    assert(!isMatch("a/b", "/*/"));
    assert(!isMatch("a/b", "a/*/*"));
    assert(!isMatch("a/b", "a/*/*/*"));
    assert(!isMatch("a/b", "a/*/*/*/*"));
    assert(!isMatch("a/b", "a/*/a"));
    assert(!isMatch("a/b", "a/*/b"));
    assert(!isMatch("a/c", "*"));
    assert(!isMatch("a/c", "*/"));
    assert(!isMatch("a/c", "*/*/*/*"));
    assert(!isMatch("a/c", "*/*/*/*/*"));
    assert(!isMatch("a/c", "/*"));
    assert(!isMatch("a/c", "/*/"));
    assert(!isMatch("a/c", "a/*/*"));
    assert(!isMatch("a/c", "a/*/*/*"));
    assert(!isMatch("a/c", "a/*/*/*/*"));
    assert(!isMatch("a/c", "a/*/a"));
    assert(!isMatch("a/c", "a/*/b"));
    assert(!isMatch("a/x", "*"));
    assert(!isMatch("a/x", "*/"));
    assert(!isMatch("a/x", "*/*/*/*"));
    assert(!isMatch("a/x", "*/*/*/*/*"));
    assert(!isMatch("a/x", "/*"));
    assert(!isMatch("a/x", "/*/"));
    assert(!isMatch("a/x", "a/*/*"));
    assert(!isMatch("a/x", "a/*/*/*"));
    assert(!isMatch("a/x", "a/*/*/*/*"));
    assert(!isMatch("a/x", "a/*/a"));
    assert(!isMatch("a/x", "a/*/b"));
    assert(!isMatch("b", "*/"));
    assert(!isMatch("b", "*/*"));
    assert(!isMatch("b", "*/*/*/*"));
    assert(!isMatch("b", "*/*/*/*/*"));
    assert(!isMatch("b", "/*"));
    assert(!isMatch("b", "/*/"));
    assert(!isMatch("b", "a/*"));
    assert(!isMatch("b", "a/*/*"));
    assert(!isMatch("b", "a/*/*/*"));
    assert(!isMatch("b", "a/*/*/*/*"));
    assert(!isMatch("b", "a/*/a"));
    assert(!isMatch("b", "a/*/b"));
    assert(!isMatch("x/y", "*"));
    assert(!isMatch("x/y", "*/"));
    assert(!isMatch("x/y", "*/*/*"));
    assert(!isMatch("x/y", "*/*/*/*"));
    assert(!isMatch("x/y", "*/*/*/*/*"));
    assert(!isMatch("x/y", "/*"));
    assert(!isMatch("x/y", "/*/"));
    assert(!isMatch("x/y", "a/*"));
    assert(!isMatch("x/y", "a/*/*"));
    assert(!isMatch("x/y", "a/*/*/*"));
    assert(!isMatch("x/y", "a/*/*/*/*"));
    assert(!isMatch("x/y", "a/*/a"));
    assert(!isMatch("x/y", "a/*/b"));
    assert(!isMatch("z/z", "*"));
    assert(!isMatch("z/z", "*/"));
    assert(!isMatch("z/z", "*/*/*/*"));
    assert(!isMatch("z/z", "*/*/*/*/*"));
    assert(!isMatch("z/z", "/*"));
    assert(!isMatch("z/z", "/*/"));
    assert(!isMatch("z/z", "a/*"));
    assert(!isMatch("z/z", "a/*/*"));
    assert(!isMatch("z/z", "a/*/*/*"));
    assert(!isMatch("z/z", "a/*/*/*/*"));
    assert(!isMatch("z/z", "a/*/a"));
    assert(!isMatch("z/z", "a/*/b"));
    assert(isMatch("/a", "**/*"));
    assert(isMatch("/a", "*/*"));
    assert(isMatch("/a", "/*"));
    assert(isMatch("/a/", "**/*{,/}"));
    assert(isMatch("/a/", "*/*"));
    assert(isMatch("/a/", "*/*{,/}"));
    assert(isMatch("/a/", "/*"));
    assert(isMatch("/a/", "/*/"));
    assert(isMatch("/a/", "/*{,/}"));
    assert(isMatch("/b", "**/*"));
    assert(isMatch("/b", "*/*"));
    assert(isMatch("/b", "/*"));
    assert(isMatch("a", "*"));
    assert(isMatch("a", "**/*"));
    assert(isMatch("a/", "**/*{,/}"));
    assert(isMatch("a/", "*/"));
    assert(isMatch("a/", "*{,/}"));
    assert(isMatch("a/a", "**/*"));
    assert(isMatch("a/a", "*/*"));
    assert(isMatch("a/a", "a/*"));
    assert(isMatch("a/a/a", "**/*"));
    assert(isMatch("a/a/a", "*/*/*"));
    assert(isMatch("a/a/a", "a/*/*"));
    assert(isMatch("a/a/a", "a/*/a"));
    assert(isMatch("a/a/a/a", "**/*"));
    assert(isMatch("a/a/a/a", "*/*/*/*"));
    assert(isMatch("a/a/a/a", "a/*/*/*"));
    assert(isMatch("a/a/a/a/a", "**/*"));
    assert(isMatch("a/a/a/a/a", "*/*/*/*/*"));
    assert(isMatch("a/a/a/a/a", "a/*/*/*/*"));
    assert(isMatch("a/a/b", "**/*"));
    assert(isMatch("a/a/b", "a/*/*"));
    assert(isMatch("a/a/b", "a/*/b"));
    assert(isMatch("a/b", "**/*"));
    assert(isMatch("a/b", "*/*"));
    assert(isMatch("a/b", "a/*"));
    assert(isMatch("a/c", "**/*"));
    assert(isMatch("a/c", "*/*"));
    assert(isMatch("a/c", "a/*"));
    assert(isMatch("a/x", "**/*"));
    assert(isMatch("a/x", "*/*"));
    assert(isMatch("a/x", "a/*"));
    assert(isMatch("b", "*"));
    assert(isMatch("b", "**/*"));
    assert(isMatch("x/y", "**/*"));
    assert(isMatch("x/y", "*/*"));
    assert(isMatch("z/z", "**/*"));
    assert(isMatch("z/z", "*/*"));
  });

  it("should match one or more directories with a globstar", () => {
    assert(!isMatch("a/", "**/a"));
    assert(!isMatch("/a/", "**/a"));
    assert(!isMatch("a/a/", "**/a"));
    assert(!isMatch("/a/a/", "**/a"));
    assert(!isMatch("a/a/a/", "**/a"));

    assert(isMatch("a", "**/a"));
    assert(isMatch("a/a", "**/a"));
    assert(isMatch("a/a/a", "**/a"));
    assert(isMatch("/a", "**/a"));
    assert(isMatch("a/a/", "**/a/*{,/}"));
    assert(!isMatch("a/a/", "**/a/*", { strictSlashes: true }));
    assert(isMatch("/a/a", "**/a"));

    assert(isMatch("a", "a/**"));
    assert(!isMatch("/a", "a/**"));
    assert(!isMatch("/a/", "a/**"));
    assert(!isMatch("/a/a", "a/**"));
    assert(!isMatch("/a/a/", "a/**"));
    assert(isMatch("/a", "/a/**"));
    assert(isMatch("/a/", "/a/**"));
    assert(isMatch("/a/a", "/a/**"));
    assert(isMatch("/a/a/", "/a/**"));
    assert(isMatch("a/", "a/**"));
    assert(isMatch("a/a", "a/**"));
    assert(isMatch("a/a/", "a/**"));
    assert(isMatch("a/a/a", "a/**"));
    assert(isMatch("a/a/a/", "a/**"));

    assert(isMatch("a", "**/a/**"));
    assert(isMatch("/a", "**/a/**"));
    assert(isMatch("/a/", "**/a/**"));
    assert(isMatch("/a/a", "**/a/**"));
    assert(isMatch("/a/a/", "**/a/**"));
    assert(isMatch("a/", "**/a/**"));
    assert(isMatch("a/a", "**/a/**"));
    assert(isMatch("a/a/", "**/a/**"));
    assert(isMatch("a/a/a", "**/a/**"));
    assert(isMatch("a/a/a/", "**/a/**"));
  });

  it("should match one or more characters", () => {
    assert(isMatch("a", "*"));
    assert(isMatch("aa", "*"));
    assert(isMatch("aaa", "*"));
    assert(isMatch("aaaa", "*"));
    assert(isMatch("ab", "*"));
    assert(isMatch("b", "*"));
    assert(isMatch("bb", "*"));
    assert(isMatch("c", "*"));
    assert(isMatch("cc", "*"));
    assert(isMatch("cac", "*"));
    assert(!isMatch("a/a", "*"));
    assert(!isMatch("a/b", "*"));
    assert(!isMatch("a/c", "*"));
    assert(!isMatch("a/x", "*"));
    assert(!isMatch("a/a/a", "*"));
    assert(!isMatch("a/a/b", "*"));
    assert(!isMatch("a/a/a/a", "*"));
    assert(!isMatch("a/a/a/a/a", "*"));
    assert(!isMatch("x/y", "*"));
    assert(!isMatch("z/z", "*"));

    assert(isMatch("a", "a*"));
    assert(isMatch("aa", "a*"));
    assert(isMatch("aaa", "a*"));
    assert(isMatch("aaaa", "a*"));
    assert(isMatch("ab", "a*"));
    assert(!isMatch("b", "a*"));
    assert(!isMatch("bb", "a*"));
    assert(!isMatch("c", "a*"));
    assert(!isMatch("cc", "a*"));
    assert(!isMatch("cac", "a*"));
    assert(!isMatch("a/a", "a*"));
    assert(!isMatch("a/b", "a*"));
    assert(!isMatch("a/c", "a*"));
    assert(!isMatch("a/x", "a*"));
    assert(!isMatch("a/a/a", "a*"));
    assert(!isMatch("a/a/b", "a*"));
    assert(!isMatch("a/a/a/a", "a*"));
    assert(!isMatch("a/a/a/a/a", "a*"));
    assert(!isMatch("x/y", "a*"));
    assert(!isMatch("z/z", "a*"));

    assert(!isMatch("a", "*b"));
    assert(!isMatch("aa", "*b"));
    assert(!isMatch("aaa", "*b"));
    assert(!isMatch("aaaa", "*b"));
    assert(isMatch("ab", "*b"));
    assert(isMatch("b", "*b"));
    assert(isMatch("bb", "*b"));
    assert(!isMatch("c", "*b"));
    assert(!isMatch("cc", "*b"));
    assert(!isMatch("cac", "*b"));
    assert(!isMatch("a/a", "*b"));
    assert(!isMatch("a/b", "*b"));
    assert(!isMatch("a/c", "*b"));
    assert(!isMatch("a/x", "*b"));
    assert(!isMatch("a/a/a", "*b"));
    assert(!isMatch("a/a/b", "*b"));
    assert(!isMatch("a/a/a/a", "*b"));
    assert(!isMatch("a/a/a/a/a", "*b"));
    assert(!isMatch("x/y", "*b"));
    assert(!isMatch("z/z", "*b"));
  });

  it("should match one or zero characters", () => {
    assert(isMatch("a", "*"));
    assert(isMatch("aa", "*"));
    assert(isMatch("aaa", "*"));
    assert(isMatch("aaaa", "*"));
    assert(isMatch("ab", "*"));
    assert(isMatch("b", "*"));
    assert(isMatch("bb", "*"));
    assert(isMatch("c", "*"));
    assert(isMatch("cc", "*"));
    assert(isMatch("cac", "*"));
    assert(!isMatch("a/a", "*"));
    assert(!isMatch("a/b", "*"));
    assert(!isMatch("a/c", "*"));
    assert(!isMatch("a/x", "*"));
    assert(!isMatch("a/a/a", "*"));
    assert(!isMatch("a/a/b", "*"));
    assert(!isMatch("a/a/a/a", "*"));
    assert(!isMatch("a/a/a/a/a", "*"));
    assert(!isMatch("x/y", "*"));
    assert(!isMatch("z/z", "*"));

    assert(isMatch("a", "*a*"));
    assert(isMatch("aa", "*a*"));
    assert(isMatch("aaa", "*a*"));
    assert(isMatch("aaaa", "*a*"));
    assert(isMatch("ab", "*a*"));
    assert(!isMatch("b", "*a*"));
    assert(!isMatch("bb", "*a*"));
    assert(!isMatch("c", "*a*"));
    assert(!isMatch("cc", "*a*"));
    assert(isMatch("cac", "*a*"));
    assert(!isMatch("a/a", "*a*"));
    assert(!isMatch("a/b", "*a*"));
    assert(!isMatch("a/c", "*a*"));
    assert(!isMatch("a/x", "*a*"));
    assert(!isMatch("a/a/a", "*a*"));
    assert(!isMatch("a/a/b", "*a*"));
    assert(!isMatch("a/a/a/a", "*a*"));
    assert(!isMatch("a/a/a/a/a", "*a*"));
    assert(!isMatch("x/y", "*a*"));
    assert(!isMatch("z/z", "*a*"));

    assert(!isMatch("a", "*b*"));
    assert(!isMatch("aa", "*b*"));
    assert(!isMatch("aaa", "*b*"));
    assert(!isMatch("aaaa", "*b*"));
    assert(isMatch("ab", "*b*"));
    assert(isMatch("b", "*b*"));
    assert(isMatch("bb", "*b*"));
    assert(!isMatch("c", "*b*"));
    assert(!isMatch("cc", "*b*"));
    assert(!isMatch("cac", "*b*"));
    assert(!isMatch("a/a", "*b*"));
    assert(!isMatch("a/b", "*b*"));
    assert(!isMatch("a/c", "*b*"));
    assert(!isMatch("a/x", "*b*"));
    assert(!isMatch("a/a/a", "*b*"));
    assert(!isMatch("a/a/b", "*b*"));
    assert(!isMatch("a/a/a/a", "*b*"));
    assert(!isMatch("a/a/a/a/a", "*b*"));
    assert(!isMatch("x/y", "*b*"));
    assert(!isMatch("z/z", "*b*"));

    assert(!isMatch("a", "*c*"));
    assert(!isMatch("aa", "*c*"));
    assert(!isMatch("aaa", "*c*"));
    assert(!isMatch("aaaa", "*c*"));
    assert(!isMatch("ab", "*c*"));
    assert(!isMatch("b", "*c*"));
    assert(!isMatch("bb", "*c*"));
    assert(isMatch("c", "*c*"));
    assert(isMatch("cc", "*c*"));
    assert(isMatch("cac", "*c*"));
    assert(!isMatch("a/a", "*c*"));
    assert(!isMatch("a/b", "*c*"));
    assert(!isMatch("a/c", "*c*"));
    assert(!isMatch("a/x", "*c*"));
    assert(!isMatch("a/a/a", "*c*"));
    assert(!isMatch("a/a/b", "*c*"));
    assert(!isMatch("a/a/a/a", "*c*"));
    assert(!isMatch("a/a/a/a/a", "*c*"));
    assert(!isMatch("x/y", "*c*"));
    assert(!isMatch("z/z", "*c*"));
  });

  it("should respect trailing slashes on paterns", () => {
    assert(!isMatch("a", "*/"));
    assert(isMatch("a/", "*/"));
    assert(!isMatch("b", "*/"));
    assert(isMatch("b/", "*/"));
    assert(!isMatch("a/a", "*/"));
    assert(!isMatch("a/a/", "*/"));
    assert(!isMatch("a/b", "*/"));
    assert(!isMatch("a/b/", "*/"));
    assert(!isMatch("a/c", "*/"));
    assert(!isMatch("a/c/", "*/"));
    assert(!isMatch("a/x", "*/"));
    assert(!isMatch("a/x/", "*/"));
    assert(!isMatch("a/a/a", "*/"));
    assert(!isMatch("a/a/b", "*/"));
    assert(!isMatch("a/a/b/", "*/"));
    assert(!isMatch("a/a/a/", "*/"));
    assert(!isMatch("a/a/a/a", "*/"));
    assert(!isMatch("a/a/a/a/", "*/"));
    assert(!isMatch("a/a/a/a/a", "*/"));
    assert(!isMatch("a/a/a/a/a/", "*/"));
    assert(!isMatch("x/y", "*/"));
    assert(!isMatch("z/z", "*/"));
    assert(!isMatch("x/y/", "*/"));
    assert(!isMatch("z/z/", "*/"));
    assert(!isMatch("a/b/c/.d/e/", "*/"));

    assert(!isMatch("a", "*/*/"));
    assert(!isMatch("a/", "*/*/"));
    assert(!isMatch("b", "*/*/"));
    assert(!isMatch("b/", "*/*/"));
    assert(!isMatch("a/a", "*/*/"));
    assert(isMatch("a/a/", "*/*/"));
    assert(!isMatch("a/b", "*/*/"));
    assert(isMatch("a/b/", "*/*/"));
    assert(!isMatch("a/c", "*/*/"));
    assert(isMatch("a/c/", "*/*/"));
    assert(!isMatch("a/x", "*/*/"));
    assert(isMatch("a/x/", "*/*/"));
    assert(!isMatch("a/a/a", "*/*/"));
    assert(!isMatch("a/a/b", "*/*/"));
    assert(!isMatch("a/a/b/", "*/*/"));
    assert(!isMatch("a/a/a/", "*/*/"));
    assert(!isMatch("a/a/a/a", "*/*/"));
    assert(!isMatch("a/a/a/a/", "*/*/"));
    assert(!isMatch("a/a/a/a/a", "*/*/"));
    assert(!isMatch("a/a/a/a/a/", "*/*/"));
    assert(!isMatch("x/y", "*/*/"));
    assert(!isMatch("z/z", "*/*/"));
    assert(isMatch("x/y/", "*/*/"));
    assert(isMatch("z/z/", "*/*/"));
    assert(!isMatch("a/b/c/.d/e/", "*/*/"));

    assert(!isMatch("a", "*/*/*/"));
    assert(!isMatch("a/", "*/*/*/"));
    assert(!isMatch("b", "*/*/*/"));
    assert(!isMatch("b/", "*/*/*/"));
    assert(!isMatch("a/a", "*/*/*/"));
    assert(!isMatch("a/a/", "*/*/*/"));
    assert(!isMatch("a/b", "*/*/*/"));
    assert(!isMatch("a/b/", "*/*/*/"));
    assert(!isMatch("a/c", "*/*/*/"));
    assert(!isMatch("a/c/", "*/*/*/"));
    assert(!isMatch("a/x", "*/*/*/"));
    assert(!isMatch("a/x/", "*/*/*/"));
    assert(!isMatch("a/a/a", "*/*/*/"));
    assert(!isMatch("a/a/b", "*/*/*/"));
    assert(isMatch("a/a/b/", "*/*/*/"));
    assert(isMatch("a/a/a/", "*/*/*/"));
    assert(!isMatch("a/a/a/a", "*/*/*/"));
    assert(!isMatch("a/a/a/a/", "*/*/*/"));
    assert(!isMatch("a/a/a/a/a", "*/*/*/"));
    assert(!isMatch("a/a/a/a/a/", "*/*/*/"));
    assert(!isMatch("x/y", "*/*/*/"));
    assert(!isMatch("z/z", "*/*/*/"));
    assert(!isMatch("x/y/", "*/*/*/"));
    assert(!isMatch("z/z/", "*/*/*/"));
    assert(!isMatch("a/b/c/.d/e/", "*/*/*/"));

    assert(!isMatch("a", "*/*/*/*/"));
    assert(!isMatch("a/", "*/*/*/*/"));
    assert(!isMatch("b", "*/*/*/*/"));
    assert(!isMatch("b/", "*/*/*/*/"));
    assert(!isMatch("a/a", "*/*/*/*/"));
    assert(!isMatch("a/a/", "*/*/*/*/"));
    assert(!isMatch("a/b", "*/*/*/*/"));
    assert(!isMatch("a/b/", "*/*/*/*/"));
    assert(!isMatch("a/c", "*/*/*/*/"));
    assert(!isMatch("a/c/", "*/*/*/*/"));
    assert(!isMatch("a/x", "*/*/*/*/"));
    assert(!isMatch("a/x/", "*/*/*/*/"));
    assert(!isMatch("a/a/a", "*/*/*/*/"));
    assert(!isMatch("a/a/b", "*/*/*/*/"));
    assert(!isMatch("a/a/b/", "*/*/*/*/"));
    assert(!isMatch("a/a/a/", "*/*/*/*/"));
    assert(!isMatch("a/a/a/a", "*/*/*/*/"));
    assert(isMatch("a/a/a/a/", "*/*/*/*/"));
    assert(!isMatch("a/a/a/a/a", "*/*/*/*/"));
    assert(!isMatch("a/a/a/a/a/", "*/*/*/*/"));
    assert(!isMatch("x/y", "*/*/*/*/"));
    assert(!isMatch("z/z", "*/*/*/*/"));
    assert(!isMatch("x/y/", "*/*/*/*/"));
    assert(!isMatch("z/z/", "*/*/*/*/"));
    assert(!isMatch("a/b/c/.d/e/", "*/*/*/*/"));

    assert(!isMatch("a", "*/*/*/*/*/"));
    assert(!isMatch("a/", "*/*/*/*/*/"));
    assert(!isMatch("b", "*/*/*/*/*/"));
    assert(!isMatch("b/", "*/*/*/*/*/"));
    assert(!isMatch("a/a", "*/*/*/*/*/"));
    assert(!isMatch("a/a/", "*/*/*/*/*/"));
    assert(!isMatch("a/b", "*/*/*/*/*/"));
    assert(!isMatch("a/b/", "*/*/*/*/*/"));
    assert(!isMatch("a/c", "*/*/*/*/*/"));
    assert(!isMatch("a/c/", "*/*/*/*/*/"));
    assert(!isMatch("a/x", "*/*/*/*/*/"));
    assert(!isMatch("a/x/", "*/*/*/*/*/"));
    assert(!isMatch("a/a/a", "*/*/*/*/*/"));
    assert(!isMatch("a/a/b", "*/*/*/*/*/"));
    assert(!isMatch("a/a/b/", "*/*/*/*/*/"));
    assert(!isMatch("a/a/a/", "*/*/*/*/*/"));
    assert(!isMatch("a/a/a/a", "*/*/*/*/*/"));
    assert(!isMatch("a/a/a/a/", "*/*/*/*/*/"));
    assert(!isMatch("a/a/a/a/a", "*/*/*/*/*/"));
    assert(isMatch("a/a/a/a/a/", "*/*/*/*/*/"));
    assert(!isMatch("x/y", "*/*/*/*/*/"));
    assert(!isMatch("z/z", "*/*/*/*/*/"));
    assert(!isMatch("x/y/", "*/*/*/*/*/"));
    assert(!isMatch("z/z/", "*/*/*/*/*/"));
    assert(!isMatch("a/b/c/.d/e/", "*/*/*/*/*/"));

    assert(!isMatch("a", "a/*/"));
    assert(!isMatch("a/", "a/*/"));
    assert(!isMatch("b", "a/*/"));
    assert(!isMatch("b/", "a/*/"));
    assert(!isMatch("a/a", "a/*/"));
    assert(isMatch("a/a/", "a/*/"));
    assert(!isMatch("a/b", "a/*/"));
    assert(isMatch("a/b/", "a/*/"));
    assert(!isMatch("a/c", "a/*/"));
    assert(isMatch("a/c/", "a/*/"));
    assert(!isMatch("a/x", "a/*/"));
    assert(isMatch("a/x/", "a/*/"));
    assert(!isMatch("a/a/a", "a/*/"));
    assert(!isMatch("a/a/b", "a/*/"));
    assert(!isMatch("a/a/b/", "a/*/"));
    assert(!isMatch("a/a/a/", "a/*/"));
    assert(!isMatch("a/a/a/a", "a/*/"));
    assert(!isMatch("a/a/a/a/", "a/*/"));
    assert(!isMatch("a/a/a/a/a", "a/*/"));
    assert(!isMatch("a/a/a/a/a/", "a/*/"));
    assert(!isMatch("x/y", "a/*/"));
    assert(!isMatch("z/z", "a/*/"));
    assert(!isMatch("x/y/", "a/*/"));
    assert(!isMatch("z/z/", "a/*/"));
    assert(!isMatch("a/b/c/.d/e/", "a/*/"));

    assert(!isMatch("a", "a/*/*/"));
    assert(!isMatch("a/", "a/*/*/"));
    assert(!isMatch("b", "a/*/*/"));
    assert(!isMatch("b/", "a/*/*/"));
    assert(!isMatch("a/a", "a/*/*/"));
    assert(!isMatch("a/a/", "a/*/*/"));
    assert(!isMatch("a/b", "a/*/*/"));
    assert(!isMatch("a/b/", "a/*/*/"));
    assert(!isMatch("a/c", "a/*/*/"));
    assert(!isMatch("a/c/", "a/*/*/"));
    assert(!isMatch("a/x", "a/*/*/"));
    assert(!isMatch("a/x/", "a/*/*/"));
    assert(!isMatch("a/a/a", "a/*/*/"));
    assert(!isMatch("a/a/b", "a/*/*/"));
    assert(isMatch("a/a/b/", "a/*/*/"));
    assert(isMatch("a/a/a/", "a/*/*/"));
    assert(!isMatch("a/a/a/a", "a/*/*/"));
    assert(!isMatch("a/a/a/a/", "a/*/*/"));
    assert(!isMatch("a/a/a/a/a", "a/*/*/"));
    assert(!isMatch("a/a/a/a/a/", "a/*/*/"));
    assert(!isMatch("x/y", "a/*/*/"));
    assert(!isMatch("z/z", "a/*/*/"));
    assert(!isMatch("x/y/", "a/*/*/"));
    assert(!isMatch("z/z/", "a/*/*/"));
    assert(!isMatch("a/b/c/.d/e/", "a/*/*/"));

    assert(!isMatch("a", "a/*/*/*/"));
    assert(!isMatch("a/", "a/*/*/*/"));
    assert(!isMatch("b", "a/*/*/*/"));
    assert(!isMatch("b/", "a/*/*/*/"));
    assert(!isMatch("a/a", "a/*/*/*/"));
    assert(!isMatch("a/a/", "a/*/*/*/"));
    assert(!isMatch("a/b", "a/*/*/*/"));
    assert(!isMatch("a/b/", "a/*/*/*/"));
    assert(!isMatch("a/c", "a/*/*/*/"));
    assert(!isMatch("a/c/", "a/*/*/*/"));
    assert(!isMatch("a/x", "a/*/*/*/"));
    assert(!isMatch("a/x/", "a/*/*/*/"));
    assert(!isMatch("a/a/a", "a/*/*/*/"));
    assert(!isMatch("a/a/b", "a/*/*/*/"));
    assert(!isMatch("a/a/b/", "a/*/*/*/"));
    assert(!isMatch("a/a/a/", "a/*/*/*/"));
    assert(!isMatch("a/a/a/a", "a/*/*/*/"));
    assert(isMatch("a/a/a/a/", "a/*/*/*/"));
    assert(!isMatch("a/a/a/a/a", "a/*/*/*/"));
    assert(!isMatch("a/a/a/a/a/", "a/*/*/*/"));
    assert(!isMatch("x/y", "a/*/*/*/"));
    assert(!isMatch("z/z", "a/*/*/*/"));
    assert(!isMatch("x/y/", "a/*/*/*/"));
    assert(!isMatch("z/z/", "a/*/*/*/"));
    assert(!isMatch("a/b/c/.d/e/", "a/*/*/*/"));

    assert(!isMatch("a", "a/*/*/*/*/"));
    assert(!isMatch("a/", "a/*/*/*/*/"));
    assert(!isMatch("b", "a/*/*/*/*/"));
    assert(!isMatch("b/", "a/*/*/*/*/"));
    assert(!isMatch("a/a", "a/*/*/*/*/"));
    assert(!isMatch("a/a/", "a/*/*/*/*/"));
    assert(!isMatch("a/b", "a/*/*/*/*/"));
    assert(!isMatch("a/b/", "a/*/*/*/*/"));
    assert(!isMatch("a/c", "a/*/*/*/*/"));
    assert(!isMatch("a/c/", "a/*/*/*/*/"));
    assert(!isMatch("a/x", "a/*/*/*/*/"));
    assert(!isMatch("a/x/", "a/*/*/*/*/"));
    assert(!isMatch("a/a/a", "a/*/*/*/*/"));
    assert(!isMatch("a/a/b", "a/*/*/*/*/"));
    assert(!isMatch("a/a/b/", "a/*/*/*/*/"));
    assert(!isMatch("a/a/a/", "a/*/*/*/*/"));
    assert(!isMatch("a/a/a/a", "a/*/*/*/*/"));
    assert(!isMatch("a/a/a/a/", "a/*/*/*/*/"));
    assert(!isMatch("a/a/a/a/a", "a/*/*/*/*/"));
    assert(isMatch("a/a/a/a/a/", "a/*/*/*/*/"));
    assert(!isMatch("x/y", "a/*/*/*/*/"));
    assert(!isMatch("z/z", "a/*/*/*/*/"));
    assert(!isMatch("x/y/", "a/*/*/*/*/"));
    assert(!isMatch("z/z/", "a/*/*/*/*/"));
    assert(!isMatch("a/b/c/.d/e/", "a/*/*/*/*/"));

    assert(!isMatch("a", "a/*/a/"));
    assert(!isMatch("a/", "a/*/a/"));
    assert(!isMatch("b", "a/*/a/"));
    assert(!isMatch("b/", "a/*/a/"));
    assert(!isMatch("a/a", "a/*/a/"));
    assert(!isMatch("a/a/", "a/*/a/"));
    assert(!isMatch("a/b", "a/*/a/"));
    assert(!isMatch("a/b/", "a/*/a/"));
    assert(!isMatch("a/c", "a/*/a/"));
    assert(!isMatch("a/c/", "a/*/a/"));
    assert(!isMatch("a/x", "a/*/a/"));
    assert(!isMatch("a/x/", "a/*/a/"));
    assert(!isMatch("a/a/a", "a/*/a/"));
    assert(!isMatch("a/a/b", "a/*/a/"));
    assert(!isMatch("a/a/b/", "a/*/a/"));
    assert(isMatch("a/a/a/", "a/*/a/"));
    assert(!isMatch("a/a/a/a", "a/*/a/"));
    assert(!isMatch("a/a/a/a/", "a/*/a/"));
    assert(!isMatch("a/a/a/a/a", "a/*/a/"));
    assert(!isMatch("a/a/a/a/a/", "a/*/a/"));
    assert(!isMatch("x/y", "a/*/a/"));
    assert(!isMatch("z/z", "a/*/a/"));
    assert(!isMatch("x/y/", "a/*/a/"));
    assert(!isMatch("z/z/", "a/*/a/"));
    assert(!isMatch("a/b/c/.d/e/", "a/*/a/"));

    assert(!isMatch("a", "a/*/b/"));
    assert(!isMatch("a/", "a/*/b/"));
    assert(!isMatch("b", "a/*/b/"));
    assert(!isMatch("b/", "a/*/b/"));
    assert(!isMatch("a/a", "a/*/b/"));
    assert(!isMatch("a/a/", "a/*/b/"));
    assert(!isMatch("a/b", "a/*/b/"));
    assert(!isMatch("a/b/", "a/*/b/"));
    assert(!isMatch("a/c", "a/*/b/"));
    assert(!isMatch("a/c/", "a/*/b/"));
    assert(!isMatch("a/x", "a/*/b/"));
    assert(!isMatch("a/x/", "a/*/b/"));
    assert(!isMatch("a/a/a", "a/*/b/"));
    assert(!isMatch("a/a/b", "a/*/b/"));
    assert(isMatch("a/a/b/", "a/*/b/"));
    assert(!isMatch("a/a/a/", "a/*/b/"));
    assert(!isMatch("a/a/a/a", "a/*/b/"));
    assert(!isMatch("a/a/a/a/", "a/*/b/"));
    assert(!isMatch("a/a/a/a/a", "a/*/b/"));
    assert(!isMatch("a/a/a/a/a/", "a/*/b/"));
    assert(!isMatch("x/y", "a/*/b/"));
    assert(!isMatch("z/z", "a/*/b/"));
    assert(!isMatch("x/y/", "a/*/b/"));
    assert(!isMatch("z/z/", "a/*/b/"));
    assert(!isMatch("a/b/c/.d/e/", "a/*/b/"));
  });

  it("should match a literal star when escaped", () => {
    assert(!isMatch(".md", "\\*"));
    assert(!isMatch("a**a.md", "\\*"));
    assert(!isMatch("**a.md", "\\*"));
    assert(!isMatch("**/a.md", "\\*"));
    assert(!isMatch("**.md", "\\*"));
    assert(!isMatch(".md", "\\*"));
    assert(isMatch("*", "\\*"));
    assert(!isMatch("**", "\\*"));
    assert(!isMatch("*.md", "\\*"));

    assert(!isMatch(".md", "\\*.md"));
    assert(!isMatch("a**a.md", "\\*.md"));
    assert(!isMatch("**a.md", "\\*.md"));
    assert(!isMatch("**/a.md", "\\*.md"));
    assert(!isMatch("**.md", "\\*.md"));
    assert(!isMatch(".md", "\\*.md"));
    assert(!isMatch("*", "\\*.md"));
    assert(!isMatch("**", "\\*.md"));
    assert(isMatch("*.md", "\\*.md"));

    assert(!isMatch(".md", "\\**.md"));
    assert(!isMatch("a**a.md", "\\**.md"));
    assert(isMatch("**a.md", "\\**.md"));
    assert(!isMatch("**/a.md", "\\**.md"));
    assert(isMatch("**.md", "\\**.md"));
    assert(!isMatch(".md", "\\**.md"));
    assert(!isMatch("*", "\\**.md"));
    assert(!isMatch("**", "\\**.md"));
    assert(isMatch("*.md", "\\**.md"));

    assert(!isMatch(".md", "a\\**.md"));
    assert(isMatch("a**a.md", "a\\**.md"));
    assert(!isMatch("**a.md", "a\\**.md"));
    assert(!isMatch("**/a.md", "a\\**.md"));
    assert(!isMatch("**.md", "a\\**.md"));
    assert(!isMatch(".md", "a\\**.md"));
    assert(!isMatch("*", "a\\**.md"));
    assert(!isMatch("**", "a\\**.md"));
    assert(!isMatch("*.md", "a\\**.md"));
  });

  it("should match file paths", () => {
    assert(!isMatch("a/.b", "a/**/z/*.md"));
    assert(!isMatch("a/b/c/j/e/z/c.txt", "a/**/j/**/z/*.md"));
    assert(!isMatch("a/b/z/.a", "a/**/z/*.a"));
    assert(!isMatch("a/b/z/.a", "a/*/z/*.a"));
    assert(!isMatch("foo.txt", "*/*.txt"));
    assert(isMatch("a/.b", "a/.*"));
    assert(isMatch("a/b/c/d/e/j/n/p/o/z/c.md", "a/**/j/**/z/*.md"));
    assert(isMatch("a/b/c/d/e/z/c.md", "a/**/z/*.md"));
    assert(isMatch("a/b/c/xyz.md", "a/b/c/*.md"));
    assert(isMatch("a/b/z/.a", "a/*/z/.a"));
    assert(isMatch("a/bb.bb/aa/b.b/aa/c/xyz.md", "a/**/c/*.md"));
    assert(isMatch("a/bb.bb/aa/bb/aa/c/xyz.md", "a/**/c/*.md"));
    assert(isMatch("a/bb.bb/c/xyz.md", "a/*/c/*.md"));
    assert(isMatch("a/bb/c/xyz.md", "a/*/c/*.md"));
    assert(isMatch("a/bbbb/c/xyz.md", "a/*/c/*.md"));
    assert(isMatch("foo.txt", "**/foo.txt"));
    assert(isMatch("foo/bar.txt", "**/*.txt"));
    assert(isMatch("foo/bar/baz.txt", "**/*.txt"));
  });

  it("should match paths with leading `./` when pattern has `./`", () => {
    const format = (str) => str.replace(/^\.\//, "");
    assert(!isMatch("./a/b/c/d/e/z/c.md", "./a/**/j/**/z/*.md", { format }));
    assert(!isMatch("./a/b/c/j/e/z/c.txt", "./a/**/j/**/z/*.md", { format }));
    assert(
      isMatch("./a/b/c/d/e/j/n/p/o/z/c.md", "./a/**/j/**/z/*.md", { format }),
    );
    assert(isMatch("./a/b/c/d/e/z/c.md", "./a/**/z/*.md", { format }));
    assert(isMatch("./a/b/c/j/e/z/c.md", "./a/**/j/**/z/*.md", { format }));
    assert(isMatch("./a/b/z/.a", "./a/**/z/.a", { format }));
  });

  it("should match leading slashes", () => {
    assert(!isMatch("ef", "/*"));
    assert(isMatch("/ef", "/*"));
    assert(isMatch("/foo/bar.txt", "/foo/*"));
    assert(isMatch("/foo/bar.txt", "/foo/**"));
    assert(isMatch("/foo/bar.txt", "/foo/**/**/*.txt"));
    assert(isMatch("/foo/bar.txt", "/foo/**/**/bar.txt"));
    assert(isMatch("/foo/bar.txt", "/foo/**/*.txt"));
    assert(isMatch("/foo/bar.txt", "/foo/**/bar.txt"));
    assert(!isMatch("/foo/bar.txt", "/foo/*/bar.txt"));
    assert(!isMatch("/foo/bar/baz.txt", "/foo/*"));
    assert(isMatch("/foo/bar/baz.txt", "/foo/**"));
    assert(isMatch("/foo/bar/baz.txt", "/foo/**"));
    assert(isMatch("/foo/bar/baz.txt", "/foo/**/*.txt"));
    assert(isMatch("/foo/bar/baz.txt", "/foo/**/*/*.txt"));
    assert(isMatch("/foo/bar/baz.txt", "/foo/**/*/baz.txt"));
    assert(!isMatch("/foo/bar/baz.txt", "/foo/*.txt"));
    assert(isMatch("/foo/bar/baz.txt", "/foo/*/*.txt"));
    assert(!isMatch("/foo/bar/baz.txt", "/foo/*/*/baz.txt"));
    assert(!isMatch("/foo/bar/baz.txt", "/foo/bar**"));
    assert(isMatch("/foo/bar/baz/qux.txt", "**/*.txt"));
    assert(!isMatch("/foo/bar/baz/qux.txt", "**/.txt"));
    assert(!isMatch("/foo/bar/baz/qux.txt", "*/*.txt"));
    assert(!isMatch("/foo/bar/baz/qux.txt", "/foo/**.txt"));
    assert(isMatch("/foo/bar/baz/qux.txt", "/foo/**/*.txt"));
    assert(!isMatch("/foo/bar/baz/qux.txt", "/foo/*/*.txt"));
    assert(!isMatch("/foo/bar/baz/qux.txt", "/foo/bar**/*.txt"));
    assert(!isMatch("/.txt", "*.txt"));
    assert(!isMatch("/.txt", "/*.txt"));
    assert(!isMatch("/.txt", "*/*.txt"));
    assert(!isMatch("/.txt", "**/*.txt"));
    assert(!isMatch("/.txt", "*.txt", { dot: true }));
    assert(isMatch("/.txt", "/*.txt", { dot: true }));
    assert(isMatch("/.txt", "*/*.txt", { dot: true }));
    assert(isMatch("/.txt", "**/*.txt", { dot: true }));
  });

  it("should match double slashes", () => {
    assert(!isMatch("https://foo.com/bar/baz/app.min.js", "https://foo.com/*"));
    assert(!isMatch("https://foo.com/bar/baz/app.min.js", "https://foo.com/*"));
    assert(isMatch("https://foo.com/bar/baz/app.min.js", "https://foo.com/**"));
    assert(
      !isMatch("https://foo.com/bar/baz/app.min.js", "https://foo.com/**", {
        noglobstar: true,
      }),
    );
    assert(isMatch("https://foo.com/bar/baz/app.min.js", "https://foo.com/**"));
    assert(
      isMatch(
        "https://foo.com/bar/baz/app.min.js",
        "https://foo.com/**/app.min.js",
      ),
    );
    assert(
      isMatch(
        "https://foo.com/bar/baz/app.min.js",
        "https://foo.com/*/*/app.min.js",
      ),
    );
    assert(
      isMatch(
        "https://foo.com/bar/baz/app.min.js",
        "https://foo.com/*/*/app.min.js",
        { noglobstar: true },
      ),
    );
    assert(
      !isMatch(
        "https://foo.com/bar/baz/app.min.js",
        "https://foo.com/*/app.min.js",
      ),
    );
    assert(
      !isMatch(
        "https://foo.com/bar/baz/app.min.js",
        "https://foo.com/*/app.min.js",
      ),
    );
    assert(
      isMatch(
        "https://foo.com/bar/baz/app.min.js",
        "https://foo.com/**/app.min.js",
      ),
    );
    assert(
      !isMatch(
        "https://foo.com/bar/baz/app.min.js",
        "https://foo.com/**/app.min.js",
        { noglobstar: true },
      ),
    );
  });
});
