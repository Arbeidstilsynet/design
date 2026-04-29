// Minimal stubs for classes that @typescript-eslint/utils extends from eslint.
// These are never actually called — they only need to exist so that
// `class Linter extends eslint.Linter` etc. don't crash at load time.
class ESLint {}
class Linter {}
class RuleTester {}
class SourceCode {}

module.exports = { ESLint, Linter, RuleTester, SourceCode };
