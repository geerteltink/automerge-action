const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

function getPullRequestFromContext() {
  if (!context.payload) {
    return undefined;
  }

  if (context.payload.pull_request && context.payload.pull_request.number) {
    // pull_request event
    return context.payload.pull_request.number;
  }

  if (!context.payload.check_suite || !context.payload.check_suite.pull_requests) {
    return undefined;
  }

  // check_suite event
  for (const pullRequest of context.payload.check_suite.pull_requests) {
    if (pullRequest.number) {
      return pullRequest.number;
    }
  }

  return undefined;
}

function pullRequestHasLabel(pullRequestResponseData, labelName) {
  if (!pullRequestResponseData.labels) {
    return false;
  }

  const res = pullRequestResponseData.labels.filter((label) => label.name === labelName);

  return res.length > 0;
}

const run = async () => {
  // console.log(JSON.stringify(context, undefined, 2));

  const { owner, repo } = context.repo;
  core.debug(`repository: ${owner}/${repo}`);

  const pull_number = getPullRequestFromContext();
  if (!pull_number) {
    core.warning('Could not get pull request information from context');
    return;
  }
  core.info(`pull request number: ${pull_number}`);

  const token = core.getInput('GITHUB_TOKEN', { require: true });
  const github = new GitHub(token);

  // Get pull request data
  // https://octokit.github.io/rest.js/#octokit-routes-pulls-get
  const pullRequestResponse = await github.pulls.get({
    owner,
    repo,
    pull_number,
  });

  const pullRequestResponseStatus = pullRequestResponse.status || undefined;
  const pullRequestResponseData = pullRequestResponse.data || {};

  core.debug(JSON.stringify(pullRequestResponseStatus));
  core.debug(JSON.stringify(pullRequestResponseData));

  if (pullRequestResponseStatus !== 200 || Object.entries(pullRequestResponseData).length === 0) {
    throw new Error('Could not get pull request information from API');
  }
  core.info(`retrieved data for pull request #${pull_number}`);

  if (!pullRequestHasLabel(pullRequestResponseData, 'auto-merge')) {
    core.warning('Pull request does not have the auto-merge label');
    return;
  }

  if (pullRequestHasLabel(pullRequestResponseData, 'work-in-progress')) {
    core.warning('Pull request has the work-in-progress label');
    return;
  }

  core.debug(`pull request mergeable: ${pullRequestResponseData.mergeable}`);
  core.debug(`pull request merged: ${pullRequestResponseData.merged}`);
  core.debug(`pull request state: ${pullRequestResponseData.state}`);
  if (
    pullRequestResponseData.state !== 'open'
    || pullRequestResponseData.mergeable !== true
    || pullRequestResponseData.merged !== false
  ) {
    core.warning('Pull Request is not in a mergeable state');
    return;
  }

  // Merge pull request
  try {
    // https://octokit.github.io/rest.js/#octokit-routes-pulls-merge
    const pullRequestMergeResponse = await github.pulls.merge({
      owner,
      repo,
      pull_number,
      commit_title: `merge: pull request (#${pull_number})`,
      merge_method: 'merge',
    });

    if (pullRequestMergeResponse.status !== 200) {
      core.warning(pullRequestMergeResponse.data.message);
      return;
    }

    core.info(pullRequestMergeResponse.data.message);
  } catch (e) {
    core.warning(e.message);
  }
};

module.exports = run;
