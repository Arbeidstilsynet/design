// oxlint-disable typescript/no-extraneous-class

// Minimal stubs for classes that @typescript-eslint/utils extends from eslint.
// These are never actually called — they only need to exist so that
// `class Linter extends eslint.Linter` etc. don't crash at load time.
class ESLint {} // NOSONAR
class Linter {} // NOSONAR
class RuleTester {} // NOSONAR
class SourceCode {} // NOSONAR

module.exports = { ESLint, Linter, RuleTester, SourceCode };
