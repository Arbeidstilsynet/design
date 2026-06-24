# Release

We currently use [Changesets](https://github.com/changesets/changesets) and [Changeset Release Action](https://github.com/changesets/action) for tracking changes, generating changelogs, and publishing releases. [Changeset bot](https://github.com/apps/changeset-bot) notifies in PR if you forgot to add a changeset.

## Release process

- Create a feature branch and commit your changes. Run `pnpm changeset` in the root of the repo to add a new changeset.

- Merge the PR after checks pass.

- The merge deploys the current `main` branch Storybook to
  [gnist.dev.arbeidstilsynet.no](https://gnist.dev.arbeidstilsynet.no).

- [Changeset Release Action](https://github.com/changesets/action) should notice the changesets (inside `.changeset/`) and generate or update a PR with bumped version and changelog.

- Approve and merge the changesets versioning PR.

- [Changeset Release Action](https://github.com/changesets/action) will now publish the new package version to [NPM](https://www.npmjs.com/org/arbeidstilsynet), add a git tag and create [GitHub releases](https://github.com/Arbeidstilsynet/design/releases).

- After packages are published, Storybook is deployed to
  [gnist.arbeidstilsynet.no](https://gnist.arbeidstilsynet.no), so production
  Storybook tracks the latest published package versions.

- Verify that new version is available in [NPM](https://www.npmjs.com/org/arbeidstilsynet) and on [GitHub releases](https://github.com/Arbeidstilsynet/design/releases)

![Release process diagram](./docs/diagrams/release.svg)
