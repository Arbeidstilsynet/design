/**
 * Changelog generator for Changesets.
 *
 * Loaded by `@changesets/cli` via `.changeset/config.json` to format changelog
 * entries when running `changeset version`.
 *
 * Adapted from @svitejs/changesets-changelog-github-compact (MIT):
 *
 *   Copyright (c) 2022 dominikg and contributors
 *   https://github.com/svitejs/changesets-changelog-github-compact
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import { getInfo, getInfoFromPullRequest } from "@changesets/get-github-info";
import type { ChangelogFunctions } from "@changesets/types";

interface ChangelogOptions {
  repo: string;
}

function validate(
  options: Record<string, unknown> | null,
): asserts options is Record<string, unknown> & ChangelogOptions {
  if (!options?.repo) {
    throw new Error(
      'Please provide a repo to this changelog generator like this:\n"changelog": ["../scripts/changelog.ts", { "repo": "org/repo" }]',
    );
  }
}

interface GithubLinks {
  commit: string | null;
  pull: string | null;
  user: string | null;
}

async function resolveLinks(
  repo: string,
  prFromSummary: number | undefined,
  commitFromSummary: string | undefined,
  changesetCommit: string | undefined,
): Promise<GithubLinks> {
  if (prFromSummary !== undefined) {
    const prInfo = await getInfoFromPullRequest({
      repo,
      pull: prFromSummary,
    });
    if (commitFromSummary) {
      return {
        ...prInfo.links,
        commit: `[\`${commitFromSummary.slice(0, 7)}\`](https://github.com/${repo}/commit/${commitFromSummary})`,
      };
    }
    return prInfo.links;
  }
  const commitToFetchFrom = commitFromSummary ?? changesetCommit;
  if (commitToFetchFrom) {
    const commitInfo = await getInfo({
      repo,
      commit: commitToFetchFrom,
    });
    return commitInfo.links;
  }
  return { commit: null, pull: null, user: null };
}

export function linkifyIssueHints(line: string, repo: string): string {
  return line.replace(
    /(?<=\( ?(?:fix|fixes|see) )(#\d+)(?= ?\))/g,
    (issueHash) => {
      return `[${issueHash}](https://github.com/${repo}/issues/${issueHash.substring(1)})`;
    },
  );
}

export function parseSummary(summary: string): {
  text: string;
  prFromSummary: number | undefined;
  commitFromSummary: string | undefined;
} {
  let prFromSummary: number | undefined;
  let commitFromSummary: string | undefined;

  const text = summary
    .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
      const num = Number(pr);
      if (!Number.isNaN(num)) prFromSummary = num;
      return "";
    })
    .replace(/^\s*commit:\s*([^\s]+)/im, (_, commit) => {
      commitFromSummary = String(commit);
      return "";
    })
    .replace(/^\s*(?:author|user):\s*@?([^\s]+)/gim, "")
    .trim();

  return { text, prFromSummary, commitFromSummary };
}

const changelogFunctions: ChangelogFunctions = {
  getDependencyReleaseLine: async (
    changesets,
    dependenciesUpdated,
    options,
  ) => {
    validate(options);
    if (dependenciesUpdated.length === 0) return "";

    const changesetLink = `- Updated dependencies [${(
      await Promise.all(
        changesets.map(async (cs) => {
          if (cs.commit) {
            const { links } = await getInfo({
              repo: options.repo,
              commit: cs.commit,
            });
            return links.commit;
          }
        }),
      )
    )
      .filter(Boolean)
      .join(", ")}]:`;

    const updatedDependenciesList = dependenciesUpdated.map(
      (dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
    );

    return [changesetLink, ...updatedDependenciesList].join("\n");
  },
  getReleaseLine: async (changeset, _type, options) => {
    validate(options);
    const { repo } = options;

    const { text, prFromSummary, commitFromSummary } = parseSummary(
      changeset.summary,
    );

    const [firstLine, ...futureLines] = text
      .split("\n")
      .map((l) => linkifyIssueHints(l.trimEnd(), repo));

    const links = await resolveLinks(
      repo,
      prFromSummary,
      commitFromSummary,
      changeset.commit,
    );

    let suffix = "";
    if (links.pull) {
      suffix = ` (${links.pull})`;
    } else if (links.commit) {
      suffix = ` (${links.commit})`;
    }

    const indentedLines = futureLines.map((l) => `  ${l}`).join("\n");
    return `\n- ${firstLine}${suffix}\n${indentedLines}`;
  },
};

export default changelogFunctions;
