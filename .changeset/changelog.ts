import {
  ChangelogFunctions,
  GetDependencyReleaseLine,
  GetReleaseLine,
} from "@changesets/types";
import githubCompact from "@svitejs/changesets-changelog-github-compact";

function getDateString() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const getReleaseLine: GetReleaseLine = async function (
  changeset,
  type,
  options
) {
  const original = await githubCompact.getReleaseLine(changeset, type, options);
  const versionRegex = /^## (\d+\.\d+\.\d+)/m;
  const withDate = original.replace(versionRegex, `## $1 (${getDateString()})`);
  return withDate;
};

const getDependencyReleaseLine: GetDependencyReleaseLine = async function (
  changesets,
  dependenciesUpdated,
  options
) {
  return githubCompact.getDependencyReleaseLine(
    changesets,
    dependenciesUpdated,
    options
  );
};

const defaultChangelogFunctions: ChangelogFunctions = {
  getReleaseLine,
  getDependencyReleaseLine,
};

export default defaultChangelogFunctions;
