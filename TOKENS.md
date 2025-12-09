# Design tokens

Exported design tokens from the Digdir common designsystem live in the [design-tokens](./design-tokens/) directory.

Tokens are initially created from the [config file](./designsystemet.config.json) using the `pnpm tokens:create` script. Major changes to design tokens and changed colors should first be done through the config file when possible.

You should use Figma to edit the tokens. You'll need the [Tokens Studio for Figma](https://docs.tokens.studio/) plugin installed in Figma, and configured to sync with this GitHub repo.

## Setup

1. [Install](<https://www.figma.com/community/plugin/843461159747178978/Tokens-Studio-for-Figma-(Figma-Tokens)>) the Figma Tokens plugin
2. Generate a new Personal Access Token (PAT) in [GitHub Developer Settings](https://github.com/settings/personal-access-tokens)
   - Click `Generate new token`
   - Change `Resource owner` to `Arbeidstilsynet`
   - Add a token name and choose an expiration date
   - Under `Repository access`, select `Only selected repositories` and search for `Arbeidstilsynet/design`
   - Under `Permissions` -> `Repositories`, click `Add permissions` and select `Contents`
   - Change Contents access to `Read and write`
   - When done, click `Generate token`
3. Copy the PAT (you can only see it once)
4. In the Figma Tokens plugin, under `Sync > GitHub`, add new credentials:
   - Name: `Digdir Figma Tokens`
   - Personal Access Token: _your PAT_
   - Repository: `Arbeidstilsynet/design`
   - Default Branch: `main`
   - File Path: `design-tokens`
5. Ask an organization owner to approve the PAT and ensure your user has at least write access to the repo
   - <https://github.com/organizations/Arbeidstilsynet/settings/personal-access-token-requests>
   - <https://github.com/Arbeidstilsynet/design/settings/access>

## Usage

You can now "pull from GitHub" (button on top right) to fetch the tokens. When done editing tokens, you should "push to GitHub" (second button on top right).

Repository rules prevent pushing directly to `main`, from Figma or otherwise. Make changes in a new branch (`create branch from -> main`). When you have pushed your changes and want to merge them to `main`, ask a developer to create a PR or create it yourself.

When changes to design-tokens are pushed to a GitHub branch, the generate-tokens workflow will start. It runs the Digdir CLI to generate the [brand .css files](../packages/theme/brand/). Any changes will be committed to that branch by the workflow.

To document the changes, run `pnpm changeset` from the repo root, commit & push, and create a PR. This will also enable Changesets to publish a new version of the `@arbeidstilsynet/design-tokens` package.

## Local generation

To generate the tokens locally, for example if the workflow fails, you can run `pnpm tokens:build` from the repo root.

Make sure to update dependencies (Digdir CLI) with `pnpm i` first.
