# Storybook for @arbeidstilsynet/design

Stories for base components are taken directly from [@digdir/designsystemet](https://github.com/digdir/designsystemet)

## Visual tests

Chromatic snapshots are opt-in. The global Storybook configuration disables
snapshots, and selected stories override `chromatic.disableSnapshot` to
`false`.

### Selecting stories

- Keep one representative primary story for every visual Designsystemet
  component. Hook-only stories are not visual test cases.
- Select Gnist stories explicitly. Do not opt an entire story file in.
- Add hand-picked stories when the primary story does not cover a materially
  different state.
- Prefer one stable visual-matrix story that renders several static variants
  over separate snapshots for each variant.
- Interactive stories must use a deterministic `play` function to reach the
  state that is captured. A failing `play` function is a failing visual test.
- For components such as Dialog, Dropdown, Popover, Suggestion, and Tooltip,
  the selected story must expose the meaningful open state. The primary story
  is sufficient when its `play` function already does this.

The active modes are `light desktop` and `dark desktop`. All four light/dark
and mobile/desktop combinations are defined in `.storybook/modes.ts` so mobile
coverage can be enabled deliberately later without renaming existing
baselines.

The initial operating budget is at most 200 snapshots for a full build. This
is a documented budget, not a CI assertion. Review Chromatic usage before
expanding the selected stories or active modes. TurboSnap is enabled through
`onlyChanged`, but quota planning must assume full builds until Chromatic has
enough build history and whenever global CSS or theme files change.

### CI and releases

The `Chromatic` workflow runs for pull requests:

- Ordinary same-repository pull requests call Chromatic with `skip: true`.
  This reports the required `UI Tests` status without taking snapshots.
- The Changesets release pull request from `changeset-release/main` runs the
  real visual tests. The `Gnist-utviklere` team must first approve the
  `chromatic-release` GitHub environment for the current commit.
- Fork pull requests are unsupported and cannot satisfy the required
  Chromatic status.
- A protected manual workflow dispatch is available for establishing a
  baseline and diagnosing or repairing baseline continuity.

Require Chromatic's `UI Tests` status for merges only after the final snapshot
selection has been built and reviewed on `main`, ordinary skip behavior has
been verified, and a real release pull request build has been verified.
Visual changes keep the status pending until they are reviewed and accepted in
Chromatic. If the monthly quota is exhausted, releases remain blocked until
the quota resets.

Accepted release-branch baselines follow the pull request into `main`, so
`main` is not built automatically.

### Maintaining copied upstream stories

The Designsystemet stories are maintained copies, not an automatic mirror.
When updating `@digdir/designsystemet`, compare relevant upstream story changes
and adapt the local stories and `play` functions. Preserve the visual selection
rules above: every visual upstream component needs a representative primary
snapshot, and interactive snapshots must finish in a stable meaningful state.
